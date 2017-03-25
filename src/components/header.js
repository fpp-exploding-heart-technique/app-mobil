import React, {Component, PropTypes} from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

const style = StyleSheet.create({
  header: {
    backgroundColor: '#ff5000',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerItem: {
    paddingLeft: 10,
    paddingRight: 10
  },
  headerText: {
    color: '#fff',
    fontSize: 22
  },
  headerIcon: {
    position: 'absolute',
    backgroundColor: '#ff5000',
    height: 100,
    width: 100,
    borderRadius: 50,
    top: 50,
    left: 20,
    
  }
});

class Header extends Component {

  render () {
    return (       
      <View style={style.header}>
         
        <Text style={style.headerText}>{this.props.text}</Text>
        
        
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          {this.props.children}
        </View>
      </View>
    );
  }

  goBack () {
    this.props.navigator.pop();
  }
}

Header.propTypes = {
  text: PropTypes.string,
  navigator: PropTypes.object,
  backArrow: PropTypes.bool
};

Header.defaultProps = {
  backArrow: false
}

export default Header;