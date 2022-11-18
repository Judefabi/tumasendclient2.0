import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../globals/Globals';

const FundWallet = () => {
  const [amount, setAmount] = useState(0);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Add Money to your Tuma Wallet</Text>
      <View style={styles.inputView}>
        <TextInput
          keyboardType="numeric"
          value={amount}
          placeholder="Enter Amount"
          style={styles.inputBox}
          onChangeText={amount => setAmount(amount)}
        />
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText}>CONFIRM</Text>
      </View>
    </View>
  );
};

export default FundWallet;

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
    // fontWeight: 'bold',
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
    bottom: 70,
    marginHorizontal: 10,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
