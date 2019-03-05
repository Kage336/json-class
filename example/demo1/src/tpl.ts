// enum IEnum {
//   a = 0,
//   b,
//   c
// }

// function test(a, b) {
//   return a + b;
// }

// class SubInfo {
//   @Json
//   name: string = "hello subinfo name";
// }

// class Info {
//   @Json
//   ischeck: boolean;
//   @Json
//   firstname: number;
//   @Json
//   lastname: string;
// }

// class Album {
//   @Json('first-name')
//   firstname: string;

//   @Json
//   lastname: string;

//   @Json
//   arrysubname: SubInfo;

//   @Json(['firstname', 'lastname'], (firstname, secondname) => `${firstname}·${secondname}`)
//   fullname: string;

//   get name() {
//     return this.firstname + this.lastname
//   }
// }

// class Person {

//   @Json fakeObj: boolean;
//   @Json
//   type1: IEnum//=IEnum.c
//   @Json
//   ischeck: boolean;
//   @Json
//   id: string = '123456';

//   @Json(Number)
//   complexArr: number[];

//   @Json
//   name: Info;

//   @Json
//   name2: Info;

//   @Json
//   sex: number;

//   @Json('skill')
//   Skill: string;

//   @Json
//   birthday: Date;

//   @Json(Album)
//   albums: Array<Album>;

//   @Json(['first-name', 'second-name'], (firstname, secondname) => `${firstname}·${secondname} ==> 亚洲舞王`)
//   fullname: string;

//   @Json(['first-name', 'second-name'], test)
//   fullname1: string;

//   @Json(['fullnameZ'], (fullnameZ) => `${fullnameZ} aaaaaaaaaaaaaaaaaaaaaaa`)
//   fullnameZ: string;

// }
