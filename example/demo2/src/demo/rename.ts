import { Json } from "json-class";
export const renameType =
`enum IEnum {
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

class Person {
  @Json('bool')
  boolPerson: boolean;
  @Json('num')
  numPerson: number;
  @Json('str')
  strPerson: string;
  @Json('enum')
  enumPerson: IEnum.c
  @Json('student')
  objPerson: Student;
  @Json(Student)
  arrPerson: Student[];
}
`

export const renameJson = {
  bool: 1,
  num: '123',
  str: 456,
  enum: '0',
  student: {},
  arrPerson: []
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

export class Person2 {
  @Json('bool')
  boolPerson: boolean;
  @Json('num')
  numPerson: number;
  @Json('str')
  strPerson: string;
  @Json('enum')
  enumPerson: IEnum.c
  @Json('student')
  objPerson: Student;
  @Json(Student)
  arrPerson: Student[];
}
