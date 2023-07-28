export const formatOptionsList = (data) => {
  let obj = {};

  data?.forEach((item) => {
    const key = item;
    const val = item;
    obj[key] = val;
  });

  return obj;
};
