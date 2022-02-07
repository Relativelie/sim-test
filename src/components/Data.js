import React from 'react';
import { Link } from 'react-router-dom';
import ball from '../images/ball.png';
import { useDispatch } from 'react-redux';
import { changeLocation } from '../store/reducers';


export const Data = (props) => {
    const dispatch = useDispatch();

    return (
        <div className='resultsContainer'>
            {props.currentElements.map((item => {
                if (props.componentName === "competitions") {
                    const { id, name, area, currentSeason } = item;
                    return <div className='results competitionItem' key={id}>
                        <div className='aboutCompetition'>
                            <h2>{name}</h2>
                            <div>
                                <p>{currentSeason == null || area == null ? "" : `Held from ${currentSeason.startDate} to ${currentSeason.endDate}`}</p>
                                <p>{currentSeason == null || area == null ? "" : area.name}</p>
                            </div>
                        </div>
                        <div className='btnContainer'>
                            <Link to={`/${id}/teams`}><button className="btn" onClick={() => dispatch(changeLocation({id: id, name: name, type: "teams"}))}>Teams</button></Link>
                            <Link to={`/${id}/matches`}><button className="btn" onClick={() => dispatch(changeLocation({id: id, name: name, type: "matches"}))}>Matches</button></Link>
                        </div>
                    </div>
                }

                else if (props.componentName === "teams") {
                    const { id, name, crestUrl } = item;
                    return <div className='results teamItems' key={id}>
                        <div className='aboutTeams'>
                            {crestUrl !== "" ? <img src={crestUrl} alt="flag" /> : <img src={ball} alt="flag" />}
                            <h2>{name}</h2>
                        </div></div>

                }
                else {
                    const { id, season, awayTeam, homeTeam } = item;
                    return <div key={id}>
                        <p>{season.startDate}</p>
                        <p>{season.endDate}</p>
                        <p>{awayTeam} vs {homeTeam}</p>
                        <p></p>
                    </div>
                }
            }))}
        </div>
    )
}