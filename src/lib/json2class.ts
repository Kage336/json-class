// 基本类型序列化
// number 序列化为 Number
// string 序列化为 String
// boolean 序列化为 Boolean
// any 序列化为 Object
// void 序列化为 undefined
// Array 序列化为 Array
// 如果是一个多元组，序列化为 Array
// 如果是一个类，序列化为 class constructor
// 如果是一个枚举，序列化为 Number
// 如果至少有一个调用签名，序列化为 Function
// 其它的序列化为 Object (包括接口)
// 接口和字面量对象在未来可能会被序列化为复杂类型序列，但是这个特性现在还不能用。

import { cacheList } from "./store";
import { metadataRename, metadataInnerType, metadataMarked, metadataType, metadataFormat } from "./meta-type";

export function Json(rename: string): PropertyDecorator;
export function Json(innerType: Function): PropertyDecorator;
export function Json(rename: string[], format: Function): PropertyDecorator;
export function Json(target, key: string): any;

export function Json(...args: any[]) {
  const [param1, param2] = args;
  if (typeof param1 === 'object' && typeof param2 === 'string') {
    // 直接作为 装饰器
    const target = param1;
    const key = param2;
    record(target, key);
    Reflect.defineMetadata(metadataMarked, true, target);
    const type = Reflect.getMetadata(metadataType, target, key);
    if (!type) {
      // 不支持 metadata / 没有定义类型
      console.error('metadata 未能取到正确类型，请确认 reflect-metadata 是否支持 或 正确定义类型!');
    }
  } else if (typeof param1 === 'string' && param2 === undefined) {
    // 重命名 返回装饰器
    const rename = param1;
    return function (target, key: string) {
      Reflect.defineMetadata(metadataRename, rename, target, key);
      record(target, key);
    }
  } else if (typeof param1 === 'function' && param2 === undefined) {
    // 数组 内嵌类型
    const type = param1;
    return function (target, key: string) {
      Reflect.defineMetadata(metadataInnerType, type, target, key);
      record(target, key);
    }
  } else if (Array.isArray(param1) && typeof param2 === 'function') {
    // format 函数
    const formatParamKeys = param1;
    const formatFunc = param2;
    return function (target, key: string) {
      Reflect.defineMetadata(metadataFormat, { formatParamKeys, formatFunc }, target, key);
      record(target, key);
    }
  }
}

/**
 * 记录属性相关信息
 * @param { object } target 原型
 * @param { string } key 属性键名
 */
function record (target, key) {
  Reflect.defineMetadata(metadataMarked, true, target);
  const targetKeyList = cacheList.get(target) || [];
  cacheList.set(target, [...targetKeyList, key]);
}
