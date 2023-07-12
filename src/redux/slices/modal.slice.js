// modal.slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: null,
  message: null,
  success: false,
  promptMessage: null,
  promptLink: null,
  isOpen: false,
  component: null, 
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const modalObj = action.payload;
      let newState = { ...state };
      newState.isOpen = true;
      Object.assign(newState, modalObj);
      return newState;
    },
    closeModal: (state) => {
      let newState = { ...state };
      newState.title = null;
      newState.message = null;
      newState.success = false;
      newState.promptMessage = null;
      newState.promptLink = null;
      newState.isOpen = false;
      newState.component = null;
      return newState;
    },
  },
});

// Export the slice actions and reducer
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

