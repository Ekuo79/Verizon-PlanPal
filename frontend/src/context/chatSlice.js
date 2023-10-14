import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    assistant: null
  },
  reducers: {
    setAssistant: (state, action) => {
      state.assistant = action.payload;
    }
  },
});

export const { setAssistant } = chatSlice.actions;

export default chatSlice.reducer;