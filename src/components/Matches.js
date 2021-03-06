import React, { useState, useEffect } from 'react';
import { Pagination } from './Pagination';
import { Data } from './Data';
import { Errors } from './Errors';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation, getCompetitionsList } from '../store/reducers';
import { useParams } from 'react-router-dom';
import { getMatchesList } from '../store/reducers/matches';


export function Matches({ values }) {

    const dispatch = useDispatch();

    const [competitionSheet] = useState('competitions');
    const competitions = useSelector((sheets) => sheets[competitionSheet]);

    const [sheetName] = useState('matches');
    const { data, isLoaded, isLoading } = useSelector((sheets) => sheets[sheetName]);

    const [baseSheet] = useState('base');
    const base = useSelector((baseSheets) => baseSheets[baseSheet])

    let { id } = useParams();


    useEffect(() => {
        if (competitions.data.length === 0) {
            if (!competitions.isLoaded && !competitions.isLoading) {
                dispatch(getCompetitionsList(id))
            }
        }
        else {
            if (base.chosenLocation.length < 2) {
                for (let i = 0; i < competitions.data.length; i++) {
                    if (competitions.data[i].id === parseInt(id)) {
                        dispatch(changeLocation({
                            type: "matches",
                            name: competitions.data[i].name,
                            id: competitions.data[i].id
                        }));
                    }
                }
            }
            else {
                if (!isLoaded && !isLoading) {
                    const competitionId = base.chosenLocation[1].id;
                    dispatch(getMatchesList(competitionId));
                }
            }
        }
    })

    if (isLoading) {
        return <h2 className="loading">Loading...</h2>;
    }

    if (base.chosenLocation.length < 2) {
        return <Errors errorType={"wrongRequest"} />
    }

    let matches = data;
    if (base.search.value !== "") {
        matches = base.search.result;
    }

    if (data.length === 0 && !isLoading) {
        return <Errors errorType={"systemError"} />
    }

    const indexOfLastContest = base.currentPage * base.itemsPerPage;
    const indexOfFirstContest = indexOfLastContest - base.itemsPerPage;


    return (
        <div>
            <h1>Matches</h1>
            <div>
                <Data
                    currentElements={matches.slice(indexOfFirstContest, indexOfLastContest)}
                    componentName={"matches"} />
                <Pagination
                    itemsPerPaginateSheet={base.itemsPerPage}
                    totalContests={matches.length}
                    currentPage={base.currentPage}
                />
            </div>
        </div>
    )
}