import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 1,
    search: {
        value: "",
        result: []
    },
    itemsPerPage: 10,
    chosenLocation: [
        {
            type: "competitions",
            name: "competitions"
        }
    ]
}

const baseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {

        pageChanged: (state, { pageNumber }) => {
            return {
                ...state,
                currentPage: pageNumber
            }
        },

        searchCompetitionsAndTeams: (state, action) => {
            let newItems = action.payload.data.filter(item => item.name.toLowerCase().includes(action.payload.value.toLowerCase()));

            return {
                ...state,
                currentPage: 1,
                search: {
                    value: action.payload.value,
                    result: newItems
                }
            }
        },


        changeCurrentPage: (state, action) => {

            return {
                ...state,
                currentPage: action.payload
            }
        },

        changeGroupOfPage: (state, action) => {

            let maxPage = Math.ceil(action.payload.maxItems / state.itemsPerPage);
            let newPage = state.currentPage + action.payload.pageShift;
            newPage = action.payload.pageShift < 0 ? Math.max(newPage, 1) : Math.min(newPage, maxPage);

            return {
                ...state,
                currentPage: newPage,
            }
        },

        changeLocation: (state, action) => {
            let chosenValue = state.chosenLocation.slice();
            let includedValue = -1;
            for (let i = 0; i < chosenValue.length; i++) {
                if (chosenValue[i].type === action.payload.type) includedValue = i + 1;
            }

            if (includedValue !== -1) {
                chosenValue = chosenValue.slice(0, includedValue);
            }
            else chosenValue.push(action.payload);

            return {
                ...state,
                chosenLocation: chosenValue,
                currentPage: 1,
                search: {
                    value: "",
                    result: []
                }
            }
        }
    }
})


const { baseLoading, baseLoaded, pageChanged, searchCompetitionsAndTeams, changeCurrentPage, changeGroupOfPage, changeLocation, searchMatches } = baseSlice.actions;
export { baseLoading, baseLoaded, pageChanged, searchCompetitionsAndTeams, changeCurrentPage, changeGroupOfPage, changeLocation, searchMatches }
export const baseReducer = baseSlice.reducer;