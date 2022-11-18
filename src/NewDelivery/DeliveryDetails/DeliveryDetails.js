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

const DeliveryDetails = ({route}) => {
  const navigation = useNavigation();

  const routeDescription = () => {
    navigation.navigate('Optional Details', {
      selectedCategory,
      selectedPackage,
      selectedWeightClass,
      date,
      comments,
    });
  };
  //remember to reset states

  const [selectedPackage, setSelectedPackage] = useState();
  const [comments, setComments] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedWeightClass, setSelectedWeightClass] = useState();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

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
            <Text style={styles.dropTitle}>Package Size</Text>
            <View style={styles.dropdown}>
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
              <Text style={styles.dropTitle}>Category</Text>
              <View style={styles.dropdown}>
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
            <View style={{width: '48%'}}>
              <Text style={styles.dropTitle}>Weight Class</Text>
              <View style={styles.dropdown}>
                <Picker
                  selectedValue={selectedWeightClass}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedWeightClass(itemValue)
                  }>
                  <Picker.Item label="0 - 50 Kgs" value="normal" />
                  <Picker.Item label="50 - 200 kgs" value="confidential" />
                  <Picker.Item label="200 kgs and above" value="confidential" />
                </Picker>
              </View>
            </View>
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.dropTitle}>Pickup Time</Text>
            <View
              // onPress={() => setOpen(true)}
              style={[
                styles.dropdown,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <Text style={{fontSize: 14, color: Colors.text, padding: 15}}>
                {date.toTimeString()}
              </Text>
              {/* <DatePicker
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
            /> */}
              <MaterialIcons
                name="schedule"
                size={30}
                color={Colors.text}
                style={{width: '20%'}}
              />
            </View>
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.dropTitle}>Package Description</Text>
          </View>
          <TextInput
            multiline={true}
            numberOfLines={7}
            maxLength={300}
            value={comments}
            onChangeText={comments => setComments(comments)}
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
          onPress={routeDescription}>
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

export default DeliveryDetails;

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
});
