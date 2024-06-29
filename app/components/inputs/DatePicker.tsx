'use client';

import React from "react";
import Calendar from "react-calendar";
import '../../styles/Calendar.css';

interface DatePickerProps {
    value: Date,
    onClickDay: (value: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onClickDay
}) => {

    return ( 
        <div className="flex justify-center">
            <Calendar
            value={value}
            onClickDay={onClickDay}          
            view='month'/>
        </div>


    );
}
 
export default DatePicker;