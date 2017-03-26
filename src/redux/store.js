import {createStore, applyMiddleware, compose} from 'redux'

import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import {AsyncStorage} from 'react-native'

import reducers from './reducers'

const middleware = applyMiddleware(thunk);
const store = createStore(reducers, undefined, compose(middleware, autoRehydrate()));
persistStore(store, {storage: AsyncStorage});

export default store;
