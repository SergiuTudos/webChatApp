import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatContext from '../context/ChatContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {

    const chatContext = useContext(ChatContext);
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

    const [users, setUsers] = useState([
        { name: 'Alex' },
        { name: 'Nikki' },
        { name: 'John' }
    ]);

    const [groupChats, setGroupChats] = useState([
        { name: 'Friends', participants: ['Alex', 'Nikki', 'John'], messages: [] },
        { name: 'ClassMates', participants: ['Nikki', 'John'], messages: [] }
    ]);

    const selectChat = (chat) => {
        navigation.navigate('Chat', { chat });
    };



  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };


    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <View >
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Web Chat</Text>
                <FlatList
                    data={[...users, ...groupChats]}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <Button title={item.name} onPress={() => selectChat(item)} />
                    )}
                    ItemSeparatorComponent={renderSeparator}
                    ListEmptyComponent={<Text>No chats available</Text>}
                />

        
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
      paddingVertical: 8,
    },
    separator: {
      height: 1,
      backgroundColor: 'lightgray',
      marginVertical: 4,
    },
  });

  
export default HomeScreen;