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
            </div>
    )
}

export default Calendar12Months;