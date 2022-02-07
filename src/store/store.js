import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'; 
import { rootReducer, teamsReducer } from "./reducers";
import { baseReducer } from './reducers/baseReducers';


const store = configureStore({
    reducer: {
        //   competition: competitionReducer,
        competitions: rootReducer,
        //   team: teamReducer,
        teams: teamsReducer,
        //   matches: matchesReducer,
        base: baseReducer
    },
    middleware: [thunk]
})

export default store