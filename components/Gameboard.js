import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/style';
import { useEffect, useState } from 'react';

export default Gameboard = ({route}) => {

const [playerName, setPlayerName] = useState('');

useEffect(() => {
if (playerName === '' && route.params?.player){
    setPlayerName(route.params.player);
}
}, []);

  return (
    <View>
      <Text>
        Gameboard will be here..
      </Text>
      <Text>Player: {playerName}</Text>
    </View>
  )
}