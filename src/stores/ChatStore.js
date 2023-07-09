import React, { useReducer } from 'react';
import ChatContext from '../context/ChatContext';

const initialState = {
  users: [
    { name: 'Alex' },
    { name: 'Nikki' },
    { name: 'John' }
  ],
  groupChats: [
    { name: 'Group Chat 1', participants: ['Alex', 'Nikki', 'John'], messages: [] },
    { name: 'Group Chat 2', participants: ['Nikki', 'John'], messages: [] }
  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_CHAT':
      return {
        ...state,
        groupChats: [...state.groupChats, action.payload]
      };
    case 'SEND_MESSAGE':
      const { chatName, message } = action.payload;
      return {
        ...state,
        groupChats: state.groupChats.map(chat =>
          chat.name === chatName
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        )
      };
    default:
      return state;
  }
};

const ChatStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createChat = (chat) => {
    dispatch({ type: 'CREATE_CHAT', payload: chat });
  };

  const sendMessage = (chatName, message) => {
    dispatch({ type: 'SEND_MESSAGE', payload: { chatName, message } });
  };

  return (
    <ChatContext.Provider value={{ state, createChat, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatStore;
