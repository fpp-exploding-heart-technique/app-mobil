import React, {Component} from 'react';
import {View, Navigator} from 'react-native';

import Login from './pages/login'
import Profile from './pages/profile'
import EventMap from './pages/event-map'

import { Provider } from 'react-redux'
import store from './redux/store'

import {connect} from 'react-redux'


class App extends Component {
    
    renderScene (route, navigator) {
        return (<route.component navigator={navigator} {...route.passProps}/>);
    }

    render() {
        let r = store.loggedIn ? EventMap : Login;

        return (
            <Provider store={store}>
                <Navigator
                    initialRoute={{component: r}}
                    configureScene={() => {
                        return Navigator.SceneConfigs.FloatFromRight;
                    }}
                    renderScene={this.renderScene}/>
            </Provider>
        );
    }
}

export default App;