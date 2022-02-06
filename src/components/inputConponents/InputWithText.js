import React from 'react';
// import { searchCompetitions } from '../../store/reducers';
import { useDispatch } from 'react-redux';
import { searchCompetitionsAndTeams } from '../../store/reducers';

export const InputWithText = ({strInputValue, data}) => {
    const dispatch = useDispatch();

    return <form>
        <input className='filter' type="text" placeholder='search'
            onChange={(e) => dispatch(searchCompetitionsAndTeams({value: e.target.value, data: data}))}
            value={strInputValue}></input>
    </form>
}