import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';

const Barcode = ({navigation}) => {
  const [barcode, setBarcode] = useState(null);
  
  const handleBarcode = e => {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
  };

  return (
    <View style={styles.root}>
      <Text style={{color: 'black'}}>Scan a barcode and view the results</Text>
      <RNCamera 
      style={styles.rnCamera} 
      onBarCodeRead={handleBarcode}
      />

      <View style={styles.cameraControl}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>New QR Scan</Text>
        </TouchableOpacity>
      </View>
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
});

export default Barcode;
