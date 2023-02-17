import { Text, View, Pressable } from 'react-native';
import styles from '../style/style';
import { useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT } from '../constants/Game';
import { Grid, Col } from 'react-native-easy-grid';
import style from '../style/style';

let board = [];


export default Gameboard = ({ route }) => {

  const [playerName, setPlayerName] = useState('');
  const [nbrOfThrowsleft, setNbrOfThrowsleft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('');
  //this array has the information whether dice is selected or not
  const [selectedDices, setSelectedDices] =
    useState(new Array(NBR_OF_DICES).fill(false));
//this arrray has the information wheter the spot count has been selected or not
  const [selectedDicePoints, setSelectedDicePoints] =
    useState(new Array(MAX_SPOT).fill(false));
//this array has total points for different spot counts
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
  

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable
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
  
for (let spot = 0; spot < MAX_SPOT; spot++){
  pointsRow.push(
    <Col key={"points" + spot}>
      <Text key={"points" + spot} style={styles.points}>0</Text>
    </Col>
  )
}
  

const ButtonsRow = [];
for(let diceButton = 0; diceButton < MAX_SPOT; diceButton++ ){
  ButtonsRow.push(
  <Col key={"buttonsRow" + diceButton}>
    <Pressable key={"buttonsRow" + diceButton}>
    <MaterialCommunityIcons name={"numeric-" + (diceButton + 1) + "-circle"}
    key={"buttonsRow" + diceButton} size={40} color={"steelblue"}
    >
    </MaterialCommunityIcons>
    </Pressable>
  </Col>
  )
}

  useEffect(() => {
    if (playerName === '' && route.params?.player) {
      setPlayerName(route.params.player);
    }
  }, []);

  function getDiceColor(i){
    if (board.every((val, i, arr) => val === arr[0])){
      return "orange";
    }
    else{
      return selectedDices[i] ? "black" : "steelblue"
    }
  }

  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  const throwDices = () => {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if(!selectedDices[i]){
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      board[i] = 'dice-' + randomNumber;
      }
    }
    setNbrOfThrowsleft(nbrOfThrowsleft-1);
  }

  return (
    <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsleft}</Text>
        <Text style={styles.gameinfo}>{status}</Text>
        <Pressable style={styles.button} onPress={() => throwDices()}>
          <Text style={styles.buttonText}>Throw dices</Text>
        </Pressable>
        <View style={styles.dicepoints}><Grid>{pointsRow}</Grid></View>
        <View style={styles.dicepoints}><Grid>{ButtonsRow}</Grid></View>
      <Text>Player: {playerName}</Text>
    </View>
  )
}