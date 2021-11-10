import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useActiveStore } from '../contexts/StoreContext';
import { useToken } from '../contexts/TokenContext';



const StoreProducts = () => {

    const [activeStore, setActiveStore] = useActiveStore();
    const [token, setToken] = useToken();
    const [products, setProducts] = useState([
       
    ]);

    const getProducts = (store_products) => {
        console.log("no", store_products)
        axios.all([
            axios.get('http://192.168.88.207:4000/products/findproduct/' + store_products[0].barcode, { headers: {'Authorization': `Bearer ${token.accessToken}`}})
        ])
        .then(axios.spread((...responses) => {
            console.log(responses[0].data)
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
    }

    useEffect(() => {

        axios.get('http://192.168.88.207:4000/products/storeproducts/' + activeStore, 
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

   

    return (<View style={styles.root}>
        {products && products.map((product, barcode) => {
            return <Text key={barcode}>{product.name}</Text>
        })}
    </View>);
}

const styles = StyleSheet.create({
    root: {
      backgroundColor: '#94ffff',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    mainView: {
      flexGrow: 1
    }
  });
  
  export default StoreProducts;