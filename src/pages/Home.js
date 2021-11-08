import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import ScanIcon from '../../assets/images/scan.png';
import { Modal } from '../components/Modal';
import { useToken } from '../contexts/TokenContext';
import { useStore, useActiveStore } from '../contexts/StoreContext';
import { Stores } from '../variables/constants';


const Home = ({navigation}) => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [token, setToken] = useToken();
  const [store, setStore] = useStore();
  const [activeStore, setActiveStore] = useActiveStore();

  useEffect(() => {
    
    axios.get('http://192.168.88.207:4000/stores/userstores', { headers: {'Authorization': `Bearer ${token.accessToken}`}})
    .then((response) => {
      console.log(response.data);
      setStore(response.data) //returns an array
      setActiveStore(response.data[0]); //this will need to be in the dropdown function
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  const handleModal = () => {
    setIsModalVisible(!isModalVisible)

  }

  const handleBarcode  = () => {
    navigation.navigate('Barcode')
  }
  
  const handleProduct = () => {
    navigation.navigate('Products')
  }
  return (
    <View style={styles.root}>
      <View style={styles.mainView}>
      {store && <Text>
        Current Store: {Stores[store[0].store_id].store_name}
      </Text>}
        
      </View>
      <View>
        <TouchableOpacity
          onPress={handleProduct}>
            <Text>Store Products</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.scanView} >
        <TouchableOpacity 
          style={styles.scan}
          onPress={handleBarcode}>
          <Image
            style={styles.scanImg}
            source={ScanIcon} />
        </TouchableOpacity>
        <Text style={styles.scanText}>Scan</Text>
        </View>

    </View>
  );
};





const styles = StyleSheet.create({
  root: {
    backgroundColor: '#94ffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mainView: {
    flexGrow: 1
  },
  btn: {
    width: 240,
    borderRadius: 4,
    backgroundColor: '#FF9494',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginVertical: 8,
  },
  btnText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  scanView: {
    padding: 10
  },
  scan: {
    display: 'flex',
    justifyContent: 'center',
   padding: 10,
   backgroundColor: 'white',
   borderRadius: 50,
   width: 80,
   height: 80,
   shadowOffset:{  width: 10,  height: 10,  },
   shadowColor: 'black',
   shadowOpacity: 0.35,
  },
  scanImg: {
    width: 60,
    height: 40
  },
  scanText: {
    textAlign: 'center',
    fontSize: 16
  }
});

export default Home;
