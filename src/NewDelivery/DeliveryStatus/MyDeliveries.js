import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Colors} from '../../../globals/Globals';
import {ScrollView} from 'react-native-gesture-handler';
import {firebase} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const MyDeliveries = () => {
  const navigation = useNavigation();
  const userId = auth().currentUser.uid;
  const [deliveries, setDeliveries] = useState([]);

  console.log(deliveries);




  useEffect(() => {
    try {
      const subscriber = firebase
        .firestore()
        .collection('Deliveries')
        .where('userId', '==', userId)
        .onSnapshot(querySnapshot => {
          const deliveries = [];

          querySnapshot.forEach(documentSnapshot => {
            deliveries.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setDeliveries(deliveries);
        });

      return () => subscriber();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <SafeAreaView>
        <View style={styles.topView}>
          <Text style={styles.title}>Your Deliveries</Text>
        </View>
        {deliveries.map((delivery, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.deliveryCard}
              onPress={() =>
                navigation.navigate('Delivery Status', delivery.deliveryId)
              }>
              <View
                style={[
                  {
                    backgroundColor:
                      index === 1 ? Colors.mainColor : Colors.primary,
                  },
                  styles.tagView,
                ]}>
                <Text style={styles.tagText}>{delivery.deliverystatus}</Text>
              </View>
              <View style={styles.numbersView}>
                <Text style={styles.amount}>KShs. {delivery.amount}</Text>
                <View style={styles.timedistView}>
                  {/* <Text style={styles.distance}>11 km</Text>
                  <Text style={styles.time}>20 min</Text> */}
                </View>
              </View>
              <View style={styles.centerView}>
                <View style={styles.locationView}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 10,
                        backgroundColor: Colors.primary,
                        height: 10,
                        marginHorizontal: 20,
                      }}></View>
                    <View style={styles.pickup}>
                      <Text style={styles.pickupText}>
                        {delivery.originName}
                      </Text>
                      <Text>{delivery.destinationName}</Text>
                    </View>
                  </View>
                  <View style={styles.sideView}>
                    {[...Array(4).keys()].map(index => {
                      return <View key={index} style={styles.dots}></View>;
                    })}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 10,
                        backgroundColor: Colors.mainColor,
                        height: 10,
                        marginHorizontal: 20,
                      }}></View>
                    <View style={styles.dropoff}>
                      <Text style={styles.dropoffText}>
                        Webuye District Hospital
                      </Text>
                      <Text>Delivery Location</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{height: 100}}></View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MyDeliveries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.background,
    // padding: 20,
  },
  title: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 20,
    // padding: 20,
  },
  topView: {
    backgroundColor: Colors.background,
    width: Dimensions.get('window').width,
    padding: 20,
    marginBottom: 30,
  },
  deliveryCard: {
    backgroundColor: Colors.background,
    marginVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.line,
  },
  numbersView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  timedistView: {
    flexDirection: 'row',
  },
  distance: {
    paddingHorizontal: 5,
  },
  time: {
    paddingHorizontal: 5,
  },
  dots: {
    backgroundColor: Colors.line,
    width: 5,
    height: 5,
    marginVertical: 2,
  },
  sideView: {
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.1,
    paddingVertical: 0,
  },
  centerView: {
    flexDirection: 'row',
  },
  locationView: {
    paddingVertical: 0,
    width: Dimensions.get('window').width * 0.6,
  },
  pickupText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text,
  },
  dropoffText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text,
  },
  amount: {
    fontSize: 24,
    color: Colors.text,
    fontWeight: 'bold',
  },
  tagView: {
    width: Dimensions.get('window').width * 0.4,
    // backgroundColor: Colors.primary,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
  },
  tagText: {
    color: Colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
