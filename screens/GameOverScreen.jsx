import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

// import { Container } from './styles';

const GameOverScreen = ({rounds, correctNumber, onPlayAgain}) => {
  return (
    <View style={styles.screen}>
      <Text>The game is over!</Text>
      <Text>Number of rounds: {rounds}</Text>
      <Text>Correct number: {correctNumber}</Text>
      <Button title="PLAY AGAIN" onPress={onPlayAgain}/>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})