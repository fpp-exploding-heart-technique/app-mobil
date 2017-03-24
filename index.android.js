import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './src/app'

export default class hermesapp_mobile extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('hermesapp_mobile', () => hermesapp_mobile);
