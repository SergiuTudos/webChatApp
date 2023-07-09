import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatContext from '../context/ChatContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatScreen = ({ route }) => {
    const { chat } = route.params;
    const chatContext = useContext(ChatContext);
    const {activeChat} = chatContext.state;
    const [message, setMessage] = useState('');
    const navigation = useNavigation();


    const sendMessage = async () => {
       chatContext.sendMessage(activeChat.name, message);
       setMessage('')
    };
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
         <View style = {{flex:1, marginHorizontal:10}}>
            <TouchableOpacity style={styles.backButtonContainer} onPress={handleGoBack}>
                {/* <Icon name="power-off" size={20} style={styles.backButtonIcon} /> */}
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>


            <Text style={styles.header}>Chat: {}</Text>
            <FlatList
                data={activeChat.messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text>{`${activeChat.name}: ${item}`}</Text>
                )}
                ListEmptyComponent={<Text>Start Your Conversation Here</Text>}
                inverted
            />

            <TextInput
                style={styles.input}
                placeholder=" Type a message"
                value={message}
                onChangeText={text => setMessage(text)}
            />
            <Button color= 'blue' title="Send" onPress={sendMessage} />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    header: {
        fontSize: 24, fontWeight: 'bold', marginBottom: 20
    },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 },
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
      },
      backButtonIcon: {
        marginRight: 5,
      },
      backButtonText: {
        fontSize: 18,
        color: 'blue',
      },
});

export default ChatScreen;