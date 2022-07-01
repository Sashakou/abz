import {combineReducers, createStore} from "redux";
import account from './account';
import appReducer from "./appReducer";
import { reducer as reduxFormReducer } from 'redux-form';

const reducers = {
    appState: appReducer,
    account,
    form: reduxFormReducer
}
const reducer = combineReducers(reducers);
const store = createStore(reducer);


export default store;