import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import AppLoading from 'expo-app-loading';


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => setDataLoaded(true)}
          onError={(err) => console.log(err)}
        />
    )
  }

  const configureNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  } else if (guessRounds > 0) {
    content = <GameOverScreen rounds={guessRounds} correctNumber={userNumber} onPlayAgain={configureNewGameHandler}/>
  }
  return (
      <View >
        <Header title="Guess a number"/>
        {content}
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
