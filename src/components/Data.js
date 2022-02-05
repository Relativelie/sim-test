import React from 'react';
import { Link } from 'react-router-dom';
import ball from '../images/ball.png';

export const Data = (props) => {

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
                            <Link to="/teams"><button className="btn" onClick={() => props.changePage(name, "teams")}>Teams</button></Link>
                            <Link to="/matches"><button className="btn" onClick={() => props.changePage(name, "matches")}>Matches</button></Link>
                        </div>
                    </div>
                }

                else if (props.componentName === "teams") {
                    const { id, name, crestUrl } = item;
                    return <div className='results teamItems' key={id}>
                        <div className='aboutTeams'>
                            {crestUrl !== "" ? <img src={crestUrl} alt="flag" /> : <img src={ball} alt="flag" />}
                            <h2>{name}</h2>
                        </div>
                        <div className='btnContainer'>
                            <Link to="/matches"><button className="btn" onClick={() => props.changePage(name, "matches")}>Matches</button></Link>
                        </div></div>

                }
                else {
                    const { id, season, awayTeam, homeTeam } = item;
                    return <div key={id}>
                        <p>{season.startDate}</p>
                        <p>{season.endDate}</p>
                        <p>{awayTeam.name} vs {homeTeam.name}</p>
                        <p></p>
                    </div>
                }
            }))}
        </div>
    )
}