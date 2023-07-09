import React, { useReducer } from 'react';
import ChatContext from '../context/ChatContext';

const  CREATE_CHAT = 'CREATE_CHAT';
const SEND_MESSAGE = 'SEND_MESSAGE';
const SELECT_CHAT = 'SELECT_CHAT';

const initialState = {
  users: [
    { name: 'Alex' },
    { name: 'Nikki' },
    { name: 'John' }
  ],
  groupChats: [
    { name: 'Group Chat 1', participants: ['Alex', 'Nikki', 'John'], messages: [] },
    { name: 'Group Chat 2', participants: ['Nikki', 'John'], messages: [] }
  ],
  activeChat:null
};

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_CHAT:
      return {
        ...state,
        groupChats: [...state.groupChats, action.payload]
      };
    case SEND_MESSAGE:
      const { chatName, message } = action.payload;
      return {
        ...state,
        groupChats: state.groupChats.map(chat =>
          chat.name === chatName
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        )
      };
    case SELECT_CHAT:
      const { chat} = action.payload;
      return {
        ...state,
        activeChat:chat
      };
    default:
      return state;
  }
};

const ChatStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createChat = (chat) => {
    dispatch({ type: CREATE_CHAT, payload: chat });
  };

  const sendMessage = (chatName, message) => {
    dispatch({ type: SEND_MESSAGE, payload: { chatName, message } });
  };
  const selectChat = (chat)=>{
    dispatch({ type: SELECT_CHAT, payload: { chat } });
  }

  return (
    <ChatContext.Provider value={{ state, createChat, sendMessage, selectChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatStore;
