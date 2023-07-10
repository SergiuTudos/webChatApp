import React, { useReducer } from 'react';
import ChatContext from '../context/ChatContext';

const  CREATE_CHAT = 'CREATE_CHAT';
const SEND_MESSAGE = 'SEND_MESSAGE';
const SELECT_CHAT = 'SELECT_CHAT';

const REPLY_TEMPLATE = " ❤️"

const initialState = {
    conversations : [
        {name: 'Alex', messages: [] },
        { name: 'Nikki', messages: [] },
        { name: 'John', messages: [] }
    ],
  groupChats: [
    { name: 'Friends', participants: ['Alex', 'Nikki', 'John'], messages: [] },
    { name: 'ClassMates', participants: ['Nikki', 'John'], messages: [] }
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
    const item = state.conversations.find(item => item.name === chatName);
        if (item) {
          item.messages.unshift(message);
          item.messages.unshift(message + REPLY_TEMPLATE)
        }
      
      
    dispatch({ type: SEND_MESSAGE, payload: { chatName, messages:item } });
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
