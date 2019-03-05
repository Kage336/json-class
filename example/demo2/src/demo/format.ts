import { Json } from "json-class";
import { string } from 'prop-types';
export const formatType =
  `
  class Person3 {
    @Json(['firstname', 'lastname'], (firstname, lastname) => firstname + lastname)
    fullname: string;

    @Json
    firstname: string
    
    @Json
    lastname: string
  
  }
`

export const formatJson = {

  firstname: "王",
  lastname: "二麻子",
}



export class Person3 {
  @Json(['firstname', 'lastname'], (firstname, lastname) => firstname + lastname)
  fullname: string;
  @Json
  firstname: string
  @Json
  lastname: string

}


