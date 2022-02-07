import { createSlice } from '@reduxjs/toolkit';
import { baseLoaded, baseLoading } from '.';


const initialState = {
    data: []
    // currentPage: 1,
    // search: {
    //     value: "",
    //     result: []
    // },
}

const competitionsSlice = createSlice({
    name: 'competitions',
    initialState,
    reducers: {
        competitionsList: (state, action) => {
            return {
                ...state,
                data: action.payload
            }
        }
    }
})



const { competitionsPageChanged, searchCompetitions, competitionsList } = competitionsSlice.actions;

export const getCompetitionsList = () => async dispatch => {
    const url = `http://api.football-data.org/v2/competitions/`;
    const response = await fetch(url, {
        headers: {
            "X-Auth-Token": "38bb37f55e8f4248b8833e690bf33edb"
        }
    });
    dispatch(baseLoading());
    let data = await response.json();
    dispatch(baseLoaded())
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
    dispatch(competitionsList(data));
}

export { competitionsPageChanged, searchCompetitions }
export const rootReducer = competitionsSlice.reducer;