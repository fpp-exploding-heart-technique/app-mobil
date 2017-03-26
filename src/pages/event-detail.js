import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, Button} from 'react-native';

import Header from '../components/header'
import TabView from '../components/tab-view'

import {fetchEvent} from '../redux/actions/events'
import {connect} from 'react-redux'

import axios from 'axios'

class EventDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addr: ''
        }
    }
    componentDidMount() {
        this
            .props
            .dispatch(fetchEvent(this.props.eventId, (loc) => {
                axios({
                    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc + '&key=AIzaSyD5ZVqWOjENIDBJGO3dBCAQ-iiF-yZd8tQ',
                    method: 'get'
                }).then(res => {
                    this.setState({addr: res.data.results[2].formatted_address});
                }).catch(err => {
                    console.log(err);
                })
            }));

    }

    renderAttendee = () => {
        if (this.props.event.owner === this.props.userId) {
            return <Text>This is my event</Text> 
        } else {
            return <Button
                        style={styles.joinButton} 
                        title="KATIL" 
                        onPress={() => {

                        }}/>
        }
    }

    render() {
        let startDate = new Date(this.props.event.start);
        let endDate = new Date(this.props.event.end);
        return (
            <View style={styles.container}>
                <Header text="Event Detail"></Header>
                <Text style={styles.header}>{this.props.event.title}</Text>
                <View style={styles.eventsInfo}>
                    <View style={styles.noDesc}>
                        <Text style ={styles.eventsInfoTextOne}>
                            <Text style={styles.bold}>Owner:</Text>
                            {this.props.userName}</Text>
                        <Text style ={styles.eventsInfoTextOne}>
                            <Text style={styles.bold}>Date:
                            </Text>
                            {startDate.toLocaleDateString() + '-' + endDate.toLocaleDateString()}</Text>
                        <Text style ={styles.eventsInfoTextOne}>
                            <Text style={styles.bold}>Place:
                            </Text>
                            {this.state.addr}
                        </Text>
                    </View>
                    <Text style={styles.eventsInfoText}>
                        <Text style={styles.bold}>Description:
                        </Text>
                        {this.props.event.description}
                    </Text>
                </View>

                <TabView
                    title1={"Attendee"}
                    title2={"DSd"}
                    view1={this.renderAttendee()}
                    view2={< Text > test </Text>}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    noDesc: {
        marginBottom: 10
    },

    header: {
        marginTop: 12,
        fontSize: 18,
        marginLeft: 20,
        marginRight: 20,
        padding: 5,
        fontWeight: 'bold',
        color: '#ff6600',
        textAlign: 'center',
        borderColor: 'grey',
        borderWidth: 2,
        backgroundColor: 'white',
        borderRadius: 30
    },

    eventsInfo: {
        marginLeft: 18,
        marginRight: 12,
        marginTop: 6,
        padding: 15,
        height: (Dimensions.get('window').height / 5)
    },

    bold: {
        fontWeight: 'bold'
    },

    eventsInfoText: {
        fontSize: 14,
        margin: 2,
        color: 'grey'
    },

    eventsInfoTextOne: {
        fontSize: 14,
        color: 'grey'
    },

    joinButton: {
        marginTop: 50
    }
});

EventDetail.defaultProps = {
    eventId: ''
};

export default connect(store => {
    return {event: store.events.activeEvent, userName: store.user.name, userId: store.user.id}
})(EventDetail);