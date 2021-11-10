import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import {FormInput} from '../components/FormInput';

const AddProduct = ({navigation, route}) => {
    const formMethods = useForm();

    const {barcode} = route.params;

    const onSubmit = (form) => {
        console.log(form)
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
                    multiline
                    numberOfLines={4} 
                    />
                 <FormInput 
                    name='price' 
                    label='Product Price' 
                    rules={{ required: 'the product price is required!' }} //another requirements is digits only
                    />
                </FormProvider>
                <Button 
                    title="Login"
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