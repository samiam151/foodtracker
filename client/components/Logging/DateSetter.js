import React, { useEffect } from "react";
import moment from "moment";
import { DatePicker } from "antd";

export const DateSetter = ({setDate, ...props}) => {
    useEffect(() => {
        setDate(moment().format("YYYY-MM-DD"));
    }, []);

    const handleChange = (value) => {
        let newDate = value.format("YYYY-MM-DD");
        console.log(newDate);
        setDate(newDate);
    }

    const disabledDates = (current) => {
        return current > moment().add(1, "days")
    }

    return (
        <DatePicker 
            disabledDate={disabledDates}
            defaultValue={moment()} 
            size="small" 
            onChange={handleChange} />
    );
};