import Alerts from "../../src/Util/Alerts";

describe("Alerts.test.js: ", () => {
  test("verify if a collection of Strings is also empty ", () => {
    const email = "";
    const password = "A STRONG PASSWORD";
    const name = "Fake Jhon Doe";

    const ObjectCollection = [email, password, name];

    const isEmpty = Alerts.alertIfObjectsAreEmpty(ObjectCollection, msg =>
      console.log(msg)
    );

    expect(isEmpty).toBeTruthy();
  });

  test("Verify if it can handle a false email", () => {
    const falseEmail = "this@notanemail";

    const isAnEmail = Alerts.alertIfIsNotAnEmail(falseEmail, msg =>
      console.log(msg)
    );

    expect(isAnEmail).toBeFalsy();
  });

  test("Verify if it can handle a true email", () => {
    const email = "dani@gmail.com";

    const isAnEmail = Alerts.alertIfIsNotAnEmail(email, msg =>
      console.log(msg)
    );

    expect(isAnEmail).toBeTruthy();
  });

  test("Verify if a collection of Strings are not empty", () => {
    const email = "androidapps0703@gmail.com";
    const password = "12345678!";
    const name = "The Real Jhon Doe";

    const ObjectCollection = [email, password, name];

    const isEmpty = Alerts.alertIfObjectsAreEmpty(ObjectCollection, msg =>
      console.log(msg)
    );

    expect(isEmpty).toBeFalsy();
  });

  test("Verify if a collection of String arent empty also verify the email", () => {
    const email = "test@jhon.doe";
    const password = "TEST";
    const name = "Jhon Doe";

    const ObjectCollection = [email, password, name];

    const isAValidData = Alerts.invalidData(ObjectCollection, email, msg => {
      console.log(msg);
    });

    expect(isAValidData).toBeTruthy();
  });

  test("Verify if a collection of Strings arent empty and also verify a false email", () => {
    const email = "test@jhondoe";
    const password = "TEST";
    const name = "Jhon Doe";

    const ObjectCollection = [email, password, name];

    const isAValidData = Alerts.invalidData(ObjectCollection, email, msg => {
      console.log(msg);
    });

    expect(isAValidData).toBeFalsy();
  });

  test("Verify if a collection of Strings are empty and also verify a true email",()=>{
    const email = "test@jhon.doe";
    const password = "";
    const name = "Jhon Doe";

    const ObjectCollection = [email, password, name];

    const isAValidData = Alerts.invalidData(ObjectCollection, email, msg => {
      console.log(msg);
    });

    expect(isAValidData).toBeFalsy();
  });

  test("Verify if a collection of Strings are empty and also verify a false email",()=>{
    const email = "not an email";
    const password = "";
    const name = "";

    const ObjectCollection = [email, password, name];

    const isAValidData = Alerts.invalidData(ObjectCollection, email, msg => {
      console.log(msg);
    });

    expect(isAValidData).toBeFalsy();
  });
});
