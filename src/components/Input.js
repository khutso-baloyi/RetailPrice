import { StyleSheet, TextInput, View, Text } from "react-native"
import React from "react"


export const Input = ({ label, error, ...textInputProps }) => {
    const isError = Boolean(error)
  
    console.log("isError: ", isError)
    return (
      <View>
        {Boolean(label) && <Text>{label}</Text>}
        {!isError && <TextInput style={styles.normalInput}
                        placeholder={label} {...textInputProps} />}
        {isError && <><TextInput style={styles.errorInput} {...textInputProps} />
        <Text style={styles.error}>{error}</Text></>}
        
      </View>
    )
  }

  const styles = StyleSheet.create({
      error: {
          color: 'red'
      },
      errorInput: {
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 42,
        width: 300,
        padding: 10,
      },
      normalInput: {
        
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 42,
        width: 300,
        padding: 10,
        marginBottom: 20
      } 
  })

