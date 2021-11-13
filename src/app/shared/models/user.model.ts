// Using Classes for models vs interfaces allows you to
// dynamically change values in your model
export class User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;

  constructor({
    id = 0,
    first_name = '',
    last_name = '',
    email = '',
    password = '',
    ...rest
    // rest is built in to typescript we use this
    // to add paramaters later if their are API
    // changes
  }) {
    // We are assigning these values to
    // the object in this file
    // ie. this refers to this object(User)
    // rest spread is getting the values from
    // our defaults in the constructor
    Object.assign(this, rest);
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }
}
