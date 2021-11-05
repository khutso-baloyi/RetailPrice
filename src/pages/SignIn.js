import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios';

import {FormInput} from '../components/FormInput';
import logo from '../../assets/images/home.png';
import Home
 from './Home';
const LOGIN_FIELDS = {
    username: 'username',
    password: 'password',
  }
const URL = 'http://192.168.88.207:4000';
  
const SignIn = ({navigation}) => {

    const formMethods = useForm();

    const onSubmit = (form) => {

      axios
      .post(URL + '/auth/login', {
        username: 'admin', //HARD CODED
        password: 'admin'
      })
      .then(function (response) {
        // handle success
        alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        alert(error.message);
      });
        // navigation.navigate('Home')
      }
    
      const onErrors = (errors) => {
        console.warn(errors)
      }

    return(
        <View style={styles.background} >
            <Image source={logo} style={{width: 110, height: 110}} />
            <View style={styles.heading}>
                <Text style={styles.headingText}>Sign In</Text>
            </View>
            <View style={styles.form}>
                <FormProvider {...formMethods}>
                
                <FormInput 
                    name={LOGIN_FIELDS.username} 
                    label='Username' 
                    rules={{ required: 'Username is required!' }}
                    />
                <FormInput 
                    name={LOGIN_FIELDS.password} 
                    label='Password' 
                    rules={{
                        required: 'Password is required!',
                        minLength: {
                          message: 'Use at least 10 characters.',
                          value: 10,
                        },
                      }}
                      />
                </FormProvider>
                <Button 
                    title="Login"
                    onPress={formMethods.handleSubmit(onSubmit, onErrors)} />
            </View>
        </View>
    )
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
      form: {
          padding: 10
      },
      input:{
          backgroundColor: '#fff',
          borderRadius: 10,
          height: 42,
          width: 300,
          padding: 10,
          marginBottom: 20
      }
})

export default SignIn;