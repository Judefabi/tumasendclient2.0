import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../globals/Globals';
import image from '../../assets/cardback.jpg';
import logo from '../../assets/logotuma.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Transactions} from '../../model/TransactionsData';

const WalletTransactions = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.transactionView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
          }}>
          <Text style={styles.transactionHeader}>Transactions</Text>
        </View>
        <FlatList
          data={Transactions}
          contentContainerStyle={{
            paddingTop: Dimensions.get('window').height * 0.02,
          }}
          renderItem={({item}) => (
            <View style={styles.transactionCard}>
              <View style={styles.dummyView}>
                <Text style={styles.initials}>
                  {item.recipient
                    .split(' ')
                    .map(function (word, index) {
                      return word.charAt(0).toUpperCase();
                    })
                    .join('')}
                </Text>
                <View
                  style={
                    item.type === 'payment'
                      ? styles.topupTransaction
                      : styles.paymentTransaction
                  }>
                  <Ionicons
                    name="swap-vertical"
                    size={10}
                    style={styles.buttonIcons}
                  />
                </View>
              </View>
              <View style={styles.midSection}>
                <Text style={styles.recipientName}>
                  {item.recipient
                    .split(' ')
                    .map(function (word, index) {
                      return (
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                      );
                    })
                    .join(' ')}
                </Text>
                <Text style={styles.transactionTime}>
                  {Date().toLocaleString().slice(3, 21)}
                </Text>
              </View>
              <View style={styles.endSection}>
                <Text style={styles.amount}>
                  {item.type === 'payment' ? '-' : '+'}KES
                  {item.amount}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default WalletTransactions;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  buttonIcons: {
    color: Colors.line,
  },
  buttonText: {
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  transactionHeader: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  transactionView: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  moreText: {
    fontSize: 14,
  },
  transactionCard: {
    width: Dimensions.get('window').width * 0.95,
    margin: 10,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.line,
    paddingVertical: 5,
  },
  dummyView: {
    height: Dimensions.get('window').width * 0.12,
    width: Dimensions.get('window').width * 0.12,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.text,
    borderWidth: 0.5,
    borderColor: Colors.line,
  },
  initials: {
    fontSize: 20,
    color: Colors.background,
    fontWeight: 'bold',
  },
  recipientName: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: 'bold',
    // paddingVertical: 5,
  },
  transactionTime: {
    fontSize: 12,
  },
  midSection: {
    paddingHorizontal: 10,
    width: Dimensions.get('window').width * 0.6,
  },
  endSection: {
    paddingHorizontal: 10,
    width: Dimensions.get('window').width * 0.25,
  },
  amount: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    color: Colors.text,
    fontWeight: 'bold',
  },
  paymentTransaction: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    bottom: -5,
    right: -5,
    borderRadius: 10,
    padding: 5,
  },
  topupTransaction: {
    position: 'absolute',
    backgroundColor: Colors.primarytwo,
    bottom: -5,
    right: -5,
    borderRadius: 10,
    padding: 5,
  },
});
