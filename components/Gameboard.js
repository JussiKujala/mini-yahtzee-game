import { Text, View, Pressable } from 'react-native';
import styles from '../style/style';
import { useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, SCOREBOARD_KEY, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';
import { Grid, Col } from 'react-native-easy-grid';
import style from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

let board = [];

export default Gameboard = ({ route }) => {

  const [playerName, setPlayerName] = useState('');
  const [nbrOfThrowsleft, setNbrOfThrowsleft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('');
  //this array has the information whether dice is selected or not
  const [selectedDices, setSelectedDices] =
    useState(new Array(NBR_OF_DICES).fill(false));
  const [selectedDicePoints, setSelectedDicePoints] =
    useState(new Array(MAX_SPOT).fill(false));
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
  const [sum, setSum] = useState(0);
  const [scores, setScores] = useState([]);

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable
        disabled={nbrOfThrowsleft === 3}
        key={"row" + i}
        onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={50}
          color={getDiceColor(i)}
        />
      </Pressable>
    );
  }

  const pointsRow = [];

  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"points" + spot}>
        <Text key={"points" + spot} style={styles.points}>{getSpotTotal(spot)}</Text>
      </Col>
    )
  }

  const ButtonsRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    ButtonsRow.push(
      <Col key={"buttonsRow" + diceButton}>
        <Pressable
          onPress={() => selectDicePoints(diceButton)}
          key={"buttonsRow" + diceButton}
          disabled={nbrOfThrowsleft > 0}
        >
          <MaterialCommunityIcons name={"numeric-" + (diceButton + 1) + "-circle"}
            key={"buttonsRow" + diceButton}
            size={40}
            color={getDicePointsColor(diceButton)}
          ></MaterialCommunityIcons>
        </Pressable>
      </Col>
    )
  }

  useEffect(() => {
    if (playerName === '' && route.params?.player) {
      setPlayerName(route.params.player);
    }

    const newSum = dicePointsTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    if (newSum >= BONUS_POINTS_LIMIT) {
      setSum(newSum + BONUS_POINTS);
    } else {
      setSum(newSum);
    }
  }, [dicePointsTotal, selectedDicePoints, playerName, route.params?.player]);

  useEffect(() => {
    if (selectedDicePoints.every(x => x)) {
      savePlayerPoints();
    }
  }, [sum]);

  useEffect(() => {
    if (nbrOfThrowsleft === 0) {
      setStatus('select your points');
    }
    else if (nbrOfThrowsleft < 0) {
      setNbrOfThrowsleft(NBR_OF_THROWS - 1);
    }
  }, [nbrOfThrowsleft, dicePointsTotal])


  function getDiceColor(i) {
    return selectedDices[i] ? "black" : "steelblue"
  }

  function getDicePointsColor(i) {
    if (selectedDicePoints[i]) {
      return "black";
    }
    else {
      return "steelblue";
    }
  }

  const startNewGame = () => {
    setNbrOfThrowsleft(NBR_OF_THROWS);
    setSelectedDices([]);
    setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
    setStatus('Throw dices');
    setDiceSpots(new Array(NBR_OF_DICES).fill(0));
    setDicePointsTotal(new Array(MAX_SPOT).fill(0));
    setSum(0);
    board = [];
  };

  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  function selectDicePoints(i) {
    let selected = [...selectedDices];
    let selectedPoints = [...selectedDicePoints];
    let points = [...dicePointsTotal];
    if (!selectedPoints[i]) {
      selectedPoints[i] = true;
      let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
      points[i] = nbrOfDices * (i + 1);
      setDicePointsTotal(points);
    }
    selected.fill(false);
    setSelectedDices(selected);
    setSelectedDicePoints(selectedPoints);
    setNbrOfThrowsleft(NBR_OF_THROWS);
    return points[i];
  }

  const throwDices = () => {
    let spots = [...diceSpots];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
        spots[i] = randomNumber;
      }
    }
    if (nbrOfThrowsleft > 0) {
      setNbrOfThrowsleft(nbrOfThrowsleft - 1);
      setDiceSpots(spots);
      setStatus('Select and throw dices again');
    }
  }

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        let tmpScores = JSON.parse(jsonValue);
        setScores(tmpScores);
      } else {
        await AsyncStorage.setItem(SCOREBOARD_KEY, JSON.stringify([]));
      }
    } catch (error) {
      console.log('Read error: ' + error.message);
    }
  }

  const savePlayerPoints = async () => {
    const playerPoints = {
      name: playerName,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      points: sum
    };
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        let tmpScores = JSON.parse(jsonValue);
        const existingPlayerIndex = tmpScores.findIndex(p => p.name === playerName);
        if (existingPlayerIndex >= 0) {
          const existingPlayer = tmpScores[existingPlayerIndex];
          if (existingPlayer.points < playerPoints.points) {
            tmpScores[existingPlayerIndex] = playerPoints;
            setScores(tmpScores);
            await AsyncStorage.setItem(SCOREBOARD_KEY, JSON.stringify(tmpScores));
          }
        } else {
          tmpScores.push(playerPoints);
          setScores(tmpScores);
          await AsyncStorage.setItem(SCOREBOARD_KEY, JSON.stringify(tmpScores));
        }
        setScores(tmpScores);
        await AsyncStorage.setItem(SCOREBOARD_KEY, JSON.stringify(tmpScores));
      } else {
        setScores([playerPoints]);
        await AsyncStorage.setItem(SCOREBOARD_KEY, JSON.stringify([playerPoints]));
      }
    }
    catch (error) {
      console.log('Read error: ' + error.message)
    }
  }


  return (
    <View style={styles.gameboard}>
      <Header />
      <View style={styles.flex}>{row}</View>
      {sum === 0 && nbrOfThrowsleft === 3 && selectedDicePoints.every(x => !x) ? (
        <MaterialCommunityIcons style={styles.materialIcon} name="dice-multiple" size={75} color={"steelblue"} />
      ) : null}
      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsleft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      {selectedDicePoints.every(x => x) ? (
        <Pressable style={styles.button} onPress={() => { startNewGame(); savePlayerPoints(); }}>
          <Text style={styles.buttonText}>Start New Game</Text>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.button, nbrOfThrowsleft === 0 && styles.disabledButton]}
          onPress={throwDices}
          disabled={nbrOfThrowsleft === 0}
        >
          <Text style={styles.buttonText}>Throw Dices</Text>
        </Pressable>
      )}

      <Text style={styles.gameTotalPoints}>Total: {sum}</Text>
      {sum <= BONUS_POINTS_LIMIT ? (
        <Text>You are {BONUS_POINTS_LIMIT - sum} points away from bonus</Text>
      ) : (<Text>You have earned a bonus! ({BONUS_POINTS} points)</Text>)}
      <View style={styles.dicepoints}><Grid>{pointsRow}</Grid></View>
      <View style={styles.dicepoints}><Grid>{ButtonsRow}</Grid></View>
      <Text>Player: {playerName}</Text>
      <Footer />
    </View>
  )
}

