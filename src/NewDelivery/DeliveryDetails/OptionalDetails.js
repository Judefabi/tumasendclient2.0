import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../globals/Globals';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';

const OptionalDetails = ({route}) => {
  const navigation = useNavigation();
  // console.log(route.params);
  const {
    selectedCategory,
    selectedPackage,
    date,
    comments,
    selectedWeightClass,
  } = route.params;
  const locationInput = () => {
    navigation.navigate('Location', {
      selectedCategory,
      selectedPackage,
      date,
      comments,
      selectedAccessibility,
      selectedAvailability,
      selectedWeightClass,
    });
  };
  //remember to reset states
  const [selectedAccessibility, setSelectedAccessibility] = useState();
  const [selectedAvailability, setSelectedAvailability] = useState();
  const [distanceClass, setDistanceClass] = useState();

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* //use this screen to recommend pickup agents or scheduling if answers are NO to the questions */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '100%'}}>
          <Text style={styles.dropTitle}>Distance Class</Text>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={selectedAccessibility}
              onValueChange={(itemValue, itemIndex) =>
                setDistanceClass(itemValue)
              }>
              <Picker.Item label="Short <30km" value="short" />
              <Picker.Item label="Long >30km" value="long" />
            </Picker>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '100%'}}>
          <Text style={styles.dropTitle}>
            Is your location easily accessible?
          </Text>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={selectedAccessibility}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedAccessibility(itemValue)
              }>
              <Picker.Item label="Yes" value="accessible" />
              <Picker.Item label="No" value="hardly accessible" />
            </Picker>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '100%'}}>
          <Text style={styles.dropTitle}>
            Are you available to receive the package?
          </Text>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={selectedAvailability}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedAvailability(itemValue)
              }>
              <Picker.Item label="Yes" value="accessible" />
              <Picker.Item label="No" value="hardly accessible" />
            </Picker>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={locationInput}>
        <Text
          style={{
            color: Colors.background,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          CONTINUE
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OptionalDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingHorizontal: 15,
    width: Dimensions.get('window').width,
  },
  dropdown: {
    backgroundColor: Colors.background,
    borderWidth: 0.5,
    borderColor: Colors.line,
    borderRadius: 5,
  },
  dropTitle: {
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 15,
    fontWeight: '500',
  },
  continueButton: {
    width: Dimensions.get('window').width * 0.95,
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 80,
  },
});
