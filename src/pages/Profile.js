import { Image, View, Text, StyleSheet, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react'
import user from '../../assets/images/user.jpg';

export const Profile = (props) => {
 

  return (
    <View style={styles.root}>
         <Image source={user} style={{width: 110, height: 110}} />
            <View style={styles.heading}>
                <Text style={styles.headingText}>Sign In</Text>
            </View>
    </View>
  );
}


const styles = StyleSheet.create({
    root: { 
        backgroundColor: '#94ffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center' 
    },
    form: {
        padding: 10
    },
    text: {
        color: 'black',
        fontFamily: 'Nunito-Black'
    },
    heading: {
    },
    headingText: {
      color: 'grey',
      fontSize: 20,
      fontFamily: 'Helvetica-Bold'
    },

})



