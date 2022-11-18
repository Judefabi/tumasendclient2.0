import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import {FontAwesome5} from 'react-native-vector-icons/FontAwesome5';
import {MotiView} from 'moti';
import {Easing} from 'react-native-reanimated';

const WavyComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
      }}>
      <View style={[styles.centerComponent, styles.center]}>
        {[...Array(3).keys()].map(index => {
          return (
            <MotiView
              from={{opacity: 1, scale: 1}}
              animate={{opacity: 0, scale: 4}}
              transition={{
                type: 'timing',
                duration: 2000,
                easing: Easing.out(Easing.ease),
                delay: index * 400,
                loop: true,
              }}
              key={index}
              style={[StyleSheet.absoluteFillObject, styles.centerComponent]}
            />
          );
        })}
        {/* <FontAwesome5 name="search" size={40} color="white"></FontAwesome5> */}
      </View>
    </View>
  );
};

export default WavyComponent;

const styles = StyleSheet.create({
  centerComponent: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'black',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
