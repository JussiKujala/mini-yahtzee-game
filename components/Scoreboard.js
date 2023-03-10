import React, {useState, useEffect} from 'react';
import { ScrollView, Text, View, Button } from 'react-native';
import Header from './Header'
import styles from '../style/style';
import Footer from './Footer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, SCOREBOARD_KEY, NBR_OF_SCOREBOARD_ROWS } from '../constants/Game';

export default Scoreboard = ({navigation}) => {

const [scores, setScores] = useState([]);

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    getScoreboardData();
  });
  return unsubscribe;
}, [navigation]);

const clearScoreboard = async () => {
  try {
    await AsyncStorage.removeItem(SCOREBOARD_KEY);
    setScores([]); // update the state to clear the scoreboard
  } catch (error) {
    console.log('Clear error: ' + error.message);
  }
};

const getScoreboardData = async () => {
  try{
    const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
    if (jsonValue !== null){
      let tmpScores = JSON.parse(jsonValue);
      tmpScores.sort((a, b) => b.points - a.points); // Sort by points in descending order
      setScores(tmpScores);
    }
  }
  catch (error){
    console.log('Read error: ' + error.message);
  }
}

  return (
    <ScrollView>
    <View>
    <Header />
    <Text style={styles.topPlayers}>Top {NBR_OF_SCOREBOARD_ROWS} players</Text>
    {scores.length > 0 ? (
    <View>
      {scores.slice(0, 7).map((player, i) => (
        <Text style={styles.scoreboardText} key={i}>
          {i + 1}. {player.name} {player.date} {player.time} {player.points}
        </Text>
      ))}
      <Button title="Clear Scores" onPress={clearScoreboard} />
    </View>
  ) : (
    <Text style={styles.emptyScoreboardText}>Scoreboard is empty</Text>
  )}
  <Footer />
    </View>
    </ScrollView>
  )
}