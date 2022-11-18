import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {paymentMethods} from '../../model/Paymentmethods';
import {Colors} from '../../globals/Globals';
import {useNavigation} from '@react-navigation/native';

const AddPaymentMethod = () => {
  const navigation = useNavigation();
  const navigateToPayment = method => {
    navigation.navigate(method);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Select Payment Method to Add</Text>
      <View style={styles.paymentMethodsView}>
        <FlatList
          contentContainerStyle={{
            paddingVertical: 10,
          }}
          data={paymentMethods}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.paymentCardView}
              onPress={() => navigateToPayment(item.name)}>
              <Image source={item.image} style={styles.paymentImage} />
              <Text style={styles.paymentName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default AddPaymentMethod;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  paymentImage: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
  paymentName: {
    paddingHorizontal: 10,
    fontWeight: '500',
    // color: Colors.text,
    fontSize: 16,
  },
  title: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: Colors.text,
  },
  paymentCardView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.line,
    borderBottomWidth: 0.5,
  },
  addPaymentButton: {
    backgroundColor: Colors.line,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  addPaymentText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
});
