import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoaded: false,
    isLoading: false,
    data: [],
    valueFrom: "",
    valueTo: ""
}

const matchesSlice = createSlice({
    name: 'matches',
    initialState,
    reducers: {
        matchesLoading: state => {
            return {
                ...state,
                isLoading: true
            }
        },
        matchesLoaded: (state, action) => {
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                data: action.payload
            }
        },
        matchesPageChanged: (state, { pageNumber }) => {
            return {
                ...state,
                currentPage: pageNumber
            }
        }
    }
})


const { matchesLoading, matchesLoaded, matchesPageChanged, addDates } = matchesSlice.actions;


export const getMatchesList = (id) => async dispatch => {

    const url = `http://api.football-data.org//v2/competitions/${id}/matches`;
    const response = await fetch(url, {
        headers: {
            "X-Auth-Token": `${process.env.REACT_APP_API_KEY}`
        }
    });

    dispatch(matchesLoading());
    let data = await response.json();
    if ("errorCode" in data) {
        data = [];
    }
    else {
        data = data.matches.map((item => {
            return {
                id: item.id,
                season: {
                    startDate: item.season.startDate,
                    endDate: item.season.endDate
                },
                awayTeam: item.awayTeam.name,
                homeTeam: item.homeTeam.name
            }
        }))
    }
    dispatch(matchesLoaded(data));
}
export { matchesLoading, matchesLoaded, matchesPageChanged, addDates }
export const matchesReducer = matchesSlice.reducer;