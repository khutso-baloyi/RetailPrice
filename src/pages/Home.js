import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ScanIcon from '../../assets/images/scan.png';
import { Modal } from '../components/Modal';
import { useToken } from '../contexts/TokenContext';
import { useStore, useActiveStore } from '../contexts/StoreContext';
import { Stores } from '../variables/constants';
import ArrowIcon from '../../assets/images/caret-down-solid.png';
import _ from 'lodash';


const Home = ({navigation}) => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [token, setToken] = useToken();
  const [store, setStore] = useStore();
  const [activeStore, setActiveStore] = useActiveStore();
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    
    axios.get('http://192.168.88.207:4000/stores/userstores', { headers: {'Authorization': `Bearer ${token.accessToken}`}})
    .then((response) => {
      console.log(response.data);
      setStore(response.data) //returns an array
      response.data.map((store) => {if(store.is_primary_store) setActiveStore(store.store_id)})
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  useEffect(() => {
    console.log("active store", activeStore)
  }, [activeStore, setActiveStore])

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
        <View style={styles.dropdownMain}>
        {store && <>
        <Text style={styles.currentStore}>
        Current Store: 
        </Text>
         {/* <Text style={styles.currentStore}> {Stores[store[0].store_id].store_name}</Text>
         <Image style={styles.arrowImg} source={ArrowIcon} /> */}

      <Picker
        selectedValue={activeStore}
        style={styles.dropdown}
        onValueChange={(itemValue, itemIndex) => setActiveStore(itemValue)}
      >
        {_.map(Stores, (store, storeIndex) => <Picker.Item label={store.store_name} value={storeIndex} key={storeIndex}/> )}
        {/* <Picker.Item label={Stores[store[0].store_id].store_name} value="java" />
        <Picker.Item label={Stores[store[0].store_id].store_name} value="js" /> */}
      </Picker>
          
      </>}
        </View>
     
      <TouchableOpacity
        style={styles.btn}
          onPress={handleProduct}>
            <Text style={styles.btnText}>Store Products</Text>
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
  currentStore: {
    fontSize: 18,
    fontFamily: 'Nunito-Black'
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
    fontFamily: 'Nunito-Black'
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
  arrowImg: {
    width: 15,
    height: 20,
    marginLeft: 10
  },
  scanText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Nunito-Black'
  }
});

export default Home;
