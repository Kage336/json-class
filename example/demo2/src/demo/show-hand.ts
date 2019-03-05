import { Json } from "json-class";

export const showHandType =
`
enum IEnum {
  a = 0,
  b,
  c
}

function test(a, b) {
  return a + b;
}

class SubInfo {
  @Json
  name: string = "hello subinfo name";
}

class Info {
  @Json
  ischeck: boolean;
  @Json
  firstname: number;
  @Json
  lastname: string;
}

class Album {
  @Json('first-name')
  firstname: string;

  @Json
  lastname: string;

  @Json
  arrysubname: SubInfo;

  @Json(['firstname', 'lastname'], (firstname, secondname) => firstname + '·' + secondname)
  fullname: string;

  get name() {
    return this.firstname + this.lastname
  }
}

export class Person5 {

  @Json fakeObj: boolean;
  @Json
  type1: IEnum//=IEnum.c
  @Json
  ischeck: boolean;
  @Json
  id: string = '123456';

  @Json(Number)
  complexArr: number[];

  @Json
  name: Info;

  @Json
  name2: Info;

  @Json
  sex: number;

  @Json('skill')
  Skill: string;

  @Json
  birthday: Date;

  @Json(Album)
  albums: Array<Album>;

  @Json(['first-name', 'second-name'], (firstname, secondname) => firstname + '·' + secondname + ' ==> 亚洲舞王)
  fullname: string;

  @Json(['first-name', 'second-name'], test)
  fullname1: string;

  @Json(['fullnameZ'], (fullnameZ) => fullnameZ + 'aaaaaaaaaaaaaaaaaaaaaaa')
  fullnameZ: string;

}`

export const showHandJson = {
  fakeObj: {},
  type1: 3,
  complexArr: ['aaa'],
  a: 123,
  // id: 456,
  sex: 'aaa',
  albums: [{
    "first-name": 132,
    //"firstname":456,
    "lastname": 789
  }, {
    "firstname": 456,
    "lastname": 789
  }],
  'first-name': '尼古拉斯',
  'second-name': '赵四',
  fullnameZ: '尼古拉斯·赵四',
  name: ''
}

enum IEnum {
  a = 0,
  b,
  c
}

function test(a, b) {
  return a + b;
}

class SubInfo {
  @Json
  name: string = "hello subinfo name";
}

class Info {
  @Json
  ischeck: boolean;
  @Json
  firstname: number;
  @Json
  lastname: string;
}

class Album {
  @Json('first-name')
  firstname: string;

  @Json
  lastname: string;

  @Json
  arrysubname: SubInfo;

  @Json(['firstname', 'lastname'], (firstname, secondname) => `${firstname}·${secondname}`)
  fullname: string;

  get name() {
    return this.firstname + this.lastname
  }
}

export class Person5 {

  @Json fakeObj: boolean;
  @Json
  type1: IEnum//=IEnum.c
  @Json
  ischeck: boolean;
  @Json
  id: string = '123456';

  @Json(Number)
  complexArr: number[];

  @Json
  name: Info;

  @Json
  name2: Info;

  @Json
  sex: number;

  @Json('skill')
  Skill: string;

  @Json
  birthday: Date;

  @Json(Album)
  albums: Array<Album>;

  @Json(['first-name', 'second-name'], (firstname, secondname) => `${firstname}·${secondname} ==> 亚洲舞王`)
  fullname: string;

  @Json(['first-name', 'second-name'], test)
  fullname1: string;

  @Json(['fullnameZ'], (fullnameZ) => `${fullnameZ} aaaaaaaaaaaaaaaaaaaaaaa`)
  fullnameZ: string;

}
