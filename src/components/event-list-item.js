import React from 'react'
import {Text, StyleSheet} from 'react-native'

const EventListItem = ({rowData}) => {
    return(
        <Text style={styles.listItem}>
            {rowData.title} -- {rowData.description}
        </Text>
    )
}

const styles = StyleSheet.create({
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

export default EventListItem