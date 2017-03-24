
import React, {Component, PropTypes} from 'react'

import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

class Button extends Component {

    render(){
        return (
            <View>
                <TouchableHighlight underlayColor={"#E8E8E8"} onPress={this.props.onPress} style={this.props.buttonStyle}>
                    <View>
                        <Text style={this.props.textStyle}>{this.props.text}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}


const style = StyleSheet.create({
    button: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    width: 100,
    backgroundColor: '#529ecc',
    borderRadius: 20
  },
  text: {
    color: '#FFF',
    fontSize:21
  },
});


Button.propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    buttonStyle: View.propTypes.style,
    textStyle: Text.propTypes.style
};


Button.defaultProps = {
    buttonStyle: style.button,
    textStyle: style.text
};
export default Button;
