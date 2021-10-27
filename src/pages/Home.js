import React, {useState} from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import ScanIcon from '../../assets/images/scan.png';
import { Modal } from '../components/Modal';

const Home = ({navigation}) => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal = () => {
    setIsModalVisible(!isModalVisible)

  }

  const handleBarcode  = () => {
    navigation.navigate('Barcode')
  }
  return (
    <View style={styles.root}>
      <View style={styles.mainView}>
       <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Scan a product</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <Modal.Container>
            <Modal.Header title="LogRocket is fab!" />
            <Modal.Body>
              <Text style={styles.text}>Agree to continue with this guide</Text>
              </Modal.Body>
            <Modal.Footer>
              <Button title="I agree" onPress={handleModal} />
            </Modal.Footer>
          </Modal.Container>
        </Modal>
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
