import React, {Component, PropTypes} from 'react'

import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {login} from '../redux/actions/user'

import Button from '../components/button'
import Header from '../components/header'

import styles from '../theme/common-styles.js'

import {LoginButton, AccessToken} from 'react-native-fbsdk'


class Login extends Component {

    constructor(props){
        super(props);
    }

    navigate(component) {
        this.props.navigator.push({
            component: component,
        });
    }

    handleLogin () {
        
    }

    render(){
        return (
            <View style={styles.container}>
                <Header text="Login">
                    <Text>Header</Text>
                </Header>
                <View style={styles.body}>                    
                    <Text style={{color: 'red'}}>{this.props.error}</Text>

                    <LoginButton
                        publishPermissions={["publish_actions"]}
                        onLoginFinished={
                            (error, result) => {
                            if (error) {
                                alert("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                alert("login is cancelled.");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    alert(data.accessToken.toString())
                                }
                                )
                            }
                            }
                        }
                        onLogoutFinished={() => alert("logout.")}/>
                    
                </View>
            </View>
        );
    }
}

export default connect((state) => {
    return {
        user: state.user.loading
    }
})(Login);