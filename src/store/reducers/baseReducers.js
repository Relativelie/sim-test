import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoaded: false,
    isLoading: false,
    currentPage: 1,
    search: {
        value: "",
        result: []
    },
    itemsPerPage: 10,
}


const baseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        baseLoading: state => {
            return {
                ...state,
                isLoading: true
            }
        },

        baseLoaded: state => {
            return {
                ...state,
                isLoading: false,
                isLoaded: true
            }
        },

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
                search: {
                    value: action.payload.value,
                    result: newItems
                }
            }
        },

        changeCurrentPage: (state, action) => {
            console.log(action)

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
        }
    }
})


const { baseLoading, baseLoaded, pageChanged, searchCompetitionsAndTeams, changeCurrentPage, changeGroupOfPage } = baseSlice.actions;
export { baseLoading, baseLoaded, pageChanged, searchCompetitionsAndTeams, changeCurrentPage, changeGroupOfPage }
export const baseReducer = baseSlice.reducer;