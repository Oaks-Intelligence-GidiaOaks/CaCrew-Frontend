// export const
const validate = (values) => {
  const errors = {};
  Object.keys(values)?.forEach((item) => {
    // console.log(values[item]);
    // console.log(item);

    // Check empty inputs
    if (values[item] === null) {
      errors[item] = `${item} is required`;
    }

    // Validate email
    if (
      item?.includes("email") &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values[item])
    ) {
      errors[item] = "Invalid email address";
    }

    // Validate phone number
    // if (item?.includes("phone") && !/^\d{11}$/i.test(values[item])) {
    //   errors[item] = "Invalid phone number format";
    // }
    if (
      item?.includes("phone") &&
      isNaN(values[item]) &&
      values[item]?.length < 6
    ) {
      errors[item] = "Invalid phone number format";
    }

    // Validate password || confirm password
    if (item?.includes("password") && values[item]?.length < 6) {
      errors[item] = "Password must be at least 6 characters long";
    }
  });

  return errors;
};

// required field validation
export const required =
  (name = "This") =>
  (value) =>
    value ? undefined : `${name} field is required`;

//  Must be a number validation
export const mustBeNumber = (value) =>
  isNaN(value) ? "Must be a number" : undefined;

//  Min value validation
export const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

// export const composeValidators =
//   (...validators) =>
//   (value) =>
//     validators.reduce(
//       (error, validator) => error || validator(value),
//       undefined
//     );

export default validate;
