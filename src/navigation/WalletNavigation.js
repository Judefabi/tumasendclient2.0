import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from '../../globals/Globals';
import WalletScreen from '../Wallet/WalletScreen';
import WalletTransactions from '../Wallet/WalletTransactions';
import FundWallet from '../Wallet/FundWallet';
import AddPaymentMethod from '../Wallet/AddPaymentMethod';
import MpesaAccount from '../Wallet/MpesaAccount';
import VisaAccount from '../Wallet/VisaAccount';
import Mastercard from '../Wallet/Mastercard';
import ActivateWallet from '../Wallet/ActivateWallet';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
        },
        headerTintColor: Colors.text,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
      }}>
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="Wallet Transactions" component={WalletTransactions} />
      <Stack.Screen name="Fund Wallet" component={FundWallet} />
      <Stack.Screen name="Activate Wallet" component={ActivateWallet} />
      <Stack.Screen name="Add Payment" component={AddPaymentMethod} />
      <Stack.Screen name="Mpesa" component={MpesaAccount} />
      <Stack.Screen name="Visa" component={VisaAccount} />
      <Stack.Screen name="MasterCard" component={Mastercard} />
    </Stack.Navigator>
  );
}
