import { createSlice } from "@reduxjs/toolkit";
// import convertToDateFormat from "utils/convertToDateFormat";

const initialState = {
  name: null,
  email: null,
  phone_number: null,
  password: null,
  confirm_password: null,
  organization_name: null,
  organization_email: null,
  company_website: null,
  date_of_incorporation: null,
  industry_type: null,
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
    clearFormData(state) {
      let newState = { ...state };
      newState.name = null;
      newState.email = null;
      newState.phone_number = null;
      newState.password = null;
      newState.confirm_password = null;
      newState.organization_name = null;
      newState.organization_email = null;
      newState.company_website = null;
      newState.date_of_incorporation = null;
      newState.industry_type = null;
      newState.admin_identity_document = {};
      newState.certificate_of_incorporation = {};
      newState.letter_of_authorization = {};
      return newState;
    },
  },
});

export const { updateFormdata, clearFormData } = registerSlice.actions;
export default registerSlice.reducer;
