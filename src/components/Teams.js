import React, { useState, useEffect, useContext } from 'react';
import { Pagination } from './Pagination';
import { Data } from './Data';
import { InputWithText } from './inputConponents/InputWithText';
import { useParams } from 'react-router-dom';

import { ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import { changeLocation, getCompetitionsList } from '../store/reducers';
import { getTeamsList } from '../store/reducers/teams';


export function Teams() {


    // const { store } = useContext(ReactReduxContext)
    const dispatch = useDispatch();

    const [competitionSheet] = useState('competitions');
    const competitions = useSelector((sheets) => sheets[competitionSheet]);

    const [sheetName, setSheetName] = useState('teams');
    const { data, currentPage, search, isLoaded, isLoading } = useSelector((sheets) => sheets[sheetName]);

    const [baseSheet] = useState('base');
    const base= useSelector((baseSheets) => baseSheets[baseSheet])


    let { id } = useParams();


    useEffect(() => {
        if (competitions.data.length === 0) {
            if (!base.isLoaded && !base.isLoading) {
                dispatch(getCompetitionsList(id))
            }
        }
        else {
            if (base.chosenLocation.length < 2) {
                for (let i = 0; i < competitions.data.length; i++) {
                    if (competitions.data[i].id === parseInt(id)) {
                        dispatch(changeLocation({
                            type: "teams", 
                            name: competitions.data[i].name, 
                            id: competitions.data[i].id}));
                    }
                }
            }
            else {
                if (!isLoaded && !isLoading) {
                    const competitionId = base.chosenLocation[1].id;
                    dispatch(getTeamsList(competitionId));
                }
            }

        }
    })
    if (base.chosenLocation.length < 2) {
        return <div><p>не удалось ffff</p></div>
    }

    if (isLoading) {
        return <h2 className="loading">Loading...</h2>;
    }

    let teams = data;
    if (search.value !== "") {
        teams = search.result;
    }
console.log(data)
    if (data.length === 0) {
        return <div><p>не удалось</p></div>
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