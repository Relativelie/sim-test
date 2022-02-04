import React from 'react';
import {Link} from 'react-router-dom';
import ball from '../images/ball.png';

export const Data = (props) => {

    return (
        <div>
            <div className='resultsContainer'>
                {props.currentElements.map((contest => {

                    if (props.componentName === "competitions") {
                        const { id, name, area, currentSeason } = contest;
                        let dates;
                        let areas;
                        if (currentSeason==null || area==null) {
                            dates = "";
                            areas="";
                        }
                        else {
                            dates = `Held from ${currentSeason.startDate} to ${currentSeason.endDate}`;
                            areas = area.name
                        }
                        return <div className='results competitionItem' key={id}>
                            <div className='aboutCompetition'>
                                <h2>{name}</h2>
                                <div>
                                    <p>{dates}</p>
                                    <p>{areas}</p>
                                </div>
                            </div>
                            <div className='btnContainer'>
                                <Link to="/teams"><button className="btn" onClick={(e) => props.changePage(id, name, "teams")}>Teams</button></Link>
                                <Link to="/matches"><button className="btn" onClick={(e) => props.changePage(id, name, "matches")}>Matches</button></Link>
                            </div>
                        </div>
                    }
                    else if (props.componentName === "teams") {
                        const { id, name, crestUrl } = contest;
                        let flagImage;
                        if (crestUrl==null) {
                            flagImage = ball;
                        }
                        else {
                            flagImage = crestUrl;
                        }
                        return <div className='results' key={id}>
                            <p>{name}</p>
                            <img src={flagImage} alt="flag"/>
                            <Link to="/matches"><button onClick={() => props.changePage(id, name, "matches")}>Matches</button></Link>
                        </div>

                    }
                    else {
                        const { id, season, awayTeam, homeTeam } = contest;
                        return <div key={id}>
                            <p>{season.startDate}</p>
                            <p>{season.endDate}</p>
                            <p>{awayTeam.name} vs {homeTeam.name}</p>
                            <p></p>
                        </div>
                    }
                }))}
            </div>
        </div>
    )
}