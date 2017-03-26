import React, {Component, PropTypes} from 'react'

import {StyleSheet, Text, TextInput, View, Alert} from 'react-native'

import {connect} from 'react-redux'
import {login} from '../redux/actions/user'

import Header from '../components/header'
import EventMap from './event-map'

import styles from '../theme/common-styles.js'

import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk'



class Login extends Component {
    componentDidMount () {
        if (this.props.loggedIn) {
            this.navigate(EventMap);
        }
    }

    navigate(component) {
        this
            .props
            .navigator
            .push({component: component});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Text style={{
                        color: 'red'
                    }}>{this.props.error}</Text>

                    <LoginButton
                        publishPermissions={["publish_actions"]}
                        readPermissons={["public_profile"], ["email"]}
                        onLoginFinished={(error, result) => {
                        if (error) {
                            alert("login has error: " + result.error);
                        } else if (result.isCancelled) {
                            alert("login is cancelled.");
                        } else {
                            console.log('Yay works');
                            AccessToken
                                .getCurrentAccessToken()
                                .then((data) => {
                                    console.log(data);
                                    
                                    this.props.dispatch(login(data.accessToken.toString(), data.userID));
                                    this.props.navigator.push({component: EventMap});
                                })
                        }
                    }}
                        onLogoutFinished={() => alert("logout.")}/>
                </View>
            </View>
        );
    }
}

export default connect((store) => {
    return {
        loggedIn: store.user.loggedIn
    }
})(Login);