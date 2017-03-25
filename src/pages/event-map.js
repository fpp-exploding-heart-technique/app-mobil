import React, {Component} from 'react'
import { View, Text, StyleSheet, TextInput, Picker} from 'react-native'

import MapView from 'react-native-maps'

import DatePickers from '../components/date-pickers'
class Profile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            language: 'Java',
            startDate: '',
            endDate: ''
        }
      
    }
    
    render() {
        return(
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                    showUserLocation={true}>
                    <MapView.Marker
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324
                        }}
                        title={'title'}
                        description={'description'}/>
                </MapView>

                <View style={styles.inputField}>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            
                            selectedValue={this.state.language}
                            onValueChange={(lang) => this.setState({language: lang})}>
                            <Picker.Item style={styles.picker} label="Java" value="java" />
                            <Picker.Item style={styles.picker} label="JavaScript" value="js" />
                        </Picker>
                    </View>
                    
                    <DatePickers />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
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
      borderRadius: 30,
  },

  picker: {
      fontSize: 5
  }
});

export default Profile;