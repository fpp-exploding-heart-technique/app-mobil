import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    Button,
    Alert
} from 'react-native';

import MapView from 'react-native-maps'

import Header from '../components/header'

export default class EventCreate extends Component {
    _handleButtonPress = () => {
        Alert.alert('Button pressed!', 'You did it!',);
    };

    render() {
        return (
            <View style={styles.container}>
                <Header text="Create"></Header>

                <TextInput
                    style={styles.input}
                    placeholder='Type'
                    autoCapitalize='none'
                    underlineColorAndroid="transparent"/>

                <TextInput
                    style={styles.input}
                    placeholder='Time'
                    autoCapitalize='none'
                    underlineColorAndroid="transparent"/>

                <TextInput
                    style={styles.input}
                    placeholder='Description'
                    autoCapitalize='none'
                    underlineColorAndroid="transparent"/>

                <TextInput
                    style={styles.input}
                    placeholder='Place'
                    autoCapitalize='none'
                    underlineColorAndroid="transparent"/>

                <MapView
                    style={styles.map}
                    region={{
                    latitude: 0,
                    longitude: 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                    showUserLocation={true}
                    onPress={() => {
                        console.log(arguments);
                    }}>
                    <MapView.Marker
                        coordinate={{
                        latitude: 0,
                        longitude: 0
                    }}
                        title={'title'}
                        description={'description'}/>
                </MapView>

                <Button title="Create" onPress={this._handleButtonPress}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputRows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
        marginBottom: 5,
        padding: 10,
        borderColor: '#b3b3b3',
        borderWidth: 1,
        borderRadius: 10
    },
    input: {
        margin: 10,
        height: 40,
        width: Dimensions
            .get('window')
            .width / 1.2,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#b3b3b3',
        padding: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        //paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1'
    },
    head: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e'
    },
    map: {
        height: 200,
        width: Dimensions
            .get('window')
            .width
    }
});
