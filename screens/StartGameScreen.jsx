import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

const StartGameScreen = ({onStartGame}) => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g,''));
  }

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);

    if(isNaN(chosenNumber)|| chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!', 
        'Number has to be a number between 1 and 99.',
          [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
      )
    }

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  }

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
    <Card style={styles.summaryContainer}>
      <Text>You selected:</Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <MainButton  onPress={() => onStartGame(selectedNumber)}>START GAME</MainButton>
    </Card>);
  }
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
    <View style={styles.screen}>
      <Text style={styles.screenTitle}>Start a new game</Text>
      <Card style={styles.inputContainer}>
        <Text style={styles.screenSubtitle}>Select a number</Text>
        <Input 
          style={styles.input} 
          placeholder=""
          blurOnSubmit
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='number-pad'
          maxLength={2}
          onChangeText={numberInputHandler}
          value={enteredValue}
        />
        <View style={styles.btnContainer}>
          <View style={styles.button}>
            <Button 
              onPress={resetInputHandler} 
              color={Colors.secondary} 
              title="Reset"
            />
          </View>
          <View style={styles.button}>
            <Button 
              onPress={confirmInputHandler}
              color={Colors.primary} 
              title="Confirm"
            />
          </View>
        </View>

      </Card>
      {confirmedOutput}
    </View>
    </TouchableWithoutFeedback>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  input: {
    width: 50,
  }, 
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  screenTitle: {
    marginVertical: 10,
    fontSize: 20,
    fontFamily: 'open-sans-bold'
  },  
  screenSubtitle:{
    fontFamily: 'open-sans'
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 100,
    paddingVertical: 10
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
})