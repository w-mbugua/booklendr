export const isEmail = (str: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
const phoneRegexSaf =
  /^(?:254|\+254)?((?:(?:0?7(?:(?:[01249][0-9])|(?:5[789])|(?:6[89])))|(?:1(?:[1][0-5])))[0-9]{6})$/;
const phoneRegexAirtel =
  /^(?:254|\+254)?((?:(?:0?7(?:(?:3[0-9])|(?:5[0-6])|(8[5-9])))|(?:1(?:[0][0-2])))[0-9]{6})$/;

const phoneRegexOrange = /^(?:254|\+254)?(0?77[0-6][0-9]{6})$/;
const phoneRegexEquitel = /^(?:254|\+254)?(0?76[34][0-9]{6})$/;
export const isValidPhone = (phone: string) => {
  const isValidSaf = phoneRegexSaf.test(phone);
  const isValidAirtel = phoneRegexAirtel.test(phone);
  const isValidOrange = phoneRegexOrange.test(phone);
  const isValidEquitel = phoneRegexEquitel.test(phone);
  const isValid =
    isValidSaf || isValidAirtel || isValidOrange || isValidEquitel;
  return isValid;
};
