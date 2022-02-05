import React, { useState, useEffect } from 'react';
import { Pagination } from './Pagination';
import { Data } from './Data';
import { InputWithDates } from './inputConponents/InputWithDates';

export function Matches({ values }) {
    const [matchesData, setMatchesData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const url = `http://api.football-data.org//v2/competitions/2003/matches?dateFrom=2021-01-01&dateTo=2021-12-31`;
            const response = await fetch(url, {
                headers: {
                    "X-Auth-Token": "38bb37f55e8f4248b8833e690bf33edb"
                }
            });
            const data = await response.json();
            setMatchesData(data.matches);
        }
        fetchData()

    }, [])

    return (
        <div>
            <form className='dateFiltersContainer'>
                <InputWithDates
                    changeValue={values.changeInputDateValue}
                    inputValue={values.inputDateFromValue}
                    inputType={"From"} />
                <InputWithDates
                    changeValue={values.changeInputDateValue}
                    inputValue={values.inputDateToValue}
                    inputType={"To"} />
            </form>
            <div>
                <Data
                    currentElements={values.currentItems(matchesData)[0]}
                    changePage={values.changePage}
                    componentName={"matches"} />
                <Pagination
                    itemsPerPaginateSheet={values.itemsPerPaginateSheet}
                    totalContests={values.currentItems(matchesData)[1]}
                    paginate={values.paginate}
                    currentPage={values.currentPaginateSheet}
                    changeGroupOfItems={values.changeGroupOfItems}
                />
            </div>
        </div>
    )
}