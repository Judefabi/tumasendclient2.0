import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../globals/Globals';

const MasterCard = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [keyboardOffset, setKeyboardOffset] = useState(80);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
      setKeyboardOffset(10);
    });
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
      setKeyboardOffset(80);
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      {/* <Text style={styles.title}>Input your Card Details</Text> */}
      <View style={styles.inputsView}>
        <View style={styles.fullView}>
          <Text style={styles.heading}>Card Number</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Card Number"
            />
          </View>
        </View>
        <View style={styles.topView}>
          <View style={styles.halfView}>
            <Text style={styles.heading}>Expiry Date</Text>
            <View style={styles.inputView}>
              <TextInput style={styles.inputBox} placeholder="MM/YY" />
            </View>
          </View>
          <View style={styles.halfView}>
            <Text style={styles.heading}>CVV</Text>
            <View style={styles.inputView}>
              <TextInput style={styles.inputBox} placeholder="123" />
            </View>
          </View>
        </View>
        <View style={styles.fullView}>
          <Text style={styles.heading}>Name</Text>
          <View style={styles.inputView}>
            <TextInput style={styles.inputBox} placeholder="John Doe" />
          </View>
        </View>
      </View>
      <TouchableOpacity style={[{bottom: keyboardOffset}, styles.button]}>
        <Text style={styles.buttonText}>CONFIRM CARD</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default MasterCard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },
  inputView: {
    marginVertical: 15,
    borderWidth: 0.5,
    borderColor: Colors.line,
    borderRadius: 10,
    paddingVertical: 5,
  },
  inputBox: {
    fontSize: 16,
  },
  title: {
    fontSize: 14,
    color: Colors.text,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    // bottom: 70,
    marginHorizontal: 10,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  halfView: {
    width: '48%',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputsView: {
    paddingVertical: 20,
  },
  heading: {
    color: Colors.text,
    fontWeight: '500',
  },
});
