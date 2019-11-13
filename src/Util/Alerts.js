import _ from "lodash";

function alertIfObjectsAreEmpty(objectCollection, toggleModal) {
  var areEmpty = 0;

  objectCollection.map(item => {
    if (_.isEqual(item, "")) areEmpty++;

    return areEmpty;
  });

  if (areEmpty > 0) toggleModal("Please fill the empty inputs");

  return areEmpty > 0;
}

function alertIfIsNotAnEmail(email, toggleModal) {
  let re = /\S+@\S+\.\S+/;
  let isAnEmail = re.test(email);

  if (!isAnEmail) {
    toggleModal("Please type a correct email");
  }

  return isAnEmail;
}

function invalidData(objectCollection, email, toggleModal) {
  const objectsEmpty = !alertIfObjectsAreEmpty(objectCollection, toggleModal);
  const invalidEmail = alertIfIsNotAnEmail(email, toggleModal);

  return objectsEmpty && invalidEmail;
}

export default {
  alertIfObjectsAreEmpty: alertIfObjectsAreEmpty,
  alertIfIsNotAnEmail: alertIfIsNotAnEmail,
  invalidData: invalidData
};
