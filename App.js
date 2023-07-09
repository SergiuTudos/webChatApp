import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, AsyncStorage } from 'react-native';

export default function App() {
  const [chats, setChats] = useState([]);
  const [chatName, setChatName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  const createChat = () => {
    const chatExists = chats.some(chat => chat.name === chatName);
    if (!chatExists) {
      const newChat = { name: chatName, messages: [] };
      setChats(prevChats => [...prevChats, newChat]);
    }
    setChatName('');
  };

  const sendMessage = async (chat) => {
    const newMessage = { text: message, sender: 'Me' };
    const updatedChat = { ...chat, messages: [...chat.messages, newMessage] };
    const updatedChats = chats.map(c => (c.name === chat.name ? updatedChat : c));
    setChats(updatedChats);

    if (chat.name === selectedChat?.name) {
      setSelectedChat(updatedChat);
    }

    const replyMessage = { text: message + ' ❤️', sender: chat.name };
    setTimeout(() => {
      const updatedChat = { ...chat, messages: [...chat.messages, replyMessage] };
      const updatedChats = chats.map(c => (c.name === chat.name ? updatedChat : c));
      setChats(updatedChats);

      if (chat.name === selectedChat?.name) {
        setSelectedChat(updatedChat);
      }
    }, 1000);

    setMessage('');
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Web Chat</Text>
      
      <Text style={{ marginBottom: 10 }}>Create a new chat:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Chat name"
        value={chatName}
        onChangeText={text => setChatName(text)}
      />
      <Button title="Create" onPress={createChat} />

      <Text style={{ marginTop: 20 }}>Select a chat:</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Button title={item.name} onPress={() => selectChat(item)} />
        )}
        ListEmptyComponent={<Text>No chats available</Text>}
      />

      {selectedChat && (
        <View>
          <Text style={{ marginTop: 20 }}>Chat: {selectedChat.name}</Text>
          <FlatList
            data={selectedChat.messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text>{`${item.sender}: ${item.text}`}</Text>
            )}
            ListEmptyComponent={<Text>No messages</Text>}
          />

          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
            placeholder="Type a message"
            value={message}
            onChangeText={text => setMessage(text)}
          />
          <Button title="Send" onPress={() => sendMessage(selectedChat)} />
        </View>
      )}
    </View>
  );
}
