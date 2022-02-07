import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoaded: false,
    isLoading: false,
    data: []
}

const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        teamsLoading: state => {
            return {
                ...state,
                isLoading: true
            }
        },
        teamsLoaded: (state, action) => {
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                data: action.payload
            }
        },

        teamsPageChanged: (state, { pageNumber }) => {
            return {
                ...state,
                currentPage: pageNumber
            }
        }
    }
})



const { teamsLoading, teamsLoaded, teamsPageChanged } = teamsSlice.actions;



export const getTeamsList = (id) => async dispatch => {

    const url = `http://api.football-data.org/v2/competitions/${id}/teams`;
    const response = await fetch(url, {
        headers: {
            "X-Auth-Token": "38bb37f55e8f4248b8833e690bf33edb"
        }
    });
    dispatch(teamsLoading());
    let data = await response.json();
    if ("errorCode" in data) {
        data = [];
    }
    else {
        data = data.teams.map((item => {
            return {
                id: item.id,
                name: item.name,
                crestUrl: item.crestUrl
            }
        }))
    }
    dispatch(teamsLoaded(data));
}
export { teamsLoading, teamsLoaded, teamsPageChanged }
export const teamsReducer = teamsSlice.reducer;