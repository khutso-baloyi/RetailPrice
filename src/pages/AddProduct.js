import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import {FormInput} from '../components/FormInput';
import { useActiveStore } from '../contexts/StoreContext';
import { useToken } from '../contexts/TokenContext';
import axios from 'axios';
import { URL } from '../variables/constants';

const AddProduct = ({navigation, route}) => {
    const formMethods = useForm();
    const [token, setToken] = useToken();
    const [activeStore, setActiveStore] = useActiveStore();
    const {barcode} = route.params;

    const onSubmit = (form) => {

        const body = {
            product: {
                store_id: activeStore,
                barcode: barcode,
                name: form.name,
                description: form.description,
                price: form.price
            }
        }

        console.log("the body", body)
        axios.post(URL + '/products/addproduct', body,{ headers: {'Authorization': `Bearer ${token.accessToken}`}} )
        .then((response) => {
            console.log(response.data)
            navigation.navigate('Home')
        })
        .catch((error) => {console.error(error)})
    }

    const onErrors = (errors) => {
        console.warn(errors);
    }

    return(
        <View style={styles.root}>
             <View style={styles.form}>
                <FormProvider {...formMethods}>
                
                <FormInput 
                    name='name' 
                    label='Product Name' 
                    rules={{ required: 'the product name is required!' }}
                    />
                <FormInput 
                    name='description' 
                    label='Product Description'
                    multiline={true}
                    numberOfLines={4} 
                    />
                 <FormInput
                    
                    name='price' 
                    label='Product Price' 
                    rules={{ required: 'the product price is required!', pattern: {message: "the value must be a digit", value: /^[\d,]+(\.\d*)?$/} }} //another requirements is digits only
                    />
                </FormProvider>
                <Button 
                    title="Add Product"
                    onPress={formMethods.handleSubmit(onSubmit, onErrors)} />
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

})

export default AddProduct;