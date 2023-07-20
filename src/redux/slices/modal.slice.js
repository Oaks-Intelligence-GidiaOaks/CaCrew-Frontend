// modal.slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: null,
  message: null,
  success: false,
  promptMessage: null,
  promptLink: null,
  isOpen: false,
  isOpenComponent: false,
  component: null,
  data: null,
  amount: null,
  transaction_id: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const modalObj = action.payload;
      let newState = { ...state };

      // Check if it's a message modal
      if (modalObj.title || modalObj.message) {
        newState.title = modalObj.title || null;
        newState.message = modalObj.message || null;
        newState.success = modalObj.success || false;
        newState.promptMessage = modalObj.promptMessage || null;
        newState.promptLink = modalObj.promptLink || null;
        newState.isOpen = true;
      }

      // Check if it's a component modal
      if (modalObj.component) {
        newState.isOpenComponent = true;
        newState.component = modalObj.component;
        newState.data = modalObj.data || null;
        newState.amount = modalObj.amount || null;
        newState.transaction_id = modalObj.transaction_id || null;
      }

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
      return newState;
    },
    closeComponentModal: (state) => {
      let newState = { ...state };
      newState.isOpenComponent = false;
      newState.component = null;
      newState.data = null;
      newState.amount = null;
      newState.transaction_id = null;
      return newState;
    },
  },
});

// Export the slice actions and reducer
export const { openModal, closeModal, closeComponentModal } =
  modalSlice.actions;
export default modalSlice.reducer;
