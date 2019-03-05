// import { cacheList, metadataConstructor, metadataRename, metadataInnerType } from "./meta-type";

// // polyfill
// export function number(config) {
//   return function (target, key: string) {
//     _record(target, key, Number, config)
//   }
// }

// export function string(config) {
//   return function (target, key: string) {
//     _record(target, key, String, config)
//   }
// }

// export function boolean(config) {
//   return function (target, key: string) {
//     _record(target, key, Boolean, config)
//   }
// }

// export function array(config) {
//   return function (target, key: string) {
//     _record(target, key, Array, config)
//   }
// }

// export function object(config) {
//   return function (target, key: string) {
//     _record(target, key, config.type, config)
//   }
// }

// function _record(target, key, type, config) {
//   Reflect.defineMetadata('design:type', type, target, key);
//   config.type && Reflect.defineMetadata(metadataConstructor, config.type, target, key)
//   const targetKeyList = cacheList.get(target) || []
//   cacheList.set(target, [...targetKeyList, key]);
// }

export {}
