import React, { useState, useEffect } from 'react';
import './stylesheets/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Competitions } from './components/Competitions';
import { Teams } from './components/Teams';
import { Matches } from './components/Matches';
import { Breadcumps } from './components/Breadcumps';


export function App() {

  const [breadcumbs, setBreadcumbs] = useState(["competitions", "teams"]);
  const [choosenPages, setChoosenPages] = useState(["competitions", "teams"])

  // states for pagination
  const [currentPaginateSheet, setCurrentPaginateSheet] = useState(1);
  const [itemsPerPaginateSheet] = useState(10);

  // states for teams and contest
  const [strInputValue, setStrInputValue] = useState("");

  // states for matches
  const [inputDateFromValue, setInputDateFromValue] = useState("");
  const [inputDateToValue, setInputDateToValue] = useState("");

  // update breadcumbs value where user click on browser back button 
  useEffect(() => {
    window.onpopstate = e => {
      let clicedValue = e.currentTarget.location.pathname;
      clicedValue = clicedValue.substring(1, clicedValue.length);
      if (breadcumbs.indexOf(clicedValue) !== -1) {
        backToPreviousPage(clicedValue)
      }
    }
  })

  const changePage = (name, page) => {
    setChoosenPages(choosenPages => [...choosenPages, page])
    setStrInputValue("");
    setBreadcumbs(breadcumbs => [...breadcumbs, name]);
    setCurrentPaginateSheet(1)
  }

  const backToPreviousPage = (e) => {
    let arrayOfPages = breadcumbs;
    let allNameOfPages = choosenPages;
    let clicedValue = e;
    let indexOfValue = breadcumbs.indexOf(clicedValue) + 1;
    setCurrentPaginateSheet(1);
    if (clicedValue === arrayOfPages[arrayOfPages.length - 1]) return;
    else {
      arrayOfPages.splice(indexOfValue);
      allNameOfPages.splice(indexOfValue);
      setBreadcumbs(arrayOfPages => ([...arrayOfPages]));
      setChoosenPages(allNameOfPages => ([...allNameOfPages]))
    }
  }

  // Filtering all items from page by name
  const elemSearch = (inputValue, allItems) => {
    let newItems = allItems.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()))
    return newItems
  }

  // Change items page
  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPaginateSheet(pageNumber);
  }

  // Change input date value for filter
  const changeInputDateValue = (e, date) => {
    if (date === "from") {
      setInputDateFromValue(e.target.value);
    }
    else setInputDateToValue(e.target.value);
    setCurrentPaginateSheet(1);
  }

  // Change input value for search
  const changeInputValue = e => {
    setStrInputValue(e.target.value);
    setCurrentPaginateSheet(1)
  }

  // next/previous group of paginate sheets
  const changeGroupOfPaginateSheets = (e, operation, allPagesLength) => {
    e.preventDefault();
    let dif = allPagesLength - currentPaginateSheet;
    if (operation === "next") {
      if (dif === 3 || dif === 2) paginate(e, currentPaginateSheet + 2);
      else paginate(e, currentPaginateSheet + 3);
    }
    else {
      if (currentPaginateSheet === 3) paginate(e, currentPaginateSheet - 2);
      else paginate(e, currentPaginateSheet - 3);
    }
  }

  // Get current visible items in one paginate sheet
  const currentItems = (competitionsData, page) => {
    const indexOfLastContest = currentPaginateSheet * itemsPerPaginateSheet;
    const indexOfFirstContest = indexOfLastContest - itemsPerPaginateSheet;
    let filteredCompetitions = page === "teams" || page === "competitions" ?
      elemSearch(strInputValue, competitionsData) : competitionsData;
    const currentContests = filteredCompetitions.slice(indexOfFirstContest, indexOfLastContest);
    const list = [currentContests, filteredCompetitions.length]
    return list
  }


  let valuesForContestAndTeams = {
    changePage: changePage,
    paginate: paginate,
    changeInputValue: changeInputValue,
    itemsPerPaginateSheet: itemsPerPaginateSheet,
    inputValue: strInputValue,
    currentItems: currentItems,
    currentPaginateSheet: currentPaginateSheet,
    changeGroupOfItems: changeGroupOfPaginateSheets
  }

  let valuesForMatches = {
    inputDateFromValue: inputDateFromValue,
    inputDateToValue: inputDateToValue,
    changeInputDateValue: changeInputDateValue,
    currentItems: currentItems,
    itemsPerPaginateSheet: itemsPerPaginateSheet,
    paginate: paginate,
    currentPaginateSheet: currentPaginateSheet,
    changeGroupOfItems: changeGroupOfPaginateSheets
  }

  let pageName = choosenPages[choosenPages.length - 1]
  pageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1, pageName.length);

  return (
    <div className="App">
      <Router>
        <Breadcumps
          choosenPages={choosenPages}
          backToPreviousPage={backToPreviousPage}
          breadcumbs={breadcumbs} />
        <h1>{pageName}</h1>
        <Routes>
          <Route path="/" element={<Competitions />}></Route>
          <Route path="/teams" element={<Teams values={valuesForContestAndTeams} />}></Route>
          <Route path="/matches" element={<Matches values={valuesForMatches} />}></Route>
          <Route path="/teams/matches" element={<Teams values={valuesForContestAndTeams} />}></Route>
        </Routes>
      </Router>
    </div>
  )
}


export default App;
