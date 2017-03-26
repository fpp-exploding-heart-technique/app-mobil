import React from 'react'
import {Text, View, Button} from 'react-native'

const UserListItem = ({rowData, onPressEvent}) => {
    return(
        <View>
            <Text>
                {rowData.name}
            </Text>
            <Button
                key={0}
                title={'Accept'}
                onPress={() => {

                }}
            />
            <Button
                key={1}
                title={'Reject'}
                onPress={() => {

                }}
            />
        </View>
    )
}

export default UserListItem