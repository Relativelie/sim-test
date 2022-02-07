import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { rootReducer, teamsReducer } from "./reducers";
import { baseReducer } from './reducers/baseReducers';
import { matchesReducer } from './reducers/matches';


const store = configureStore({
  reducer: {
    competitions: rootReducer,
    teams: teamsReducer,
    matches: matchesReducer,
    base: baseReducer
  },
  middleware: [thunk]
})

export default store