import React, {useRef, useState} from 'react';
import { Image, View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { useToken } from '../contexts/TokenContext';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import {FormInput} from '../components/FormInput';
import logo from '../../assets/images/home.png';
import Home from './Home';
import { useStore, useActiveStore } from '../contexts/StoreContext';
import { Stores, URL } from '../variables/constants';
import _ from 'lodash';
import * as Yup from 'yup';

const LOGIN_FIELDS = {
    username: 'username',
    password: 'password',
  }

const CreateAccount = ({navigation}) => {

    const [token, setToken] = useToken();
    const [activeStore, setActiveStore] = useActiveStore();
    const [usernameExist, setUsernameExist] = useState(false);
    const formMethods = useForm();
    const password = useRef({})
    password.current = formMethods.watch("password", '')

    const handlePass = (value) => {
        console.log("val", value)
    }

    const onSubmit = (form) => {

      console.log(form)

      axios
      .post(URL + '/users/user', {
        store_id: activeStore || '1',
        username: form.username, 
        password: form.password
      })
      .then(function (response) {
        // handle success
        setToken(response.data);
        console.log(response.data)
        if(response.data.error == "user already exists") {
          setUsernameExist(true);
        } else {
        navigation.navigate('Home');
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        alert(error.message);
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
                <Text style={styles.headingText}>Create an Account</Text>
            </View>
            {usernameExist && <Text style={styles.wrongCredentials}>Username Already Exists!</Text>}
            <View style={styles.form}>

            <View style={styles.dropdownMain}>
            <Picker
                selectedValue={activeStore}
                style={styles.dropdown}
                onValueChange={(itemValue, itemIndex) => setActiveStore(itemValue)}
            >
                {_.map(Stores, (store, storeIndex) => <Picker.Item label={store.store_name} value={storeIndex} key={storeIndex}/> )}
                {/* <Picker.Item label={Stores[store[0].store_id].store_name} value="java" />
                <Picker.Item label={Stores[store[0].store_id].store_name} value="js" /> */}
            </Picker>
            </View>

                <FormProvider {...formMethods}>
                
                <FormInput 
                    name={LOGIN_FIELDS.username} 
                    label='Username' 
                    rules={{ required: 'Username is required!' }}
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
                <FormInput 
                    name='confirmPassword' 
                    secureTextEntry={true}
                    label='Confirm Password'
                    rules={{
                        validate: value => value === password.current || 'password must match'
                      }}
                      />
                </FormProvider>
                <Button 
                    title="Create"
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
      },
      dropdownMain: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 5
      },
      dropdown: {
        height: 10,
        width: 200,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        paddingTop: 15
      },
      wrongCredentials: {
        color: 'red',
        fontSize: 14,
        fontFamily: 'Helvetica-Bold'
      }
})

export default CreateAccount;