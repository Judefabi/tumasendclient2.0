import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../globals/Globals';
import image from '../../assets/cardback.jpg';
import logo from '../../assets/logotuma.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Transactions} from '../../model/TransactionsData';
import {useNavigation} from '@react-navigation/native';
import {paymentMethods} from '../../model/Paymentmethods';

const WalletScreen = () => {
  const navigation = useNavigation();
  const [hasTumaWallet, setHasTumaWallet] = useState(false);

  return (
    <View style={styles.mainContainer}>
      {hasTumaWallet ? (
        <TouchableOpacity
          style={styles.tumaCard}
          onPress={() => {
            navigation.navigate('Wallet Transactions');
          }}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}
            imageStyle={{borderRadius: 10}}>
            <Text style={styles.walletName}>Tuma Wallet</Text>
            <Text style={styles.walletBalance}>KES 200.50</Text>
            <View style={styles.bottomSection}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.textLogo}>JUDE FABIANO</Text>
                <View
                  style={{
                    backgroundColor: '#3C4048',
                    paddingHorizontal: 15,
                    borderRadius: 50,
                  }}>
                  <Text style={styles.cardNumber}>**** 3452</Text>
                </View>
              </View>
              <Text style={styles.expiry}>3/29</Text>
            </View>
            <TouchableOpacity
              style={styles.fundWalletView}
              onPress={() => {
                navigation.navigate('Fund Wallet');
              }}>
              <Text style={styles.fundWalletText}>Fund Wallet</Text>
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity
            style={styles.tumaCard}
            onPress={() => {
              hasTumaWallet ? navigation.navigate('Wallet Transactions') : null;
            }}>
            <ImageBackground
              source={image}
              resizeMode="cover"
              style={styles.image}
              imageStyle={{borderRadius: 10}}>
              {/* <Text style={styles.walletName}>Tuma Wallet</Text> */}
              <Text style={styles.walletBalance}>
                <Text style={{fontSize: 16}}>KES</Text> 0.00
              </Text>
              {hasTumaWallet ? (
                <View style={styles.bottomSection}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textLogo}>JUDE FABIANO</Text>
                    <View
                      style={{
                        backgroundColor: '#3C4048',
                        paddingHorizontal: 15,
                        borderRadius: 50,
                      }}>
                      <Text style={styles.cardNumber}>**** 3452</Text>
                    </View>
                  </View>
                  <Text style={styles.expiry}>3/29</Text>
                </View>
              ) : (
                <View style={styles.bottomSection}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textLogo}>NOT REGISTERED</Text>
                    <View
                      style={{
                        backgroundColor: '#3C4048',
                        paddingHorizontal: 15,
                        borderRadius: 50,
                      }}>
                      <Text style={styles.cardNumber}>
                        Activate to use wallet
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              {hasTumaWallet ? (
                <TouchableOpacity
                  style={styles.fundWalletView}
                  onPress={() => {
                    navigation.navigate('Fund Wallet');
                  }}>
                  <Text style={styles.fundWalletText}>Fund Wallet</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.fundWalletView}
                  onPress={() => {
                    navigation.navigate('Activate Wallet');
                  }}>
                  <Text style={styles.fundWalletText}>Activate Wallet</Text>
                </TouchableOpacity>
              )}
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.paymentMethodsView}>
        <Text style={styles.title}>Payment Methods</Text>
        <FlatList
          contentContainerStyle={{
            paddingVertical: 10,
          }}
          data={paymentMethods}
          renderItem={({item}) => (
            <View style={styles.paymentCardView}>
              <Image source={item.image} style={styles.paymentImage} />
              <Text style={styles.paymentName}>{item.name}</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.addPaymentButton}
          onPress={() => {
            navigation.navigate('Add Payment');
          }}>
          <Ionicons size={25} name="add-outline" />
          <Text style={styles.addPaymentText}>Add Payment Method</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.vouchersView}>
        <Text style={styles.title}>Vouchers</Text>
        <TouchableOpacity style={styles.voucherButtons}>
          <Ionicons size={25} name="add-outline" />
          <Text style={styles.voucherButtonText}>Add Voucher code</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.voucherButtons}>
          <Ionicons size={25} name="barcode-outline" />
          <Text style={styles.voucherButtonText}>Win Vouchers</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    // padding: 5,
  },
  image: {
    padding: 10,
    borderRadius: 10,
    height: Dimensions.get('window').height * 0.25,
  },
  tumaCard: {
    padding: 10,
    borderRadius: 10,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'baseline',
  },
  walletName: {
    color: '#3C4048',
    fontWeight: 'bold',
  },
  walletBalance: {
    color: Colors.background,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    paddingHorizontal: 0,
  },
  textLogo: {
    color: Colors.background,
    paddingVertical: 5,
    fontWeight: 'bold',
    fontSize: 10,
  },
  cardNumber: {
    color: Colors.background,
    fontSize: 10,
  },
  expiry: {
    color: Colors.line,
    fontSize: 10,
  },
  logo: {
    height: 20,
    width: 100,
  },
  shortCuts: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
  fundWalletText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  fundWalletView: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: Colors.line,
    borderRadius: 20,
  },
  paymentMethodsView: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontWeight: 'bold',
    color: Colors.text,
    fontSize: 16,
  },
  paymentImage: {
    height: 60,
    width: 50,
    resizeMode: 'contain',
  },
  paymentName: {
    paddingHorizontal: 10,
    fontWeight: '500',
    color: Colors.text,
  },
  paymentCardView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vouchersView: {
    paddingHorizontal: 10,
  },
  addPaymentButton: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  addPaymentText: {
    color: Colors.text,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  voucherButtons: {
    paddingVertical: 15,
    flexDirection: 'row',
  },
  voucherButtonText: {
    fontWeight: '500',
    color: Colors.text,
    paddingHorizontal: 10,
  },
});

// 3C4048
