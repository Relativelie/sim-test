import React, { useState, useEffect } from 'react';
import { Pagination } from './Pagination';
import { Data } from './Data';
import { Errors } from './Errors';
import { InputWithText } from './inputConponents/InputWithText';
import { useDispatch, useSelector } from 'react-redux';
import { getCompetitionsList } from '../store/reducers';


export function Competitions() {

    const dispatch = useDispatch();

    const [sheetName] = useState('competitions');
    const { data, isLoading, isLoaded, } = useSelector((sheets) => sheets[sheetName]);
    const [baseSheet] = useState('base');
    const { search, currentPage, itemsPerPage } = useSelector((baseSheets) => baseSheets[baseSheet])

    useEffect(() => {
        if (!isLoaded && !isLoading) {
            dispatch(getCompetitionsList());
        }
    })

    if (isLoading) {
        return <h2 className='loading'>Loading...</h2>;
    }

    let competitions = data;
    if (search.value !== "") {
        competitions = search.result;
    }

    if (data.length === 0) {
        return <Errors errorType={"systemError"} />
    }

    const indexOfLastContest = currentPage * itemsPerPage;
    const indexOfFirstContest = indexOfLastContest - itemsPerPage;

    return (
        <div>
            <h1>Competitions</h1>
            <InputWithText
                strInputValue={search.value}
                data={data} />
            <div>
                <Data
                    currentElements={competitions.slice(indexOfFirstContest, indexOfLastContest)}
                    componentName={"competitions"} />
                <Pagination
                    itemsPerPaginateSheet={itemsPerPage}
                    totalContests={competitions.length}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
}
