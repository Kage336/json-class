
import "./App.less";
import React, { useState } from 'react';

import "reflect-metadata";
import { JsonToClass, Json } from 'json-class'

class Propertie {
  @Json
  name: string;

  @Json(String)                     //Array string
  values: string[]
}


class Sku {
  @Json
  name: string = "拉面";             //default value

  @Json
  price: string;

  @Json("sku_id")                  //alias key name
  skuid: string;

  @Json
  spec: string;

  @Json
  stock: number;                   // string convert to number

  @Json                              //add new key and default value
  isChecked: boolean = false;
}

class Good {
  @Json
  name: string;

  @Json
  subname: string;

  @Json(['name', 'place'], (name, place) => place + name) //custom convert function
  fullname: string;

  @Json
  description: string;

  @Json
  price: string;

  @Json
  min_order_count: number

  @Json
  unit: string;

  @Json
  category_name: string;

  @Json
  picture: string;

  @Json(Sku)                   //Array Object conversion
  skus: Sku[];

  @Json
  properties: Propertie;       //Object conversion
}


const tansformJson = {
  "name": "拉面",
  "place": "兰州",
  "description": "",
  "price": 11,
  "min_order_count": 1,
  "unit": "支",
  "category_name": "分类",
  "picture": "http://p0.meituan.net/34747.jpg",
  "skus": [{
    name: "牛肉拉面加个蛋",
    price: "21.00",
    sku_id: "987651",
    spec: "M-09",
    stock: "20"
  },
  {
    price: "23.00",
    sku_id: "783651",
    spec: "M-0908",
    stock: "a"
  }],
  "properties": {
    "name": "口味",
    "values": ["辣", "不辣"]
  }
}

const testPage: React.SFC<any> = (props) => {

  console.log(JsonToClass<Good>(tansformJson, Good));


  return (<div className="json-wrapper">
    json-class demo1
  </div>)
}

export default testPage
