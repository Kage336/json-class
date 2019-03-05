import { Json, JsonToClass } from "json-class";
import { data } from "./data/data";
import { data1 } from "./data/1";
import { data2 } from "./data/2";
import { data3 } from "./data/3";


class List {
  @Json platformCode: string;
  @Json provCode: number;
  @Json provName: string;
  @Json snStoreCode: string;
  @Json storeCode: string;
  @Json storeName: string;
  @Json storeType: string;
  @Json townCode: string;
  @Json townName: string;
}

class dataItem {
  @Json createTime: string;
  @Json cmmdtyCode: number;
  @Json cmmdtyName: string;
  @Json supplier: string;
  @Json purchaseNum: number;
  @Json inComingStockNum: number;
  @Json supplierCode: number;
  @Json orderNo: number;
  @Json orderItemNo: number;
  @Json operator: string;
  @Json comingStockNum: number;
  @Json createTime2: string;
  @Json cmmdtyCode2: number;
  @Json cmmdtyName2: string;
  @Json supplier2: string;
  @Json purchaseNum2: number;
  @Json inComingStockNum2: number;
  @Json supplierCode2: number;
  @Json orderNo2: number;
  @Json orderItemNo2: number;
  @Json operator2: string;
  @Json comingStockNum2: number;
  @Json(List) List: List[]
}

class MyData {
  @Json totalCount: number;
  @Json totalPageCount: number;
  @Json(dataItem)
  dataList: dataItem[]
}


console.log(data)

console.time();
// console.log(berfore.valueOf());
const result = JsonToClass(data.data, MyData)
console.timeEnd()
console.time();
// console.log(berfore.valueOf());
const result1 = JsonToClass(data1.data, MyData)
console.timeEnd()
console.time();
// console.log(berfore.valueOf());
const result2 = JsonToClass(data2.data, MyData)
console.timeEnd()
console.time();
// console.log(berfore.valueOf());
const result3 = JsonToClass(data3.data, MyData)
console.timeEnd()
console.log('result ===>', result);

