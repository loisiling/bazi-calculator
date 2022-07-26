import './App.css';
import Results from "./Results";
import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Routes,
    NavLink
} from "react-router-dom";


export default function HomePage() {

    const [groomBday, setGroomBday] = useState("");
    const [brideBday, setBrideBday] = useState("");
    const [groomName, setGroomName] = useState("");
    const [brideName, setBrideName] = useState("");
    const [reportDuration, setReportDuration] = useState(1);
    const [link, setLink] = useState("")
    // const [submit, setSubmit] = useState(false);

    const updateGroomBday = (e) => {
        setGroomBday(e.target.value)
    }

    const updateBrideBday = (e) => {
        setBrideBday(e.target.value)
    }

    const updateReportDuration = (e) => {
        setReportDuration(e.target.value)
    }

    const updateGroomName = (e) => {
        setGroomName(e.target.value)
    }

    const updateBrideName = (e) => {
        setBrideName(e.target.value)
    }

    // const updateSubmit = () => {
    //     setSubmit(true);
    // }

    return (
        <div className="App">
            <div>
                <label> Groom's Name </label>
                <input name="groomName" type="input" onChange={updateGroomName}></input>
            </div>
            <div>
                <label> Bride's Name </label>
                <input name="brideName" type="input" onChange={updateBrideName}></input>
            </div>
            <div>
                <label> Groom's Birthdate Eg: 01-12-1991 </label>
                <input name="groombday" type="date" onChange={updateGroomBday}></input>
            </div>
            <div>
                <label> Bride's Birthdate: Eg: 01-12-1991 </label>
                <input name="bridebday" type="date" onChange={updateBrideBday}></input>
            </div>
            <div>
                <label> Report Duration: </label>
                <select name="duration" id="duration" onChange={updateReportDuration}>
                    <option value="1"> 1 Year </option>
                    <option value="2"> 2 Years</option>
                </select>
            </div>
            <div>
                <NavLink to={`/results/${groomBday}/${brideBday}/${reportDuration}/${groomName}/${brideName}`}>
                    <button> Submit </button>
                </NavLink>
                {/* <button onClick={updateSubmit}> Submit </button> */}
            </div>
            {/* {submit? <Results groomBday={groomBday} brideBday={brideBday} reportDuration={reportDuration}/> : null } */}
        </div>
    );
}