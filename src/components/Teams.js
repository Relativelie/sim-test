import React, { useState, useEffect, useContext } from 'react';
import { Pagination } from './Pagination';
import { Data } from './Data';
import { InputWithText } from './inputConponents/InputWithText';

import { ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import { getCompetitionsList } from '../store/reducers';
import { getTeamsList } from '../store/reducers/teams';


export function Teams() {


    // const { store } = useContext(ReactReduxContext)
    const dispatch = useDispatch();

    const [sheetName, setSheetName] = useState('teams');
    const { isLoaded, isLoading, data, currentPage, search } = useSelector((sheets) => sheets[sheetName]);

    useEffect(() => {
        if (!isLoaded) {
            dispatch(getTeamsList());
        }
    })


    if (isLoading) {
        return <h2 class="loading">Loading...</h2>;
    }

    let teams = data;
    if (search.value !== "") {
        teams = search.result;
    }

    return (
        <div>
            <div>
                <InputWithText
                    strInputValue={search.value} />
                <div>
                    <Data
                        currentElements={teams.slice(0, 10)}
                        componentName={"teams"} />
                    {/* <Pagination
                        itemsPerPaginateSheet={values.itemsPerPaginateSheet}
                        totalContests={values.currentItems(teamsData, "teams")[1]}
                        paginate={values.paginate}
                        currentPage={values.currentPaginateSheet}
                        changeGroupOfItems={values.changeGroupOfItems}
                    /> */}
                </div>
            </div>
        </div>
    )
}