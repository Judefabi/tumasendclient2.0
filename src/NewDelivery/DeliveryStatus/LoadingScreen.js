import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import MapTracking from './MapTracking';
import Lottie from 'lottie-react-native';
import {Colors} from '../../../globals/Globals';
import {useNavigation} from '@react-navigation/native';

const LoadingScreen = ({route}) => {
  const {deliveryId} = route.params;
  const navigation = useNavigation();
  // console.log(deliveryId);
  const [assignedRider, setAssignedRider] = useState(null);
  const [waiting, setWaiting] = useState(true);
  console.log('Driver New', assignedRider);

  useEffect(() => {
    firestore()
      .collection('Deliveries')
      .doc(deliveryId)
      .collection('ridersAsssigned')
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(documentSnapshot => {
            setAssignedRider(documentSnapshot.data());
            // setWaiting(false);
            console.log(
              'User ID: ',
              documentSnapshot.id,
              documentSnapshot.data(),
            );
            navigateToTracking();
          });
        } else {
          console.log('Waiting assignment');
          // setWaiting(true);
        }
      });
  }, [assignedRider]);

  const navigateToTracking = () => {
    navigation.navigate('Rider en-route', {
      deliveryId,
    });
  };

  const cancelOrder = () => {
    console.log('Order Cancelled');
  };

  return (
    <View style={styles.mainContainer}>
      <Lottie
        style={styles.lottie}
        source={require('../../../animations/scanner.json')}
        autoPlay
        loop
      />
      <View
        style={[
          styles.buttonSection,
          {alignItems: 'center', flexDirection: 'row'},
        ]}>
        <TouchableOpacity onPress={cancelOrder}>
          <View style={styles.button}>
            <Text style={styles.completeText}>CANCEL ORDER</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colors.background,
  },
  button: {
    width: Dimensions.get('window').width * 0.95,
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  buttonSection: {
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    bottom: 80,
    position: 'absolute',
  },
});
