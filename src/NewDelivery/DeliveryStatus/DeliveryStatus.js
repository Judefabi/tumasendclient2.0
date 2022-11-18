import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  CheckBox,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../../../globals/Globals';
import {useNavigation} from '@react-navigation/native';

const DELIVERY_STATUS = {
  START: 'START',
  TO_PICKUP: 'TO_PICKUP',
  TO_DROP_OFF: 'TO_DROP_OFF',
  IS_COMPLETED: 'IS_COMPLETED',
  AWAITING_PAYMENT: 'AWAITING_PAYMENT',
};

const DeliveryStatus = ({route}) => {
  const [deliveryStatus, setDeliveryStatus] = useState();
  const [data, setData] = useState();
  const deliveryId = route.params;
  // console.log('set state', deliveryId);
  const navigation = useNavigation();

  useEffect(() => {
    firestore()
      .collection('Deliveries')
      .doc(
        deliveryId,
        // '1a2b34e0-5d25-482d-94f1-5d8448e60548',
      )
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setDeliveryStatus(
            // 'AWAITING_PAYMENT',
            documentSnapshot.data().deliverystatus,
          );
          setData(documentSnapshot.data());
        } else {
          console.log('Status not found'); //display loader in future
        }
      });
  }, []);

  const disableButton = () => {
    if (deliveryStatus !== DELIVERY_STATUS.TO_DROP_OFF) {
      return true;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingVertical: 30}}>
        <Text style={styles.title}>Your Order ID</Text>
        <Text style={styles.orderId}>
          {deliveryId.slice(0, 8).toUpperCase()}
        </Text>
      </View>
      <View style={{paddingVertical: 10}}>
        <TouchableOpacity style={styles.detailCard}>
          {deliveryStatus === DELIVERY_STATUS.START ||
          deliveryStatus === DELIVERY_STATUS.TO_PICKUP ||
          deliveryStatus === DELIVERY_STATUS.TO_DROP_OFF ||
          deliveryStatus === DELIVERY_STATUS.IS_COMPLETED ||
          deliveryStatus === DELIVERY_STATUS.AWAITING_PAYMENT ? (
            <View>
              <FontAwesome
                name="check-square"
                size={30}
                color={Colors.primary}
              />
            </View>
          ) : (
            <View style={styles.unmarkedCheck}></View>
          )}
          <Text
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              color:
                deliveryStatus === DELIVERY_STATUS.START ||
                deliveryStatus === DELIVERY_STATUS.TO_PICKUP ||
                deliveryStatus === DELIVERY_STATUS.TO_DROP_OFF ||
                deliveryStatus === DELIVERY_STATUS.IS_COMPLETED ||
                deliveryStatus === DELIVERY_STATUS.AWAITING_PAYMENT
                  ? Colors.primary
                  : 'gray',
            }}>
            Rider en-route to Pickup Location
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailCard}>
          {deliveryStatus === DELIVERY_STATUS.TO_PICKUP ||
          deliveryStatus === DELIVERY_STATUS.TO_DROP_OFF ||
          deliveryStatus === DELIVERY_STATUS.IS_COMPLETED ||
          deliveryStatus === DELIVERY_STATUS.AWAITING_PAYMENT ? (
            <View>
              <FontAwesome
                name="check-square"
                size={30}
                color={Colors.primary}
              />
            </View>
          ) : (
            <View style={styles.unmarkedCheck}></View>
          )}

          <Text
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              color:
                deliveryStatus === DELIVERY_STATUS.TO_PICKUP ||
                deliveryStatus === DELIVERY_STATUS.TO_DROP_OFF ||
                deliveryStatus === DELIVERY_STATUS.IS_COMPLETED ||
                deliveryStatus === DELIVERY_STATUS.AWAITING_PAYMENT
                  ? Colors.primary
                  : 'gray',
            }}>
            Pickup Confirmed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailCard}>
          {deliveryStatus === DELIVERY_STATUS.TO_DROP_OFF ||
          deliveryStatus === DELIVERY_STATUS.IS_COMPLETED ||
          deliveryStatus === DELIVERY_STATUS.AWAITING_PAYMENT ? (
            <View>
              <FontAwesome
                name="check-square"
                size={30}
                color={Colors.primary}
              />
            </View>
          ) : (
            <View style={styles.unmarkedCheck}></View>
          )}
          <Text
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              color:
                deliveryStatus === DELIVERY_STATUS.TO_DROP_OFF ||
                deliveryStatus === DELIVERY_STATUS.IS_COMPLETED ||
                deliveryStatus === DELIVERY_STATUS.AWAITING_PAYMENT
                  ? Colors.primary
                  : 'gray',
            }}>
            Delivery Confirmed Awaiting Payment
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.detailCard}>
          {deliveryStatus === DELIVERY_STATUS.IS_COMPLETED ||
          deliveryStatus === DELIVERY_STATUS.AWAITING_PAYMENT ? (
            <View>
              <FontAwesome
                name="check-square"
                size={30}
                color={Colors.primary}
              />
            </View>
          ) : (
            <View style={styles.unmarkedCheck}></View>
          )}
          <Text
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              color:
                deliveryStatus === DELIVERY_STATUS.IS_COMPLETED ||
                deliveryStatus === DELIVERY_STATUS.AWAITING_PAYMENT
                  ? Colors.primary
                  : 'gray',
            }}>
            Rider has Arrived
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailCard}>
          {deliveryStatus === DELIVERY_STATUS.AWAITING_PAYMENT ? (
            <View>
              <FontAwesome
                name="check-square"
                size={30}
                color={Colors.primary}
              />
            </View>
          ) : (
            <View style={styles.unmarkedCheck}></View>
          )}
          <Text
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              color:
                deliveryStatus === DELIVERY_STATUS.AWAITING_PAYMENT
                  ? Colors.primary
                  : 'gray',
            }}>
            Awaiting Payment
          </Text>
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity
        // disabled={disableButton()}
        onPress={() => {
          navigation.navigate('Payment', {data});
        }}>
        <View
          style={[disableButton ? Colors.line : Colors.line, styles.button]}>
          <Text style={styles.completeText}>COMPLETE JOB</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DeliveryStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  detailCard: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: 0.5,
    borderBottomColor: Colors.line,
    shadowColor: Colors.line,
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 1,
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
  },
  orderId: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.text,
  },
  markedCheck: {
    width: 30,
    height: 30,
    borderWidth: 0.5,
    borderColor: Colors.line,
    borderRadius: 5,
  },
  unmarkedCheck: {
    width: 30,
    height: 30,
    borderWidth: 0.5,
    borderColor: Colors.line,
    borderRadius: 5,
  },
  button: {
    width: Dimensions.get('window').width * 0.9,
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  completeText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
});
