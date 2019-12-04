class ValidationService {
  validateName(name = "") {
    return REGEXP.NAME.test(name);
  }
  validateEEUUBirthDate(date = "") {
    return moment(date,"YYYY-MM-DD",true).isValid();
  }
}
