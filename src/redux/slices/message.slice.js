import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reciever: null,
  name: null,
  chat_id: null,
  refetch: false
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
