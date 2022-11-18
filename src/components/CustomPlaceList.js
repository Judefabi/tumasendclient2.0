import {View, Text} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
// import {Icon} from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {Colors} from '../../globals/Globals';

const CustomPlaceList = ({data}) => {
  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        <Ionicons name="location" size={30} color={Colors.mainColor} />
      </View>
      <Text style={styles.locationText}>{data.description || data.name}</Text>
    </View>
  );
};

export default CustomPlaceList;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backGroundColor: 'white',
  },
  iconContainer: {
    backGroundColor: 'blue',
    padding: 5,
    borderRadius: 10,
    marginRight: 5,
  },
  locationText: {},
});
