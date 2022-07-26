// import { overallArrayList, averageDays, finalOpenDays, finalBadDays, finalVeryGoodDays } from "./bazi-calculator"
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import './Results.css';
import './calendarStyle.css'
import calculator from "./calculator"
import Calendar12Months from './Calendar12Months';
import image1 from "./pictures/pexels-angela-roma-7363747.jpg"
import image2 from "./pictures/pexels-angela-roma-7364202.jpg"
import legend from "./pictures/legend.png"
import example from "./pictures/example.png"
import image3 from "./pictures/pexels-karolina-grabowska-4041357.jpg"
import image4 from "./pictures/pexels-alena-koval-961402.jpg"
function Results() {
    const { groomBday, brideBday, reportDuration, groomName, brideName } = useParams()

    const results = calculator(groomBday, brideBday, reportDuration)

    let sortedResultsVeryGoodDays = [];
    let sortedResultsVeryBadDays = [];
    let sortedResultsOpenDays = [];
    let sortedResultsAverageDays = [];

    // let month1=[];let month2=[]; let month3=[];let month4=[];let month5=[];let month6=[];
    // let month7=[];let month8=[]; let month9=[];let month10=[];let month11=[];let month12=[];   

    for (let i = 0; i < reportDuration * 12 + 1; i++) {
        sortedResultsVeryGoodDays.push([])
        sortedResultsVeryBadDays.push([])
        sortedResultsOpenDays.push([])
        sortedResultsAverageDays.push([])
    }

    let currentMonth = new Date().getMonth(); // July = 6
    let currentYear = new Date().getFullYear(); //2022

    results.finalVeryGoodDays.forEach((x) => {
        let monthValue = x.month
        let dayValue = x.day
        if (dayValue < 10) {
            dayValue = "0" + dayValue
        }
        if (monthValue < 10) {
            monthValue = "0" + monthValue
        }
        const dateValue = dayValue + "-" + monthValue + "-" + x.year
        let arrayIndex = 0
        if (x.year == currentYear) {
            arrayIndex = x.month - currentMonth - 1
        } else if (x.year != currentYear) {
            const monthsThatPassedLastYear = 11 + 12 * (x.year - currentYear - 1) - currentMonth
            arrayIndex = monthsThatPassedLastYear + x.month
        }
        sortedResultsVeryGoodDays[arrayIndex].push(dateValue)
    })


    results.finalOpenDays.forEach((x) => {
        let monthValue = x.month
        let dayValue = x.day
        if (dayValue < 10) {
            dayValue = "0" + dayValue
        }
        if (monthValue < 10) {
            monthValue = "0" + monthValue
        }
        const dateValue = dayValue + "-" + monthValue + "-" + x.year
        let arrayIndex = 0
        if (x.year == currentYear) {
            arrayIndex = x.month - currentMonth - 1
        } else if (x.year != currentYear) {
            const monthsThatPassedLastYear = 11 + 12 * (x.year - currentYear - 1) - currentMonth
            arrayIndex = monthsThatPassedLastYear + x.month
        }
        sortedResultsOpenDays[arrayIndex].push(dateValue)
    })

    results.finalBadDays.forEach((x) => {
        let monthValue = x.month
        let dayValue = x.day
        if (dayValue < 10) {
            dayValue = "0" + dayValue
        }
        if (monthValue < 10) {
            monthValue = "0" + monthValue
        }
        const dateValue = dayValue + "-" + monthValue + "-" + x.year
        let arrayIndex = 0
        if (x.year == currentYear) {
            arrayIndex = x.month - currentMonth - 1
        } else if (x.year != currentYear) {
            const monthsThatPassedLastYear = 11 + 12 * (x.year - currentYear - 1) - currentMonth
            arrayIndex = monthsThatPassedLastYear + x.month
        }
        sortedResultsVeryBadDays[arrayIndex].push(dateValue)
    })

    results.averageDays.forEach((x) => {
        let monthValue = x.month
        let dayValue = x.day
        if (dayValue < 10) {
            dayValue = "0" + dayValue
        }
        if (monthValue < 10) {
            monthValue = "0" + monthValue
        }
        const dateValue = dayValue + "-" + monthValue + "-" + x.year
        let arrayIndex = 0
        if (x.year == currentYear) {
            arrayIndex = x.month - currentMonth - 1
        } else if (x.year != currentYear) {
            const monthsThatPassedLastYear = 11 + 12 * (x.year - currentYear - 1) - currentMonth
            arrayIndex = monthsThatPassedLastYear + x.month
        }
        sortedResultsAverageDays[arrayIndex].push(dateValue)
    })

    let finalCalendar = [];
    let monthValue = currentMonth;
    let yearValue = currentYear

    for (let i = 0; i < reportDuration * 12 + 1; i++) {
        if (yearValue == currentYear) { //2022
            monthValue = currentMonth + i;
        } else {
            monthValue = monthValue + 1
        }
        if (monthValue == 12) { //2023 - Jan
            yearValue = yearValue + 1
            monthValue = 0
        }
        finalCalendar.push(<Calendar12Months year={yearValue} month={monthValue} index={i} veryGoodDays={sortedResultsVeryGoodDays}
            veryBadDays={sortedResultsVeryBadDays} openDays={sortedResultsOpenDays} averageDays={sortedResultsAverageDays} />)
    }

    return (
        <>
            <div className='intro'>
                <img id="image1" src={image1}></img>
                <div className='title'>
                    <h1> PERSONAL AUSPICIOUS DATE SELECTION</h1>
                </div>
                <div className='titlePageContent'>
                    <p> Specially customised for : {groomName} and {brideName}</p>
                </div>
            </div>
            <div className='page2Overall'>
                <div className='page2'>
                    <img id="image2" src={image2}></img>
                </div>
                <div className='page2right'>
                    <div className='page2Title'>
                        <p> Start Your Marriage On The Right Foot!</p>
                    </div>
                    <div className='page2Content'>
                        <h2> What date constitutes the marriage date? </h2>
                        <p> According to the Cosmic Trinity, Heaven comes first, followed by Earth then Man. Hence when it comes to selecting the marriage date, an auspicious date should be selected for both the religious and legal registration of the marriage. If you’re not religious, the date of the legal ceremony (ROM) would matter most in selecting an auspicious date, followed by the date of the wedding banquet and tea ceremony. </p>
                        <h2>How to read this report?</h2>
                        <p>The subsequent pages in the report contain the auspicious dates for your wedding in the form of a calendar view. Each day has a circle that indicates if the day is very auspicious, auspicious, average or inauspicious. The dates are selected specifically to your birth dates and Bazi. </p>
                        <p>You should chose the the wedding dates that suits your needs based on the following order: Very Auspicious , Auspicious , Average , Inauspicious</p>
                    </div>
                </div>
            </div>
            <div className='page4Overall'>
                <img id='image4' src={image4}></img>
                <div className='page3Content'>
                    The table belows shows the legend that you should refer to when reading the calendar:
                </div>
                <img id='legend' src={legend}></img>
                <div className='page4Content'>
                    The example belows shows how to read the calendar:
                </div>
                <img id='example' src={example}></img>
            </div>
            <div className='page3Overall'>
                <img id='image3' src={image3}></img>
                <div className='contentForSubsequentPages'>
                    The subsequent pages of the report shows the calendar for
                    the next {reportDuration*12} months. Each and every day 
                    has a color to indicate whether the day is suitable to be
                    selected as your wedding date and it is personalised based 
                    on your birthdates.
                    <br></br>
                    <br></br>
                    We hope that this auspicious date calendar will help you start
                    your marriage on the right foot and wishing you a blissful marriage
                    ahead.
                    <br></br>
                    <br></br>
                    If you would like to have a personal Bazi-reading done by our 
                    master, you can check out: www.jeffchiabazi.com
                </div>
            </div>
            <div>
                {finalCalendar.map((monthlyResults, index) => (
                    <div key={index}>{monthlyResults}</div>
                ))}
            </div>
        </>
    )
}

export default Results;