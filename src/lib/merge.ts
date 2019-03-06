import { cacheList } from "./store";
import { metadataInnerType, metadataRename, metadataMarked, metadataType, metadataFormat } from "./meta-type";

const baseType = ['number', 'string', 'boolean'];

interface IFormat {
  formatParamKeys: string[],
  formatFunc: (...args: any[]) => any
}

/**
 * 强制产生所有属性 格式化属性
 * @param { object } target 被装饰的类
 */
function decFakeInherit(target): any {
  return function (...args: any[]): any {
    target.apply(this, args);
    const propertyKeys: string[] = cacheList.get(target.prototype) || [];
    propertyKeys.forEach(key => {
      const PropClass = Reflect.getMetadata(metadataType, target.prototype, key);
      if (PropClass) {
        if (this[key] !== undefined) {
          // 已经设置了初始值
        } else if (PropClass === Array) {
          this[key] = []
        } else {
          this[key] = null;
        }
      }
    })
  }
}
// 基础类型

export function JsonToClass<T = any>(objValue: object, Clazz, verbose: boolean = true): T {
  const result = _jsonToClass(objValue, Clazz, null, verbose)
  return result;
}

/**
 * 将 json 序列化为 class
 * @param objValue 待序列化的 [json/object]
 * @param Clazz 序列化为的对象
 */
function _jsonToClass(objValue: object, Clazz, defaultVal = null, verbose: boolean = true) {
  const target = Clazz.prototype;
  const srcValue = defaultVal || (Reflect.getOwnMetadata(metadataMarked, target) ? new (decFakeInherit(Clazz)) : new Clazz);
  Object.setPrototypeOf(srcValue || {}, target || Object.prototype)
  const effectiveKeys = Object.keys(srcValue);
  effectiveKeys
    .forEach(key => {
      // 期望类型的构造函数
      const PropClass = Reflect.getOwnMetadata(metadataType, target, key);
      // 有效的的 key
      const usefullKey: string = Reflect.getOwnMetadata(metadataRename, target, key) || key;
      const format: IFormat | undefined = Reflect.getOwnMetadata(metadataFormat, target, key);
      if (format) {
        // 优先判断是否定义了 format
        const formatParam = format.formatParamKeys.map(key => objValue[key]);
        srcValue[key] = format.formatFunc(...formatParam);
      } else {
        if (baseType.includes(PropClass.name.toLowerCase())) {
          // 基础类型 直接重置
          _tansformToBaseType(objValue, usefullKey, srcValue, key, PropClass, Clazz, verbose);
        } else {
          // 引用类型
          if (Array.isArray(srcValue[key])) {
            // 如果是数组
            const InnerClass = Reflect.getOwnMetadata(metadataInnerType, target, key);
            if (InnerClass) {
              // 正确传值
              if (Array.isArray(objValue[usefullKey])) {
                // 类型合法
                if (baseType.includes(InnerClass.name.toLowerCase())) {
                  // 数组泛型为基础类型
                  srcValue[key] = objValue[usefullKey].map((val) => {
                    if (val) {
                      // 如果被序列化对象有值
                      if (!baseType.includes(typeof val)) {
                        // (有争议的类型转换) 基础类型与引用类型之间转换
                        verbose && logger(InnerClass, '', val, (new InnerClass()).valueOf(), `${key} Array<${InnerClass.name.toLowerCase()}>`)
                        return null;
                      } else {
                        const transformedVal = InnerClass(val);
                        return Number.isNaN(transformedVal) ? null : transformedVal;
                      }
                    } else {
                      // 如果被序列化对象没有值，重置为默认值或初始值
                      return null
                    }
                  });
                } else {
                  // 数组泛型为引用类型
                  srcValue[key] = objValue[usefullKey].map(val => val ? _jsonToClass(val, InnerClass) : null)
                }
              }
            } else {
              // 未传入数组泛型
              srcValue[key] = objValue[usefullKey] || []
              verbose && logger(Clazz, key, objValue[usefullKey] || [], objValue[usefullKey] || [])
            }
          } else {
            // 其他引用类型
            srcValue[key] = objValue[usefullKey] ? _jsonToClass(objValue[usefullKey], PropClass, srcValue[key] && Object.keys(srcValue[key]).length ? srcValue[key] : null) : null;
          }
        }
      }
    })
  return srcValue
}

/**
 * 将任意类型 转换为 基础类型
 * @param objValue 来源对象
 * @param objKey
 * @param srcValue 序列化标准对象
 * @param srcKey
 * @param PropClass 属性构造函数
 */
function _tansformToBaseType(objValue: object, objKey: string, srcValue: object, srcKey: string, PropClass, ClazzName: string, verbose: boolean = true) {
  if (objValue[objKey] !== undefined) {
    // 如果被序列化对象有值
    if (!baseType.includes(typeof objValue[objKey])) {
      // (有争议的类型转换) 基础类型与引用类型之间转换
      verbose && logger(ClazzName, srcKey, objValue[objKey], srcValue[srcKey]);
    } else {
      const transformedVal = PropClass(objValue[objKey])
      srcValue[srcKey] = Number.isNaN(transformedVal) ? srcValue[srcKey] : transformedVal; // NaN 重置为默认值
      verbose && Number.isNaN(transformedVal) && logger(ClazzName, srcKey, objValue[objKey], srcValue[srcKey]);
    }
  } else {
    // 如果被序列化对象没有值，重置为默认值或初始值
  }
}

function logger(Clazz, key: string, preVal: any, convertedVal: any, arrayType?: string) {
  console.group && console.group("%c [json-class] Convert Warning!", "color:red", "@", arrayType || `${Clazz.name}.${key}`)
  console.log("%c prev value", "color:#9E9E9E", preVal);
  console.log("%c converted value", "color:#4CAF50", convertedVal);
  console.groupEnd && console.groupEnd();
}
