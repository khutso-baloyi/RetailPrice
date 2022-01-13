import React, {useState} from 'react';
import { Image, View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { useToken } from '../contexts/TokenContext';
import axios from 'axios';
import { URL } from '../variables/constants';
import {FormInput} from '../components/FormInput';
import logo from '../../assets/images/home.png';
import Home from './Home';

const LOGIN_FIELDS = {
    username: 'username',
    password: 'password',
  }

const SignIn = ({navigation}) => {

    const [token, setToken] = useToken();
    const [wrongCredentials, setWrongCredentials] = useState(false)

    const formMethods = useForm();

    const onSubmit = (form) => {

      console.log(form)

      axios
      .post(URL + '/auth/login', {
        username: form.username, //HARD CODED
        password: form.password
      })
      .then(function (response) {
        // handle success
        setToken(response.data);
        navigation.replace('Home');
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setWrongCredentials(true)
      });
        // navigation.navigate('Home')
      }
    
      const onErrors = (errors) => {
        console.log(errors)
      }

    return(
        <View style={styles.background} >
            <Image source={logo} style={{width: 110, height: 110}} />
            <View style={styles.heading}>
                <Text style={styles.headingText}>Sign In</Text>
            </View>
            {wrongCredentials && <Text style={styles.wrongCredentials}>Your password and or username is incorrect</Text>}
            <View style={styles.form}>
                <FormProvider {...formMethods}>
                
                <FormInput 
                    name={LOGIN_FIELDS.username} 
                    label='Username' 
                    rules={{ required: 'Username is very required!' }}
                    />
                <FormInput 
                    name={LOGIN_FIELDS.password} 
                    secureTextEntry={true}
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
        color: 'grey',
        fontSize: 20,
        fontFamily: 'Helvetica-Bold'
      },
      wrongCredentials: {
        color: 'red',
        fontSize: 14,
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