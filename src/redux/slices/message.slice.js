import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message_id: null,
  sender_id: null,
  reciever_id: null,
  isSender: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    updateMessageId(state, action) {
      const messageObj = action.payload;
      let newState = { ...state };
      Object.assign(newState, messageObj);
      return newState;
    },
  },
});

export const { updateMessageId } = messageSlice.actions;
export default messageSlice.reducer;
