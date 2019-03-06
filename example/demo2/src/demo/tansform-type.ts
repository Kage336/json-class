import { Json } from "json-class";
export const tansformType =
  `class Good {
    @Json
    name: string;
  
    @Json
    place: string;
  
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

  //add new key and default value
  isChecked: boolean = false;
}

class Propertie {
  @Json
  name: string;

  @Json(String)                     //Array string
  values: string[]
}
`

export const tansformJson = {
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
    "values": [{ name: "辣" }, "不辣"]
  }
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
  stock: string;                   // string convert to number


  isChecked: boolean = false;

}

class Propertie {
  @Json
  name: string;

  @Json(String)                     //Array string
  values: string[]
}

export class Good {
  @Json
  name: string;

  @Json
  place: string;

  @Json(['name', 'place'], (name, place) => place + name) //custom convert function
  fullname: string;

  @Json
  description: string;

  @Json
  price: string;

  @Json
  min_order_count: number = 0

  @Json
  unit: string = "";

  @Json
  category_name: string;

  @Json
  picture: string;

  @Json(Sku)                   //Array Object conversion
  skus: Sku[];

  @Json
  properties: Propertie;       //Object conversion
}