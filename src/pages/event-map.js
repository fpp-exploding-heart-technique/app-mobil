import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Picker,
    Button,
    BackAndroid
} from 'react-native'

import MapView from 'react-native-maps'
import DatePickers from '../components/date-pickers'
import ActionButton from 'react-native-action-button'

import Header from '../components/header'
import Profile from './profile'
import EventCreate from './event-create'
import EventDetail from './event-detail'

import {fetchEvents, updateFilter} from '../redux/actions/events'
import {connect} from 'react-redux'


class EventMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
            latitude: 0,
            longitude: 0
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
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (_navigator && _navigator.getCurrentRoutes().length > 1) {
                _navigator.pop();
                return true;
            }
            return false
        });
        this.props.dispatch(fetchEvents());
    }

    navigate = (component, passProps) => {
        this
            .props
            .navigator
            .push({component, passProps: passProps});
    }

    onPressProfile = () => {
        this.navigate(Profile);
    }
    onPressFAB = () => {
        this.navigate(EventCreate);
    }
    onStartDateChange = (date) => {
        this.setState({startDate: date});
        this.props.dispatch(updateFilter({start:  Number((new Date(date.split(' ').join('T'))))}));
        this.props.dispatch(fetchEvents());
    }

    onEndDateChange = (date) => {
        this.setState({endDate: date});
        this.props.dispatch(updateFilter({end:  Number((new Date(date.split(' ').join('T'))))}));
        this.props.dispatch(fetchEvents());
    }

    renderMarkers = () => {
        if (this.props.events) {
            return this.props.events.map((elem, key) => {
                let loc = elem.location.split(',');
                return <MapView.Marker
                            key={key}
                            coordinate={{
                            latitude: +loc[0],
                            longitude: +loc[1]
                            }}
                            title={elem.title}
                            description={elem.description}
                            onCalloutPress={() => {
                                console.log(elem);
                                this.navigate(EventDetail, {eventId: elem._id});
                            }}
                            />
                })
        }
    }

    render() {

        return (
            <View>
                <Header text="Events">
                     <Button
                        style={styles.profileButton}
                        onPress={this.onPressProfile}
                        title="Profile"
                        color="#b3b3b3"/>
                </Header>
                <View style={styles.container}>

                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                        showUserLocation={true}>

                        {
                            this.renderMarkers()
                        }

                    </MapView>    

                    <View style={styles.inputField}>
                        <DatePickers
                            onStartDateChange={this.onStartDateChange}
                            onEndDateChange={this.onEndDateChange}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}/>

                       
                    </View>

                    <ActionButton
                        buttonColor="rgba(231,76,60,1)"
                        position={'center'}
                        offsetY={90}
                        onPress={this.onPressFAB}/>
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

  profileButton: {
    borderRadius: 20,
    borderWidth: 2
  }
});

EventMap.defaultProps = {
    events: []
}

export default connect(store => {
    return {
        events: store.events.events,
        filter: store.events.filter
    }
})(EventMap);