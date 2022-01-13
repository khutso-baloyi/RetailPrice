import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import {FormInput} from '../components/FormInput';
import { useActiveStore } from '../contexts/StoreContext';
import { useToken } from '../contexts/TokenContext';
import axios from 'axios';
import { Stores, URL } from '../variables/constants';


const UpdateProduct = ({navigation, route}) => {
    const formMethods = useForm();
    const [token, setToken] = useToken();
    const [activeStore, setActiveStore] = useActiveStore();
    const [existInStore, setExistInStore] = useState(true);
    const {barcode} = route.params;
    const [product, setProduct] = useState({
        store_id: 0,
        barcode: 0,
        name: 'default',
        description: '',
        price: 0.0,
        prev_price: 0.0
    })

    const onSubmit = (form) => {

        if(!existInStore) {
            const body = {
                product: {
                    store_id: activeStore,
                    barcode: barcode,
                    price: form.price
                }
            }

            axios.post(URL + '/products/addstoreproduct', body, { headers: {'Authorization': `Bearer ${token.accessToken}`}})
            .then((response) => {
                navigation.navigate('Home')
            })
            .catch((error) => console.log(error))

        } else {
            const body = {
                product: {
                    store_id: activeStore,
                    barcode: barcode,
                    price: form.price
                }
            }
    
            axios.patch(URL + '/products/updateprice', body,{ headers: {'Authorization': `Bearer ${token.accessToken}`}} )
            .then((response) => {
                console.log(response.data)
                navigation.navigate('Home')
            })
            .catch((error) => {console.error(error)})
        }
      
    }

    const onErrors = (errors) => {
        console.warn(errors);
    }

    useEffect(() => {

        axios.all([
            axios.get(URL + '/products/findproduct/' + barcode, {headers: {'Authorization': `Bearer ${token.accessToken}`}}),
            axios.get(URL + '/products/findstoreproduct?barcode=' +barcode+ '&storeId=' + activeStore, {headers: {'Authorization': `Bearer ${token.accessToken}`}})
        ])
        .then(axios.spread((...responses) => {
            if(!responses[1].data) {
                setExistInStore(false)
                setProduct({
                    barcode: barcode,
                    name: responses[0].data.name,
                    description: responses[0].data.description,
                })
            } else {
            setProduct({
                barcode: barcode,
                name: responses[0].data.name,
                description: responses[0].data.description,
                price: responses[1].data.price
            })
        }
        }))
        .catch((error) => console.log(error))

    }, [])


    return(
        <View style={styles.root}>
             {existInStore && <View style={styles.form}>

                <View>
                    <Text style={styles.text}>Name: {product.name}</Text>
                    <Text style={styles.text}>Description: {product.description}</Text>
                    <Text style={styles.text}>Price: R{product.price}</Text>
                </View>
                <FormProvider {...formMethods}>
                 <FormInput
                    
                    name='price' 
                    label='Update Price' 
                    rules={{ required: 'the product new price is required!', pattern: {message: "the value must be a digit", value: /^[\d,]+(\.\d*)?$/} }} //another requirements is digits only
                    />
                </FormProvider>
                <Button 
                    title="Update Price"
                    onPress={formMethods.handleSubmit(onSubmit, onErrors)} />
            </View>}
            {!existInStore && <View style={styles.form}>

                <View>
                    <Text style={{color: 'red', fontFamily: 'Nunito-Black', fontSize: 18, textAlign: 'center', padding: 10}}>
                        This Product does not exist at {Stores[activeStore].store_name} </Text>
                    <Text style={styles.text}>Name: {product.name}</Text>
                    <Text style={styles.text}>Description: {product.description}</Text>
                </View>
                <FormProvider {...formMethods}>
                <FormInput
                    
                    name='price' 
                    label='Add Price' 
                    rules={{ required: 'the product price is required!', pattern: {message: "the value must be a digit", value: /^[\d,]+(\.\d*)?$/} }} //another requirements is digits only
                    />
                </FormProvider>
                <Button 
                    title="Add Product"
                    onPress={formMethods.handleSubmit(onSubmit, onErrors)} />
                </View>}
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
    }

})

export default UpdateProduct;