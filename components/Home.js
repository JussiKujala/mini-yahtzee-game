import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, Pressable, Keyboard, TextInput } from 'react-native';
import styles from '../style/style';
import Gameboard from './Gameboard';

export default Home = ({ navigation }) => {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    return (
        <View>
            <Text>Home is here</Text>
            {!hasPlayerName
                ?
                <>
                    <Text>For Scoreboard enter your name</Text>
                    <TextInput onChangeText={setPlayerName} autoFocus={true}></TextInput>
                    <Pressable onPress={() => handlePlayerName(playerName)}>
                        <Text>OK</Text>
                    </Pressable>
                </>
                :
                <>
                    <Text>THE GAME: Upper section of the classic Yahtzee
                        dice game. You have 5 dices and
                        for the every dice you have 3
                        throws. After each throw you can keep dices in
                        order to get same dice spot counts as many as
                        possible. In the end of the turn you must select
                        your points from 1 to 6.
                        Game ends when all points have been selected.
                        The order for selecting those is free</Text>
                    <Text>POINTS: After each turn game calculates the sum
                        for the dices you selected. Only the dices having
                        the same spot count are calculated. Inside the
                        game you can not select same points from
                        1 to 6 again.</Text>
                    <Text>GOAL: To get points as much as possible.
                        63 points is the limit of
                        getting bonus which gives you 50
                        points more.</Text>

                    <Text>Good luck, {playerName}</Text>
                    <Pressable onPress={() => navigation.navigate('Gameboard', { player: playerName })}>
                        <Text>PLAY</Text>
                    </Pressable>
                </>
            }
        </View>
    )
}