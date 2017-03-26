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

const event_types = [
    "Eğlence",
    "Tarih",
    "Kültür",
    "Sanat",
    "Spor",
    "Doğa"
];

import MapView from 'react-native-maps'
import ModalPicker from 'react-native-modal-picker'

import Header from '../components/header'
import DatePickers from '../components/date-pickers'

import {connect} from 'react-redux'
import {createEvent, fetchEvents} from '../redux/actions/events'

import EventDetail from './event-detail'

import axios from 'axios'

class EventCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            markerCoordinate: {
                latitude: 0,
                longitude: 0
            },
            startDate: '',
            endDate: '',
            title: '',
            type: '',
            description: '',
            pois: []
        }
    }
    _handleButtonPress = () => {
        if (this.state.description && this.state.title && this.state.type) {
            this
                .props
                .dispatch(createEvent({
                    title: this.state.title,
                    start: Number(new Date(this.state.startDate)),
                    end: Number(new Date(this.state.endDate)),
                    owner: this.props.userId,
                    loc: this.state.markerCoordinate.latitude + ',' + this.state.markerCoordinate.longitude,
                    type: this.state.type,
                    desc: this.state.description

                }, (id, err) => {
                    if (err) {
                    Alert.alert('Error! ' + err);
                    return;  
                }
                
                    Alert.alert('Event created!');
                    this
                        .props
                        .navigator
                        .push({
                            component: EventDetail,
                            passProps: {
                                eventId: id
                            }
                        });
                    this.props.dispatch(fetchEvents());
                }))
        }
    }

    onStartDateChange = (date) => {
        this.setState({startDate: date})
    }

    onEndDateChange = (date) => {
        this.setState({endDate: date})
    }

    componentDidMount() {
        navigator
            .geolocation
            .getCurrentPosition((position) => {
                this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude});
            }, (error) => alert(JSON.stringify(error)), {
                timeout: 20000,
                maximumAge: 1000
            });

        axios({url: 'https://hermes-hackathon.herokuapp.com/pois', method: 'get'}).then(res => {
            this.setState({pois: res.data});
        }).catch(err => {
            console.log(err);
        })

    }

    renderPOIS = () => {
        if (this.state.pois) {
            return this
                .state
                .pois
                .map((elem, key) => {
                    let loc = elem
                        .location
                        .split(',');
                    return <MapView.Marker
                        key={key}
                        coordinate={{
                        latitude: + loc[0],
                        longitude: + loc[1]
                    }}
                        pinColor={'#ffffff'}
                        onPress={(e) => {
                        this.setState({
                            latitude: e.nativeEvent.coordinate.latitude, 
                            longitude: e.nativeEvent.coordinate.longitude, 
                            markerCoordinate: e.nativeEvent.coordinate
                        });
                    }}
                        title={elem.name}
                        description={elem.description}/>
                })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Header text="Create"></Header>

                <TextInput
                    style={styles.input}
                    placeholder='Title'
                    autoCapitalize='none'
                    underlineColorAndroid="transparent"
                    onChange={(e) => {
                    this.setState({title: e.nativeEvent.text})
                }}/>

                <TextInput
                    style={styles.description}
                    placeholder='Description'
                    autoCapitalize='none'
                    underlineColorAndroid="transparent"
                    onChange={(e) => {
                    this.setState({description: e.nativeEvent.text})
                }}/>

                <ModalPicker
                    style={styles.modalPicker}
                    data={event_types.map((v, i) => {
                    return {key: i, label: v};
                })}
                    initValue="Type"
                    onChange={(option) => {
                    this.setState({type: option.label})
                }}/>

                <DatePickers
                    onStartDateChange={this.onStartDateChange}
                    onEndDateChange={this.onEndDateChange}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}/>

                <MapView
                    style={styles.map}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    showUserLocation={true}>

                    <MapView.Marker
                        draggable
                        coordinate={this.state.markerCoordinate}
                        onDragEnd={(e) => this.setState({
                            latitude: e.nativeEvent.coordinate.latitude, 
                            longitude: e.nativeEvent.coordinate.longitude, 
                            markerCoordinate: e.nativeEvent.coordinate
                        })}/>

                        {
                            this.renderPOIS()
                        }

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
    },

    modalPicker: {

        height: 60,

        borderColor: '#b3b3b3',
        padding: 10
    },

    description: {
        margin: 10,
        height: 100,
        width: Dimensions
            .get('window')
            .width / 1.2,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#b3b3b3',
        padding: 10
    }
});

export default connect(store => {
    return {userId: store.user.id}
})(EventCreate);
