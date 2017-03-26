import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ListView,
    ScrollView,
    Dimensions,
    Button,
    Alert
} from 'react-native';

import Header from './header'

import {connect} from 'react-redux'

class EventList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.data)
        };
    }

    _handleButtonPress = () => {
        Alert.alert('Button pressed!', 'Congrats You are on the main page',);
    };

    renderHeader = () => {
        if (this.props.title) {
            return <Header text={this.props.title}>
                    </Header>
        }
    }

    render() {
        return (
            <View style={styles.container}>  
                { this.renderHeader() }
            <ScrollView
                enableEmptySections={true}
                style={{
                width: Dimensions
                    .get('window')
                    .width
            }}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <this.props.listItem rowData={rowData}/>} />
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 500,
        backgroundColor: '#fff',
    },

    listItem: {
        margin: 15,
        padding: 9,
        height: 40,
        borderColor: '#b3b3b3',
        borderWidth: 2,
        backgroundColor: '#fff',
        textAlign: 'center',
        borderRadius: 30
    }
});

EventList.defaultProps = {
    events: [],
    filter: {}
}

export default connect(store => {
    return {
        //events: store.events.events
    }
})(EventList);