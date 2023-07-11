// modal.slice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";

// Define the initial state of the modal
const initialState = {
  title: "",
  message: "",
  success: false,
  promptMessage: "",
  promptLink: "",
  isOpen: false,
  component: null, // This can hold a React component
};

// Create a slice using createSlice
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Open the modal with the given content and component
    openModal: (state, action) => {
      const modalObj = action.payload;
      let newState = { ...state };
      let ne
      Object.assign(newState, modalObj);
      return newState;
    },
    // Close the modal and reset the state
    closeModal: (state) => {
      let newState = { ...state };
      newState.title = "";
      newState.message = "";
      newState.success = false;
      newState.promptMessage = "";
      newState.promptLink = "";
      newState.isOpen = false;
      newState.component = null;
      return newState;
    },
  },
});

// Export the slice actions and reducer
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

// Create a selector that can get the modal state from the root state
export const selectModal = createSelector(
  (state) => state.modal,
  (modal) => modal
);
