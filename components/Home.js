import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, Pressable, Keyboard, TextInput } from 'react-native';
import styles from '../style/style';
import Gameboard from './Gameboard';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, SCOREBOARD_KEY, BONUS_POINTS_LIMIT, BONUS_POINTS} from '../constants/Game';

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
        <View style={styles.container}>
            <Header/>
            {!hasPlayerName
                ?
                <>
                    <Text style={styles.frontPageText}>Enter your name for Scoreboard</Text>
                    <TextInput style={styles.textInput} onChangeText={setPlayerName} placeholder="Enter your name here" autoFocus={true}></TextInput>
                    <Pressable onPress={() => handlePlayerName(playerName)}>
                        <Text style={styles.frontpageButton}>OK</Text>
                    </Pressable>
                </>
                :
                <>
                    <Text style={styles.gameInfo}>THE GAME: Upper section of the classic Yahtzee
                        dice game. You have {NBR_OF_DICES} dices and
                        for the every dice you have {NBR_OF_THROWS} throws. After each throw you can keep dices in
                        order to get same dice spot counts as many as
                        possible. In the end of the turn you must select
                        your points from {MIN_SPOT} to {MAX_SPOT}.
                        Game ends when all points have been selected.
                        The order for selecting those is free</Text>
                    <Text style={styles.gameInfo}>POINTS: After each turn game calculates the sum
                        for the dices you selected. Only the dices having
                        the same spot count are calculated. Inside the
                        game you can not select same points from {MIN_SPOT} to {MAX_SPOT} again.</Text>
                    <Text style={styles.gameInfo}>GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points is the limit of
                        getting bonus which gives you {BONUS_POINTS} points more.</Text>

                    <Text style={styles.frontPageText}>Good luck, {playerName}</Text>
                    <Pressable onPress={() => navigation.navigate('Gameboard', { player: playerName })}>
                        <Text style={styles.frontpageButton}>PLAY</Text>
                    </Pressable>
                </>
            }
            <Footer/>
        </View>
    )
}