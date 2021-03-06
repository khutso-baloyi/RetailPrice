
import React, {useEffect, useState} from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import { Modal } from './Modal';
import axios from 'axios';
import { useToken } from '../contexts/TokenContext';
import { URL } from '../variables/constants';

const Barcode = ({navigation}) => {
  const [token, setToken] = useToken();
  const [barcode, setBarcode] = useState(null);
  const [isModalVisibleNoProduct, setIsModalVisibleNoProduct] = useState(false);
  const [isModalVisibleProduct, setIsModalVisibleProduct] = useState(false);

  const handleBarcode = e => {

    if(barcode != e.data) {
      if(e.type == 'EAN_13') {
        setBarcode(e.data);
        axios.get(URL + '/products/findproduct/' + e.data, { headers: {'Authorization': `Bearer ${token.accessToken}`}} )
        .then((response) => {
          console.log("the response",response.data)
          if(!response.data) {
            console.log("the barcode does not exist")
            setIsModalVisibleNoProduct(true)
          } else {
            console.log("the barcode exists")
            setIsModalVisibleProduct(true)
          }
        })
        .catch((error) => console.error(error))
      }
      console.log('Barcode: ' + e.data);
      console.log('Type: ' + e.type);
  }
  };

  const addProduct = () => {
    setIsModalVisibleNoProduct(false);

    navigation.navigate('AddProduct', {
      barcode: barcode
    })
  }

  const cancel = () => {
    setIsModalVisibleNoProduct(false);
    setIsModalVisibleProduct(false);
  }

  const updateProduct = () => {
    setIsModalVisibleProduct(false);

    navigation.navigate('UpdateProduct', {
      barcode: barcode
    })
    
  }

  useEffect(() => {
    //this set timeout is here to make the app wait before requesting again
    setTimeout(() => {
      setBarcode(0)
    }, 10000)
  }, [barcode, setBarcode])

  return (
    <View style={styles.root}>
      <Text style={{color: 'black'}}>Scan a barcode and view the product results</Text>
      <RNCamera 
      style={styles.rnCamera} 
      flashMode='on'
      onBarCodeRead={handleBarcode}
      />
      <Modal isVisible={isModalVisibleNoProduct}>
          <Modal.Container>
            <Modal.Header title="Product does not Exist" />
            <Modal.Body>
              <Text style={styles.text}>This product does not exist, want to add it?</Text>
              </Modal.Body>
            <Modal.Footer>

            <TouchableOpacity style={styles.cancelBtn} onPress={cancel}>
              <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn}  onPress={addProduct}>
                <Text style={styles.confirmText}>Add Product</Text>
                </TouchableOpacity>
              
            </Modal.Footer>
          </Modal.Container>
        </Modal>
      <Modal isVisible={isModalVisibleProduct}>
        <Modal.Container>
          <Modal.Header title="Update Product" />
          <Modal.Body>
            <Text style={styles.text}>This product exist, update price?</Text>
          </Modal.Body>
          <Modal.Footer>

          <TouchableOpacity style={styles.cancelBtn} onPress={cancel}>
              <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={updateProduct}>
              <Text style={styles.confirmText}>Update Price</Text>
            </TouchableOpacity>
            
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  root: {
    backgroundColor: '#94ffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
   rnCamera: {
    flex: 1,
    width: '94%',
    alignSelf: 'center',
  },
  btn: {
    width: 240,
    borderRadius: 4,
    backgroundColor: '#62d1bc',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginVertical: 8,
  },
  btnText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  confirmText: {
    color: 'white',
    fontFamily: 'Nunito-Black'
  },
  cancelText: {
    color: 'blue',
    fontFamily: 'Nunito-Black'
  },
  text: {
    color: 'black',
    fontFamily: 'Nunito-Black'
  },
  confirmBtn: {
    margin: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    
  },
  cancelBtn: {
    margin: 15,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'blue'
  }

});

export default Barcode;
