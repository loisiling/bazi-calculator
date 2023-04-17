import React from 'react';
import './calendarStyle.css'
import moment from "moment";
import Calendar from 'react-calendar';

const Calendar12Months = (props) => {

    const startYear = props.year;
    const startMonth = props.month;
    const startIndex = props.index;
    const veryGoodDays = props.veryGoodDays
    const veryBadDays = props.veryBadDays
    const openDays = props.openDays
    const averageDays = props.averageDays
    const auspiciousHourGood = props.auspiciousHourGood
    const auspiciousHourOpen = props.auspiciousHourOpen

    console.log("props auspiciousHourGood", auspiciousHourGood);
    console.log("props auspiciousHourOpen", auspiciousHourOpen);

    return (
        <div className="month">
            <Calendar
                defaultActiveStartDate={new Date(startYear, startMonth, 1)}
                tileClassName={({ date, view }) => {
                    if (veryGoodDays[startIndex].find(x =>
                        x === moment(date).format("DD-MM-YYYY"))) {
                        return 'highlight'
                    } else if (veryBadDays[startIndex].find(x =>
                        x === moment(date).format("DD-MM-YYYY"))) {
                        return 'highlight2'
                    } else if (openDays[startIndex].find(x =>
                        x === moment(date).format("DD-MM-YYYY"))) {
                        return 'hightlight3'
                    } else if (averageDays[startIndex].find(x =>
                        x === moment(date).format("DD-MM-YYYY"))) {
                        return 'highlight4'
                    }
                }}
            />
            <br></br>
            <div className='auspiciousHour'>
                The following table shows the auspicious hours for this month's very auspicious days:
                <br></br>
                <table className='table1'>
                    <tr>
                        <th> Level of Auspicious</th>
                        <th> Date </th>
                        <th> Auspicious Hours</th>
                    </tr>
                    {auspiciousHourGood[startIndex].map((val, key) => {
                        return (
                            <tr className='goodhour' key={key}>
                                <td style={{color: '#F08080', fontWeight: 'bold'}}>Very Auspicious</td>
                                <td>{val[0]}</td>
                                <td>{val[1]}</td>
                            </tr>
                        )
                    })}
                    {auspiciousHourOpen[startIndex].map((val, key) => {
                        return (
                            <tr className='openHour' key={key}>
                                <td style={{color: '#ce8b8b', fontWeight: 'bold'}}>Auspicious</td>
                                <td>{val[0]}</td>
                                <td>{val[1]}</td>
                            </tr>
                        )
                    })}
                </table>
                <br></br>
            </div>
        </div>
    )
}

export default Calendar12Months;