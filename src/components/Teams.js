import React, { useState, useEffect } from 'react';
import { Pagination } from './Pagination';
import { Data } from './Data';
import { InputWithText } from './inputConponents/InputWithText';


export function Teams({ values }) {


    const [teamsData, setTeamsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const url = `http://api.football-data.org/v2/competitions/2000/teams`;
            const response = await fetch(url, {
                headers: {
                    "X-Auth-Token": "38bb37f55e8f4248b8833e690bf33edb"
                }
            });
            setLoading(true);
            const data = await response.json();
            setLoading(false);
            setTeamsData(data.teams);
        }
        fetchData()

    }, [])


    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <div>
                <InputWithText
                    changeInputValue={values.changeInputValue}
                    strInputValue={values.strInputValue} />
                <div>
                    <Data
                        currentElements={values.currentItems(teamsData, "teams")[0]}
                        changePage={values.changePage}
                        componentName={"teams"} />
                    <Pagination
                        itemsPerPaginateSheet={values.itemsPerPaginateSheet}
                        totalContests={values.currentItems(teamsData, "teams")[1]}
                        paginate={values.paginate}
                        currentPage={values.currentPaginateSheet}
                        changeGroupOfItems={values.changeGroupOfItems}
                    />
                </div>
            </div>
        </div>
    )
}