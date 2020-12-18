import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialState={}

//const middleware=[thunk]

const store=createStore(
	rootReducer, 
	initialState, 
	composeEnhancer(applyMiddleware(thunk))
)

export default store