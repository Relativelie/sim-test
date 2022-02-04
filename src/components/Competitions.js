import React, { useState, useEffect } from 'react';
import { Pagination } from './Pagination';
import { Data } from './Data';
import { InputWithText } from './inputConponents/InputWithText';

export function Competitions({ values }) {

    const [competitionsData, setCompetitionsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const url = `http://api.football-data.org/v2/competitions/`;
            const response = await fetch(url, {
                headers: {
                    "X-Auth-Token": "38bb37f55e8f4248b8833e690bf33edb"
                }
            });
            setLoading(true);
            const data = await response.json();
            setLoading(false);
            setCompetitionsData(data.competitions);
        }
        fetchData()

    }, [])

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <InputWithText
                changeInputValue={values.changeInputValue}
                strInputValue={values.strInputValue} />
            <div>
                <Data
                    currentElements={values.currentItems(competitionsData, "competitions")[0]}
                    changePage={values.changePage}
                    componentName={"competitions"} />
                <Pagination
                    itemsPerPaginateSheet={values.itemsPerPaginateSheet}
                    totalContests={values.currentItems(competitionsData, "competitions")[1]}
                    paginate={values.paginate}
                    currentPage={values.currentPaginateSheet}
                    changeGroupOfItems={values.changeGroupOfItems}
                />
            </div>
        </div>
    )
}
