import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import logo from '../assets/images/home.png';

const SignIn = ({navigation}) => {

    return(
        <View style={styles.background}>
            <Image source={logo} style={{width: 110, height: 110}} />
            <View style={styles.heading}>
                <Text style={styles.headingText}>Sign In</Text>
            </View>
            <View style={styles.form}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#94ffff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      heading: {
          
      },
      headingText: {
        fontSize: 20,
        fontFamily: 'Helvetica-Bold'
      },
      form: {}
})

export default SignIn;