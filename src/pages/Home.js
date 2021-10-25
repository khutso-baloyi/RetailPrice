import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


const Home = ({navigation}) => {
  

  return (
    <View style={styles.root}>
     
    </View>
  );
};


const styles = StyleSheet.create({
  root: {
    backgroundColor: '#94ffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
   rnCamera: {
    flex: 1,
    width: '94%',
    alignSelf: 'center',
  },
  btn: {
    width: 240,
    borderRadius: 4,
    backgroundColor: '#62d1bc',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginVertical: 8,
  },
  btnText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default Home;
