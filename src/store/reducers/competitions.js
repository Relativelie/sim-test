import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isLoaded: false,
    isLoading: false,
    data: []
}

const competitionsSlice = createSlice({
    name: 'competitions',
    initialState,
    reducers: {
        competitionsLoading: state => {
            return {
                ...state,
                isLoading: true
            }
        },
        competitionsLoaded: (state, action) => {
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                data: action.payload
            }
        }
    }
})



const { competitionsPageChanged, searchCompetitions, competitionsLoading, competitionsLoaded } = competitionsSlice.actions;

export const getCompetitionsList = () => async dispatch => {
    const url = `http://api.football-data.org/v2/competitions/`;
    const response = await fetch(url, {
        headers: {
            "X-Auth-Token": "38bb37f55e8f4248b8833e690bf33edb"
        }
    });
    dispatch(competitionsLoading());
    let data = await response.json();
    data = data.competitions.map((item => {
        return {
            id: item.id,
            name: item.name,
            area: item.area,
            currentSeason: item.currentSeason == null ? null : {
                startDate: item.currentSeason.startDate,
                endDate: item.currentSeason.endDate
            }
        }
    }))
    dispatch(competitionsLoaded(data));
}

export { competitionsPageChanged, searchCompetitions, competitionsLoading, competitionsLoaded }
export const rootReducer = competitionsSlice.reducer;