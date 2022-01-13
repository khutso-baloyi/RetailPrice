import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ImageBackground, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ScanIcon from '../../assets/images/scan.png';
import { Modal } from '../components/Modal';
import { useToken } from '../contexts/TokenContext';
import { useStore, useActiveStore } from '../contexts/StoreContext';
import { Stores, URL } from '../variables/constants';
import SpeechBubble from '../../assets/images/speech_bubble.png';
import _ from 'lodash';


const Home = ({navigation}) => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [token, setToken] = useToken();
  const [store, setStore] = useStore();
  const [activeStore, setActiveStore] = useActiveStore();
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    
    axios.get(URL + '/stores/userstores', { headers: {'Authorization': `Bearer ${token.accessToken}`}})
    .then((response) => {
      console.log("yes ",response.data);
      setStore(response.data) //returns an array
      response.data.map((store) => {if(store.is_primary_store) setActiveStore(store.store_id)})
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
        <View style={styles.dropdownMain}>
        {store && <>
        <Text style={styles.currentStore}>
        Current Store: 
        </Text>
         
      <Picker
        selectedValue={activeStore}
        style={styles.dropdown}
        onValueChange={(itemValue, itemIndex) => setActiveStore(itemValue)}
      >
        {_.map(Stores, (store, storeIndex) => <Picker.Item label={store.store_name} value={storeIndex} key={storeIndex}/> )}

      </Picker>
          
      </>}
        </View>
     
      <TouchableOpacity
        style={styles.btn}
          onPress={handleProduct}>
            <Text style={styles.btnText}>Store Products</Text>
          </TouchableOpacity>
      </View>
      

      <ImageBackground source={SpeechBubble}>
        <View style={styles.speechText}>
        <Text style={styles.insideText}>The button above allows you to view products {"\n"} in each store 
        </Text>
        <Text style={styles.insideText}>The button below allows you to scan a product's barcode</Text>
        </View>
      </ImageBackground>
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
    color: 'black',
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
    color: 'black',
    fontFamily: 'Nunito-Black'
  },
  speech: {
    display: 'block',
    width: 150,
    height: 150

  },
  speechText: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 50,
    height: 270,
    width: 350,
    padding: 10,
    paddingRight: 24
  },
  insideText: {
    textAlign: 'center',
    fontSize: 13,
    color: 'black',
    fontFamily: 'Qdbettercomicsans-jEEeG'
  }
});

export default Home;
