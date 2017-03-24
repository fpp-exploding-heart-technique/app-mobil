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
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerItem: {
    paddingLeft: 10,
    paddingRight: 10
  },
  headerText: {
    color: '#000',
    fontSize: 22
  }
});

class Header extends Component {

  render () {
    return (
      <View style={style.header}>

        <View style={style.headerItem}>
          <Text style={style.headerText}>{this.props.text}</Text>
        </View>
        
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