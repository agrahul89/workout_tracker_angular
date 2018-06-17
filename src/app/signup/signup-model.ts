export class SignupModel {

  /* {
    "firstname" : "Shyam",
    "lastname" : "Agarwal",
    "password" : "P@ssw5rd",
    "email" : "test5@test.mail"
  } */
  constructor(
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public password?: string) { }

    toString() {return JSON.stringify(this); }
}
