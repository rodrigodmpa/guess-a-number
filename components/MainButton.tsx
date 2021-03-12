import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TouchableNativeFeedback, 
  Platform,
} from 'react-native';

// import { Container } from './styles';
import Colors from '../constants/colors'
const MainButton = ({children, onPress}) => {

  const TouchableComponent = (props: any) => {
    return (Platform.OS === 'android' && Platform.Version >= 21) ? 
      <TouchableNativeFeedback onPress={props.onPress}>{props.children}</TouchableNativeFeedback> : 
      <TouchableOpacity activeOpacity={0.6}  onPress={props.onPress}>{props.children}</TouchableOpacity>;
  }
  return (
    <View style={styles.btnContainer}>
      <TouchableComponent onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {children}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
}

export default MainButton;

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18
  }
})