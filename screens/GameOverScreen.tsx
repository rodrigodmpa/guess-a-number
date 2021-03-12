import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

// import { Container } from './styles';
import DefaultStyles from '../constants/default-styles';

const GameOverScreen = ({rounds, correctNumber, onPlayAgain}) => {
  const [availableScreenWidth, setAvailableScreenWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableScreenHeight, setAvailableScreenHeight] = useState(
    Dimensions.get('window').height
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableScreenWidth(Dimensions.get('window').width);
      setAvailableScreenHeight( Dimensions.get('window').height);
    }

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })
  return (
    <ScrollView contentContainerStyle={styles.screen}>
        <Text style={DefaultStyles.title}>The game is over!</Text>
        {availableScreenHeight > 500 && (
          <Image 
            resizeMode='cover' 
            style={styles.image} 
            source={require('../assets/success.png')} 
          />
        )}
        <View style={styles.resultContainer}>
          <Text style={{...DefaultStyles.bodyText, ...styles.textResult}}>
              Your phone needed <Text style={styles.highlight}>{rounds}</Text> rounds
              to guess the number <Text style={styles.highlight}>{correctNumber}</Text>.
          </Text>
        </View>
        <MainButton onPress={onPlayAgain}>PLAY AGAIN</MainButton >
    </ScrollView>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    marginTop: Dimensions.get('window').height / 30,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultContainer: {
    margin: Dimensions.get('window').height / 30,
  },
  textResult: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
  }
})