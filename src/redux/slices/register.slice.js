import { createSlice } from "@reduxjs/toolkit";
// import convertToDateFormat from "utils/convertToDateFormat";

const initialState = {
  name: "",
  email: "",
  phone_number: "",
  password: "",
  confirm_password: "",
  organization_name: "",
  organization_email: "",
  company_website: "",
  date_of_incorporation: "",
  industry_type: "",
  admin_identity_document: {},
  certificate_of_incorporation: {},
  letter_of_authorization: {},
};

const registerSlice = createSlice({
  name: "formdata",
  initialState,
  reducers: {
    updateFormdata(state, action) {
      const values = action.payload;
      // const { date_of_incorporation, ...otherValues } = values;

      let newState = { ...state }; 

      // if (date_of_incorporation) {
      //   const formattedDate = convertToDateFormat(date_of_incorporation);
      //   newState.date_of_incorporation = formattedDate;
      // }

      Object.assign(newState, values); 
      return newState;
    },
  },
});

export const { updateFormdata } = registerSlice.actions;
export default registerSlice.reducer;
