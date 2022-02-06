// import { competitionsLoaded, competitionsLoading } from "../reducers";

// async function fetchData(dispatch) {
//     const url = `http://api.football-data.org/v2/competitions/`;
//     const response = await fetch(url, {
//         headers: {
//             "X-Auth-Token": "38bb37f55e8f4248b8833e690bf33edb"
//         }
//     });
//     dispatch(competitionsLoading());
//     let data = await response.json();
//     data = data.competitions.map((item => {
//         return {
//             id: item.id,
//             name: item.name,
//             area: item.area,
//             currentSeason: {
//                 startDate: item.currentSeason.startDate,
//                 endDate: item.currentSeason.endDate
//             }
//         }
//     }))
//     dispatch(competitionsLoaded(data));
// }

// export const competitionsAction = {
//     getCompetitionsList: () => dispatch => {
//         let data = [
//              {
//                 id: 123,
//                 name: "ttg",
//                 area: "item.area",
//                 currentSeason: {
//                     startDate: "item.currentSeason.startDate",
//                     endDate: "item.currentSeason.endDate"
//                 }
//             }
//         ]
//         dispatch(competitionsLoaded(data));
//     }
// }