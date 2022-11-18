import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../globals/Globals';

const MpesaAccount = () => {
  const [amount, setAmount] = useState(0);
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
      <Text style={styles.title}>Phone Number</Text>
      <View style={styles.inputView}>
        <TextInput
          keyboardType="numeric"
          value={amount}
          placeholder="Enter Phone Number"
          style={styles.inputBox}
          onChangeText={amount => setAmount(amount)}
        />
      </View>
      <View style={[{bottom: keyboardOffset}, styles.button]}>
        <Text style={styles.buttonText}>CONFIRM NUMBER</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MpesaAccount;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },
  inputView: {
    marginVertical: 20,
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
    fontWeight: '500',
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
});
