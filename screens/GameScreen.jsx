import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import DefaultStyles from '../constants/default-styles';
// import { Container } from './styles';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

const GameScreen = ({userChoice, onGameOver}) => {
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(currentLow.current, currentHigh.current, userChoice)
  );
  
  const [rounds, setRounds] = useState(0);


  useEffect(() => {
    if(currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver])


  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ){
      Alert.alert(
        'Don\'t lie!', 
        'You know that this is wrong...', 
        [{text:'Sorry!', style: 'cancel'}]
      );
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(rounds + 1)
  }
  
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title} >Opponent's guess:</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler('lower')}/>
        <Button title="GREATER" onPress={() => nextGuessHandler('greater')}/>
      </Card>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});