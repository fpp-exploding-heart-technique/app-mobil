import React, {Component} from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableHighlight, Alert} from 'react-native'

import {LoginButton} from 'react-native-fbsdk'

import Header from '../components/header'

const {width, height} = Dimensions.get('window');

import EventList from '../components/event-list'
import Login from './login'
import EventMap from './event-map'

import {connect} from 'react-redux'
import {logout} from '../redux/actions/user'

class Profile extends Component {
   
    navigate = (component, title) => {
      this.props.navigator.push({component: component, passProps: {
        title: title
      }});
    }

    render() {
        return(
            <View>
                <Header text="Profile" >
                  <LoginButton onLogoutFinished={() => {
                    this.props.dispatch(logout());
                    this.navigate(Login);

                    }}/>
                </Header>
            
                <Image
            source={{ uri: this.props.user.picUrl}}
            style={styles.image}
        />
      
      <View>

        <Text style={{marginTop: 12, fontSize: 20, fontWeight: 'bold', color: '#ff5000', textAlign: 'center'}} > {this.props.user.name} </Text>
        {/*<Text style={{marginTop: 2, fontSize: 16, fontWeight: 'bold', color: '#8c8c8c', textAlign: 'center'}} >  </Text>*/}
        <Text style={{marginTop: 2, fontSize: 16, fontWeight: 'bold', color: '#8c8c8c', textAlign: 'center'}} > {this.props.user.email} </Text>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 6}}>
          <TouchableHighlight onPress={() => {}} style={{width: 50, height: 80, marginLeft: 49}}>
            <Image
              source={{ uri: 'http://i.hizliresim.com/dPP4Br.png' }}
              style={{width: 50, height: 80}}
            />
          </TouchableHighlight>
          
          <TouchableHighlight onPress={() => {
              this.navigate(EventList, 'My Events');
            }} style={{width: 50, height: 80}}>
            <Image
              source={{ uri: 'http://i.hizliresim.com/j88z6j.png' }}
              style={{width: 50, height: 80}}
            />
          </TouchableHighlight>
          
          <TouchableHighlight onPress={() => {
            this.navigate(EventList, 'Attended Events');
            }} style={{width: 50, height: 80}}>
            <Image
              source={{ uri: 'http://i.hizliresim.com/p00vbq.png' }}
              style={{width: 50, height: 80}}
            />
          </TouchableHighlight>
          
          <TouchableHighlight onPress={() => {
            this.props.navigator.pop();
            }} style={{width: 50, height: 80, marginRight: 49}}>
            <Image
              source={{ uri: 'http://i.hizliresim.com/DPPoYl.png' }}
              style={{width: 50, height: 80}}
            />
          </TouchableHighlight>
          
        

      
      </View>
            </View>
             </View>
               
        );
    }
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 4 * height / 7,
  }
});

export default connect(store => {
  return {
    user: store.user
  }
})(Profile);