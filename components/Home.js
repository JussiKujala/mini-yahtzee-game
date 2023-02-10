import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, Pressable, Keyboard, TextInput } from 'react-native';
import styles from '../style/style';

export default Home = ({navigation}) => {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        if (value.trim().length > 0){
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

  return (
    <View>
        <Text>Home is here</Text>
        { !hasPlayerName 
        ?
        <>
        <Text>For Scoreboard enter your name</Text>
        <TextInput onChangeText = {setPlayerName} autoFocus={true}></TextInput>
        <Pressable onPress={() => handlePlayerName(playerName)}>
            <Text>OK</Text>
        </Pressable>
        </>
        :
        <>
        <Text>Rules of the game here..</Text>
        <Text>Good luck, {playerName}</Text>
        <Pressable onPress={() => navigation.navigate('Gameboard', {player: playerName})}>
            <Text>PLAY</Text>
        </Pressable>
        </>
        }
    </View>
  )
}