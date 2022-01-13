import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Button, View, ScrollView, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useActiveStore } from '../contexts/StoreContext';
import { useToken } from '../contexts/TokenContext';
import _ from 'lodash';
import { URL } from '../variables/constants';

const StoreProducts = () => {

    const [activeStore, setActiveStore] = useActiveStore();
    const [token, setToken] = useToken();
    const [products, setProducts] = useState([]);
    const [productDisplay, setProductDisplay] = useState([])
    const tableHead = ['Name', 'Description', 'Price', 'Previous Price'];

    const getProducts = (store_products) => {
        console.log("no", store_products)

        axios.all(store_products.map((product) => axios.get(URL + '/products/findproduct/' + product.barcode, { headers: {'Authorization': `Bearer ${token.accessToken}`}})))
        .then(axios.spread((...responses) => {
            responses.map((res) => console.log("the res", res.data ))

            store_products.map((prod) => {
                responses.map((res) => {
                    
                    if(prod.barcode == res.data.barcode) {
                        setProducts((oldProducts) => [...oldProducts, {
                            barcode: prod.barcode,
                            name: res.data.name,
                            description: res.data.description,
                            price: prod.price,
                            prev_price: prod.prev_price,
                            img_url: res.data.img_url
                        }])
                    }
                })
            })
        }))
        .catch((error) => console.log(error))
    
    }

    useEffect(() => {

        axios.get(URL + '/products/storeproducts/' + activeStore, 
        { 
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response.data)
            getProducts(response.data)

        })
        .catch((error) => {
            console.log(error)
        })
        
    }, [])

   

    return (
    <View style={styles.root}>
        <ScrollView style={styles.table}>
            <View style={styles.row} >
               {tableHead.map((head) => <Text style={styles.head}>{head}</Text>)}
            </View>
            {products && products.map((product, index) => {
                if(index % 2) {
                    return (<TouchableOpacity style={styles.oddRow} key={index} >
                        {_.map((_.filter(product, (value, index) => {return (index != 'barcode' && index != 'img_url')})), (prod, index) => <Text style={styles.text} key={index}>{prod}</Text>)}
                     </TouchableOpacity>)
                } else {
                    return (<TouchableOpacity style={styles.evenRow} key={index}>
                        {_.map((_.filter(product, (value, index) => {return (index != 'barcode' && index != 'img_url')})), (prod, index) => <Text style={styles.text} key={index}>{prod}</Text>)}
                     </TouchableOpacity>)
                }
               
            })}
        </ScrollView>

    </View>);
}

const styles = StyleSheet.create({
    root: {
      backgroundColor: '#94ffff',
      flex: 1,
      color: 'black',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    mainView: {
      flexGrow: 1
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(50, 50, 50, 0.17)'
    },
    oddRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(50, 50, 50, 0.17)',
        
    },
    evenRow: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        
    },
    head: {  color: 'black', width: 85,  padding: 5, fontWeight: 'bold'  },
    text: {  color: 'black', width: 85,  padding: 5 }
  });
  
  export default StoreProducts;