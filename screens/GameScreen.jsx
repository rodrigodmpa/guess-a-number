import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import DefaultStyles from '../constants/default-styles';
import { Ionicons } from '@expo/vector-icons';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let rndNum = Math.floor(Math.random() * (max - min)) + min;
  while (rndNum === exclude) {
    rndNum = Math.floor(Math.random() * (max - min)) + min;
  } 
  return rndNum;
  
}


const renderListItem = (guess, idx) => (
  <View key={guess} style={styles.listItem}>
    <Text style={DefaultStyles.bodyText}>Guess #{idx}</Text>
    <Text style={DefaultStyles.bodyText}>{guess}</Text>
  </View>
)
const GameScreen = ({userChoice, onGameOver}) => {
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const initialGuess = generateRandomBetween(
    1, 100, userChoice
  )
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  
  const [guesses, setGuesses] = useState([initialGuess]);


  useEffect(() => {
    if(currentGuess === userChoice) {
      onGameOver(guesses.length);
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
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setGuesses([nextNumber, ...guesses])
  }
  
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title} >Opponent's guess:</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <MainButton onPress={() => nextGuessHandler('lower')}>
          Lower <Ionicons name="md-remove" size={24} color='white'/>
        </MainButton>
        <MainButton onPress={() => nextGuessHandler('greater')}>
          Greater <Ionicons name="md-add" size={24} color='white'/>
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list} >
          {guesses.map((guess, idx) => renderListItem(guess, guesses.length - idx))}
        </ScrollView>
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%'
  },
  listItem: {
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    borderRadius: 10
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});