import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import profile from '../../../assets/profileone.jpg';
import {Colors} from '../../../globals/Globals';

const MapTracking = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 0.6137634503067554,
          longitude: 34.764733075448156,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
      <View style={styles.bottomProfileComponent}>
        <View style={styles.profileSection}>
          <View style={{width: Dimensions.get('window').width * 0.15}}>
            <Image source={profile} style={styles.profileImage} />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: Dimensions.get('window').width * 0.75,
            }}>
            <View style={styles.nameSection}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.carDetails}>Car: KVW 309Q</Text>
            </View>
            <View style={styles.amountSection}>
              <Text style={styles.amountTitle}>Amount to be Paid</Text>
              <Text style={styles.amount}>Kshs. 750</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>DELIVERY STATUS</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bottomProfileComponent: {
    position: 'absolute',
    bottom: 70,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width * 0.95,
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    justifyContent: 'space-between',
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  profileSection: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  carDetails: {
    fontSize: 14,
    fontWeight: '300',
  },
  nameSection: {
    paddingHorizontal: 10,
  },

  amount: {
    fontWeight: '800',
  },
  button: {
    width: Dimensions.get('window').width * 0.9,
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },

  line: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.line,
    marginVertical: 15,
  },
});
