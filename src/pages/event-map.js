import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, Picker, Button, BackAndroid} from 'react-native'

import MapView from 'react-native-maps'
import DatePickers from '../components/date-pickers'
import ActionButton from 'react-native-action-button'

import Header from '../components/header'
import Profile from './profile'
import EventCreate from './event-create'

class EventMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'Java',
            startDate: '',
            endDate: '',
            latitude: 0,
            longtitude: 0
        }

    }

    componentDidMount() {
        navigator
            .geolocation
            .getCurrentPosition((position) => {
                console.log(position);
                this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude});
            }, (error) => alert(JSON.stringify(error)), {
                timeout: 20000,
                maximumAge: 1000
            });

            let _navigator = this.props.navigator;
            BackAndroid.addEventListener('hardwareBackPress',   () =>  {
                if (_navigator && _navigator.getCurrentRoutes().length > 1) {
                    _navigator.pop();
                    return true;
                }
                return false
            });
    }
   

    navigate = (component) => {
        this.props.navigator.push({component: component});
    }

    onPressProfile = () => {
        this.navigate(Profile);
    }
    onPressFAB = () => {
        this.navigate(EventCreate);
    }
    onDateChange = (date) => {
        this.setState({startDate: date})
    }

    render() {
        
        return (
            <View>
                <Header text="Events">
                </Header>
            <View style={styles.container}>
              
                
                <MapView
                    style={styles.map}
                    region={{
                    latitude: this.state.latitude,
                    longitude: this.state.longtitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                    showUserLocation={true}>
                    <MapView.Marker
                        coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324
                    }}
                        title={'title'}
                        description={'description'}/>
                </MapView>

                <View style={styles.inputField}>
                    <DatePickers onDateChange/>
                    
                    <Button
                        onPress={this.onPressProfile}
                        title="Profile"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                        />
                </View>

                <ActionButton
                        buttonColor="rgba(231,76,60,1)"
                        position={'center'}
                        offsetY={90}
                        onPress={this.onPressFAB}
                        />
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    map: {
        height: 400,
        width: 350
    },

    inputField: {
        flexDirection: 'column',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    pickerWrapper: {

        width: 200,

        borderColor: '#444',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 30
    },

    picker: {
        fontSize: 5
    },

    

});

export default EventMap;