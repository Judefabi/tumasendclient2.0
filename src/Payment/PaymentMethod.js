import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../globals/Globals';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {paymentMethods} from '../../model/Paymentmethods';

const PaymentMethod = () => {
  const navigation = useNavigation();
  const closeModal = () => {
    navigation.goBack();
  };
  const [selectedMethod, setSelectedMethod] = useState({id: '1'});

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Payment Method</Text>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <FontAwesome name="close" size={25} style={styles.closeButtonIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyView}>
        {/* <View>
          <Text style={styles.titleDescription}>Select Payment Method</Text>
        </View> */}
        <View>
          {paymentMethods.map((method, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedMethod(method);
                }}
                style={
                  selectedMethod.id === method.id
                    ? styles.selectedMethod
                    : styles.unselectedMethod
                }
                key={index}>
                <View style={styles.imageTitle}>
                  <Image style={styles.typeImage} source={method.image} />
                  <View
                    style={{
                      paddingHorizontal: 10,
                    }}>
                    <Text style={styles.methodName}>{method.name}</Text>
                    <Text>{method.number}</Text>
                  </View>
                </View>
                {selectedMethod.id === method.id ? (
                  <FontAwesome
                    name="circle"
                    size={30}
                    style={
                      selectedMethod.id === method.id
                        ? styles.selectedIcon
                        : styles.unSelectedIcon
                    }
                  />
                ) : (
                  <FontAwesome
                    name="dot-circle-o"
                    size={30}
                    style={
                      selectedMethod.id === method.id
                        ? styles.selectedIcon
                        : styles.unSelectedIcon
                    }
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.background,
    flex: 1,
  },
  bodyView: {
    padding: 10,
  },
  titleView: {
    height: 70,
    elevation: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    textAlignVertical: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButtonIcon: {
    color: Colors.background,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 100,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
  },
  titleDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.mainColor,
  },
  selectedMethod: {
    flexDirection: 'row',
    paddingVertical: 20,
    backgroundColor: Colors.assent,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  unselectedMethod: {
    flexDirection: 'row',
    paddingVertical: 20,
    backgroundColor: Colors.background,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  methodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  typeImage: {
    height: 40,
    width: 70,
  },
  imageTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIcon: {
    color: Colors.mainColor,
  },
  unSelectedIcon: {
    color: Colors.assent,
  },
});
