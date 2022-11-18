import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {Colors} from '../../../globals/Globals';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

const ScheduledDeliveryDetails = () => {
  const navigation = useNavigation();
  const locationScreen = () => {
    navigation.navigate('Location', {
      selectedCategory,
      selectedClass,
      selectedPackage,
      selectedAccessibility,
      date,
    });
  };
  //remember to reset states

  const [selectedPackage, setSelectedPackage] = useState('small');
  const [selectedAccessibility, setSelectedAccessibility] =
    useState('Accessible');
  const [selectedClass, setSelectedClass] = useState('Normal');
  const [selectedCategory, setSelectedCategory] = useState('Normal');

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  let dateN = date.toLocaleString;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}>
        <ScrollView
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          style={{height: '100%'}}>
          <View>
            <Text
              style={{fontSize: 16, color: Colors.text, paddingVertical: 10}}>
              Package Size
            </Text>
            <View
              style={{
                backgroundColor: Colors.background,
                borderWidth: 0.5,
                borderColor: Colors.line,
                borderRadius: 5,
              }}>
              <Picker
                selectedValue={selectedPackage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedPackage(itemValue)
                }>
                <Picker.Item label="Small" value="small" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Large" value="large" />
              </Picker>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '48%'}}>
              <Text
                style={{fontSize: 16, color: Colors.text, paddingVertical: 10}}>
                Accessibility
              </Text>
              <View
                style={{
                  backgroundColor: Colors.background,
                  borderWidth: 0.5,
                  borderColor: Colors.line,
                  borderRadius: 5,
                }}>
                <Picker
                  selectedValue={selectedAccessibility}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedAccessibility(itemValue)
                  }>
                  <Picker.Item label="Accessible" value="accessible" />
                  <Picker.Item
                    label="Hardly Accessible"
                    value="hardly accessible"
                  />
                </Picker>
              </View>
            </View>
            <View style={{width: '48%'}}>
              <Text
                style={{fontSize: 16, color: Colors.text, paddingVertical: 10}}>
                Package Class
              </Text>
              <View
                style={{
                  backgroundColor: Colors.background,
                  borderWidth: 0.5,
                  borderColor: Colors.line,
                  borderRadius: 5,
                }}>
                <Picker
                  selectedValue={selectedClass}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedClass(itemValue)
                  }>
                  <Picker.Item label="Normal" value="normal" />
                  <Picker.Item label="Fragile" value="fragile" />
                </Picker>
              </View>
            </View>
          </View>
          <View>
            <Text
              style={{fontSize: 16, color: Colors.text, paddingVertical: 10}}>
              Category
            </Text>
            <View
              style={{
                backgroundColor: Colors.background,
                borderWidth: 0.5,
                borderColor: Colors.line,
                borderRadius: 5,
              }}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCategory(itemValue)
                }>
                <Picker.Item label="Normal" value="normal" />
                <Picker.Item label="Confidential" value="confidential" />
              </Picker>
            </View>
          </View>
          <View style={{width: '100%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{fontSize: 16, color: Colors.text, paddingVertical: 10}}>
                Pickup Time
              </Text>
              <Text
                style={{fontSize: 14, color: Colors.line, paddingVertical: 10}}>
                (Click below to set pickup time)
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={{
                backgroundColor: Colors.background,
                borderWidth: 0.5,
                borderColor: Colors.line,
                borderRadius: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 14, color: Colors.text, padding: 15}}>
                {date.toTimeString()}
              </Text>
              <DatePicker
                minimumDate={new Date()}
                mode={'time'}
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                  // console.log(date);
                  // console.log(date.toLocaleString());
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <MaterialIcons
                name="schedule"
                size={30}
                color={Colors.text}
                style={{width: '20%'}}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{fontSize: 16, color: Colors.text, paddingVertical: 10}}>
              Delivery Notes
            </Text>
          </View>
          <TextInput
            multiline={true}
            numberOfLines={7}
            maxLength={300}
            style={{
              backgroundColor: Colors.background,
              borderWidth: 0.5,
              borderColor: Colors.line,
              borderRadius: 5,
              textAlignVertical: 'top',
              marginBottom: 80,
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={{bottom: 60, justifyContent: 'flex-end', padding: 15}}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={locationScreen}>
          <Text
            style={{
              color: Colors.background,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            CONTINUE
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ScheduledDeliveryDetails;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingHorizontal: 15,
    width: Dimensions.get('window').width,
    height: '100%',
  },
  continueButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
