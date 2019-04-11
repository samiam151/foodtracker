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

    return (
        <DatePicker defaultValue={moment()} size="small" onChange={handleChange} />
    );
};