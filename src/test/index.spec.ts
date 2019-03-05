import { JsonToClass, Json } from "../";

enum IEnum {
  a,
  b,
  c
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

class Person {
  @Json
  num: number;

  @Json
  str: string;

  @Json
  bol: boolean;

  @Json
  obj: Info; // 默认设为基础类型，实际是 引用类型;

  @Json
  type1: IEnum//=IEnum.c
  @Json
  ischeck: boolean;
  @Json
  id: string = '123456';

  @Json
  name: Info = {
    ischeck: true,
    firstname: 100,
    lastname: '我是自定义的对象哈哈哈哈哈哈'
  };

  @Json
  name2: Info;

  @Json('skill')
  Skill: string;

  @Json
  birthday: Date;

  @Json(Album)
  albums: Array<Album>;

  @Json(['first-name', 'second-name'], (firstname, secondname) => `${firstname}·${secondname}`)
  fullname: string;

  @Json(['first-name', 'second-name'], () => 'asdfa')
  fullname1: string;

  @Json(['fullnameZ'], (fullnameZ) => `${fullnameZ} aaaaaaaaaaaaaaaaaaaaaaa`)
  fullnameZ: string;
}

describe('基础边缘条件测试', () => {
  test('测试类型转换', () => {
    const response = {
      num: '1456'
    }
    const result = JsonToClass<Person>(response, Person);
    expect(result.num).toBe(1456);
  })
  const aa = new Person
  test('基础类型与引用类型错误匹配', () => {
    const response = {
      num: {
        a: 100,
        b: 'asdfasdf'
      },
      str: {
        a: 100,
        b: 'asdfasdf'
      },
      bol: {
        a: 100,
        b: 'asdfasdf'
      },
      obj: false
    }
    const result = JsonToClass(response, Person, false);
    // 定义类型为 number， 实际为对象
    expect(result.num).toBe(0);
    // 定义类型为 string， 实际为对象
    expect(result.str).toBe('');
    // 定义类型为 boolean 实际为对象
    expect(result.bol).toBe(false);
    // 定义类型为 Object 实际为 基础类型
    expect(result.obj).toEqual({
      ischeck: false,
      firstname: 0,
      lastname: ''
    });
  })

  test('测试重命名功能', () => {
    const response = {
      skill: '来自属性 skill'
    }
    const result = JsonToClass(response, Person);
    expect(response.skill).toBe(result.Skill);
  })

  test('测试 Format 函数功能', () => {
    const response = {
      'first-name': 'first-name',
      'second-name': 'second-name',
    }
    const result = JsonToClass(response, Person);
    expect(result.fullname).toBe(`${response['first-name']}·${response['second-name']}`);
  })
})
