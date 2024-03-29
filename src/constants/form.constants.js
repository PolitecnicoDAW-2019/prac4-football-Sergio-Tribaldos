const REGEXP = {
  NAME: /^[a-zA-Z].{2,128}$/,
  SURNAME: /^[a-zA-Z].{2,256}$/,
  ADDRESS: /^.{5,256}$/,
  EMAIL: /^[\w!#$%&'*+-/=?^_`{|}~]{2,256}@[\w!#$%&'*+-/=?^_`{|}~]{2,256}\.[a-z]{2,25}$/,
  SPANISH: {
    POSTAL_CODE: /^\d{5}$/,
    LAND_LINE: /^(0034)?(\+34)?[8|9]{1}[\d]{8}$/,
    MOVILE_PHONE: /^((\+34)([\d]{9}))$|^((0034)[\d]{9})$|^[^0034][^+34]([\d]{7})$/,
    BIRTH_DATE: /^([0][1-9]|[2-3][0-9]|(3)[0-1])(\/)(((0)[1-9])|((1)[0-2]))(\/)([1][9][0-9][0-9]|[2][0][0-1][0-9])$/
  },
  EEUU: {
    POSTAL_CODE: /^[\d]{5}-[\d]{4}$/,
    LAND_LINE: /^\([\d]{3}\)[\d]{3}-[\d]{4}$/,
    MOVILE_PHONE: /^(\+)?[\d]{1}-[\d]{3}-[\d]{3}-[\d]{4}$/,
    BIRTH_DATE: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/
  }
};
