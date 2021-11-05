
import React, {useState} from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import { Modal } from './Modal';

const Barcode = ({navigation}) => {
  const [barcode, setBarcode] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBarcode = e => {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
    setIsModalVisible(true)
  };

  const handleModal = () => {
    setIsModalVisible(false)
  }

  return (
    <View style={styles.root}>
      <Text style={{color: 'black'}}>Scan a barcode and view the product results</Text>
      <RNCamera 
      style={styles.rnCamera} 
      onBarCodeRead={handleBarcode}
      />
      <Modal isVisible={isModalVisible}>
          <Modal.Container>
            <Modal.Header title="Product Results" />
            <Modal.Body>
              <Text style={styles.text}>Agree to continue with this guide</Text>
              </Modal.Body>
            <Modal.Footer>
              <Button title="I agree" onPress={handleModal} />
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
  text: {
    color: 'black'
  }
});

export default Barcode;
