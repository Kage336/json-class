import { Json } from "json-class";
export const fixErrorType =
`
// 基础类型可以正常序列化，
// 引用类型（无法转换为基础类型），会直接重置为默认值/初始值
enum IEnum {
  a,
  b,
  c
}

class Student {
  @Json
  boolStudent: boolean;
  @Json
  numStudent: number;
  @Json
  strStudent: string;
  @Json
  enumStudent: IEnum.c
  @Json
  objStudent: object;
  @Json(Object)
  arrStudent: Object[];
}

class Person {
  @Json
  boolPerson: boolean;
  @Json
  numPerson: number;
  @Json
  strPerson: string = '我是默认的 str';
  @Json
  enumPerson: IEnum.c
  @Json
  objPerson: Student;
  @Json(Student)
  arrPerson: Student[];
}
`

export const fixErrorJson = {
  boolPerson: 1,
  numPerson: '123',
  strPerson: {},
  enumPerson: '0',
  objPerson: '',
  arrPerson: 0
}


enum IEnum {
  a,
  b,
  c
}

class Student {
  @Json
  boolStudent: boolean;
  @Json
  numStudent: number;
  @Json
  strStudent: string;
  @Json
  enumStudent: IEnum.c
  @Json
  objStudent: object;
  @Json(Object)
  arrStudent: object[];
}

export class Person4 {
  @Json
  boolPerson: boolean;
  @Json
  numPerson: number;
  @Json
  strPerson: string = '我是默认的 str';
  @Json
  enumPerson: IEnum.c
  @Json
  objPerson: Student;
  @Json(Student)
  arrPerson: Student[];
}
