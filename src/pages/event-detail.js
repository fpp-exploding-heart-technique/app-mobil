import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, Button} from 'react-native';

import Header from '../components/header'
import TabView from '../components/tab-view'
import EventList from '../components/event-list'
import UserListItem from '../components/user-list-item'

import {fetchEvent, joinEvent, confirmRequest} from '../redux/actions/events'
import {connect} from 'react-redux'


import axios from 'axios'

class EventDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addr: '',
            usrName: ''
        }
    }

    fetchCurrEvent = (id) => {
        this
            .props
            .dispatch(fetchEvent(id, (loc) => {
                axios({
                    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc + '&key=AIzaSyD5ZVqWOjENIDBJGO3dBCAQ-iiF-yZd8tQ',
                    method: 'get'
                }).then(res => {
                    this.setState({addr: res.data.results[2].formatted_address});
                }).catch(err => {
                    console.log(err);
                })
            }));

            if (this.props.userId !== this.props.event.owner) {
                axios({
                    url: 'https://hermes-hackathon.herokuapp.com/users/' + this.props.event.owner,
                    method: 'get'
                })
                .then(res => {
                    console.log(res.data);
                    this.setState({usrName: res.data.name})
                })
                .catch(err => {
                    console.log(err);
                })
            }
    }
    componentDidMount() {
        
        this.fetchCurrEvent(this.props.eventId);

    }


    renderAttendees = () => {
        return <EventList data={this.props.event.attendees} listItem={UserListItem}/>
    }

    renderRequests = () => {
        return <EventList data={this.props.event.requests} listItem={UserListItem} onItemPress={this.confirmRequest}/>
    }

    confirmRequest = (confirmed, userId, name) => {
        this.props.dispatch(confirmRequest(confirmed, userId, name, this.props.eventId));
        this.fetchCurrEvent(this.props.eventId);
    }

    render() {
        console.log(this.props);
        let startDate = new Date(this.props.event.start);
        let endDate = new Date(this.props.event.end);
        console.log(this.props.event.attendees.indexOf(this.props.userId) !== -1);
        return (
            <View style={styles.container}>
                <Header text="Event Detail"></Header>
                <Text style={styles.header}>{this.props.event.title}</Text>
                <View style={styles.eventsInfo}>
                    <View style={styles.noDesc}>
                        <Text style ={styles.eventsInfoTextOne}>
                            <Text style={styles.bold}>Owner: </Text>
                            {
                                this.props.userId === this.props.event.owner ? 
                                this.props.userName : this.state.usrName
                            
                            }</Text>
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

                {
                    this.props.event.owner === this.props.userId ?
                        <TabView
                            title1={"Attendee"}
                            title2={"Requests"}
                            view1={this.renderAttendees()}
                            view2={this.renderRequests()}/>

                    :

                        this.props.event.attendees.indexOf({userId: this.props.userId}) !== -1 ? 
                            this.renderAttendees()
                            :
                            this.props.event.requests.indexOf({userId: this.props.userId}) !== -1 ?
                                <Text>Request Pending...</Text>
                                :
                                <Button
                                style={styles.joinButton} 
                                title="Join" 
                                onPress={() => {
                                    this.props.dispatch(joinEvent(this.props.userId, this.props.eventId, this.props.userName));
                                }}/>
                }

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