/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/pages/SignIn';
import CreateAccount from './src/pages/CreateAccount';
import Home from './src/pages/Home';
import Barcode from './src/components/Barcode';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Pressable
} from 'react-native';

import HomeImg from './assets/images/home.png';
import { NOT_INITIALIZED_ERROR } from '@react-navigation/core/lib/typescript/src/createNavigationContainerRef';

const Landing = ({navigation}) => {

  return (
    <SafeAreaView style={styles.background}>
  <View>
    <Image 
      style={styles.imgContainer}
      source={HomeImg}></Image>
  </View>

  <View>
  <Text style={styles.welcomeMsg} >
    Retail Prices
  </Text>
  <Text style={styles.subMsg}>
    making shopping easier
  </Text>

  <View
  style={styles.signInButton}
  >
  <Pressable 
    style={styles.button}
    onPress={() => navigation.navigate('SignIn')}>
      <Text
      style={{fontSize: 18, color: '#FF9494'}}>Sign In</Text>
      </Pressable>
      <Pressable 
        style={styles.button}
        onPress={() => navigation.navigate('CreateAccount')}>
          <Text
          style={{fontSize: 18, color: '#FF9494'}}>Create Account</Text>
      </Pressable>
  </View>
  </View>
</SafeAreaView>
  );
  
}



const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Landing" component={Landing} options={{title: 'Welcome'}} />
        <Stack.Screen name="SignIn" component={SignIn} options={{title: 'Sign In'}} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{title: 'Create Account'}} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Barcode" component={Barcode} options={{title: 'Scan a product'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#94ffff',
    flex: 1
  },
  welcomeMsg: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    fontSize: 40,
    
  },
  subMsg: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Nunito-Italic'
  },
  imgContainer: {
    width: 300,
    height: 300,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 90
  },
  signInButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  },
  button: {
    padding: 10
  }
 
});

export default App;
