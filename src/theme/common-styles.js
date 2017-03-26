import React from 'react'
import{
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
     justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textinput: {
    height: 40,
    width: 250,
    fontSize: 18,
    margin: 20,
    color: 'white'
  },
  transparent_button: {
    marginTop: 10,
    padding: 15
  },
  transparent_button_text: {
    color: '#0485A9',
    fontSize: 16
  },
  primary_button: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    width: 300,
    backgroundColor: '#529ecc',
    borderRadius: 25
  },
  primary_button_text: {
    color: '#FFF',
    fontSize:21
  },
  image: {
    width: 100,
    height: 100
  }
});