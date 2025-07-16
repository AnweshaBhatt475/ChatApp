import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateMessageSeen: (state, action) => {
      const { conversationId, userId } = action.payload;
      state.messages = state.messages.map(msg =>
        msg.conversationId === conversationId && msg.receiver === userId
          ? { ...msg, seen: true }
          : msg
      );
    },
    updateDeletedMessage: (state, action) => {
      const { messageId } = action.payload;
      state.messages = state.messages.map(msg =>
        msg._id === messageId
          ? {
              ...msg,
              text: 'This message was deleted',
              imageUrl: null,
              videoUrl: null,
              audioUrl: null,
              isDeleted: true,
            }
          : msg
      );
    },
  },
});

export const { setMessages, addMessage, updateMessageSeen, updateDeletedMessage } = messageSlice.actions;
export default messageSlice.reducer;
