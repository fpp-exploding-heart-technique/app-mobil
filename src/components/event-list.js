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

export default class EventList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows([['John', '21,14,2015'],['John', '21,14,2015']])
        };
    }

    _handleButtonPress = () => {
        Alert.alert('Button pressed!', 'Congrats You are on the main page',);
    };

    render() {
        return (
            
            <View style={styles.container}>
                <Header text={this.props.title}/>
                
                <ScrollView
                    style={{
                    width: Dimensions
                        .get('window')
                        .width
                }}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => 
                        <Text style={styles.listItem}>
                        {rowData[0]} -- {rowData[1]}</Text>} />
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