import React from 'react'
import {Text, View, Button} from 'react-native'

const UserListItem = ({rowData, onPressEvent}) => {
    return(
        <View style={{padding: 10}}>
            <Text>
                {rowData.name}
            </Text>

            { onPressEvent ?
                <View>
                <View style={{padding: 10}}>
                    <Button
                        key={0}
                        title={'Accept'}
                        onPress={() => {
                            console.log(rowData)
                            onPressEvent(true, rowData.id, rowData.name);

                        }}
                    />
                </View>

                <View style={{padding: 10}}>
                    <Button
                        key={1}
                        title={'Reject'}
                        onPress={() => {
                            onPressEvent(false, rowData.userId, rowData.name);
                        }}
                    />
                </View>
                </View>
                : undefined
            }
        </View>
    )
}

export default UserListItem