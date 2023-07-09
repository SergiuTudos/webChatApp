import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScren';
const Stack = createStackNavigator();
import ChatStore from './src/stores/ChatStore';




export default function App() {
  return (
    <ChatStore>
      <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: false // Hide the app header
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  </ChatStore>
  );
}
