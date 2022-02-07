import React, { useState, useEffect, useContext } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import { baseLoaded, baseLoading, changeLocation } from '.';

const initialState = {
    isLoaded: false,
    isLoading: false,
    data: [],
    currentPage: 1,
    search: {
        value: "",
        result: []
    }
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
        },

        searchTeams: (state, action) => {
            let newItems = state.data.filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase()));
            return {
                ...state,
                search: {
                    value: action.payload,
                    result: newItems
                }
            }
        }
    }
})



const { teamsLoading, teamsLoaded, teamsPageChanged, searchTeams } = teamsSlice.actions;



export const getTeamsList = (id) => async dispatch => {
    console.log('loading teams');
    const url = `http://api.football-data.org/v2/competitions/${id}/teams`;
    const response = await fetch(url, {
        headers: {
            "X-Auth-Token": "38bb37f55e8f4248b8833e690bf33edb"
        }
    });
    dispatch(teamsLoading());
    let data = await response.json();
    if ("errorCode" in data) {
        console.log("data error");
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
export { teamsLoading, teamsLoaded, teamsPageChanged, searchTeams }
export const teamsReducer = teamsSlice.reducer;