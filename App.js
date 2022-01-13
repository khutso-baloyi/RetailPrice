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
import { TokenProvider } from './src/contexts/TokenContext';
import { StoreProvider } from './src/contexts/StoreContext';
import StoreProducts from './src/components/StoreProducts';
import AddProduct from './src/pages/AddProduct';
import UpdateProduct from './src/pages/UpdateProduct';
import { Profile } from './src/pages/Profile';

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
    <TokenProvider>
    <StoreProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} options={{title: 'Welcome'}} />
        <Stack.Screen name="SignIn" component={SignIn} options={{title: 'Sign In'}} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{title: 'Create Account'}} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Barcode" component={Barcode} options={{title: 'Scan a Product'}} />
        <Stack.Screen name="Products" component={StoreProducts} options={{title: 'Store Products'}} />
        <Stack.Screen name="AddProduct" component={AddProduct} options={{title: 'Add a Product'}} />
        <Stack.Screen name="UpdateProduct" component={UpdateProduct} options={{title: 'Update Product Price'}} />
        <Stack.Screen name="Profile" component={Profile} options={{title: 'User Profile'}} />
      </Stack.Navigator>
    </NavigationContainer>
    </StoreProvider>
    </TokenProvider>
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
    color: 'black',
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
