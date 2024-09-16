import React from "react";
import { DatePicker } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";

interface DateRangePickerProps {
    checkIn: CalendarDate | null;
    checkOut: CalendarDate | null;
    onCheckInChange: (date: CalendarDate) => void;
    onCheckOutChange: (date: CalendarDate) => void;
    isInvalid: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
    checkIn,
    checkOut,
    onCheckInChange,
    onCheckOutChange,
    isInvalid,
}) => {
    return (
        <div className="p-4 flex gap-4">
            <DatePicker
                label="Check-in"
                className="max-w-[200px]"
                value={checkIn}
                onChange={onCheckInChange}
                isInvalid={isInvalid}
            />
            <DatePicker
                label="Check-out"
                className="max-w-[200px]"
                value={checkOut}
                onChange={onCheckOutChange}
                isInvalid={isInvalid}
            />
        </div>
    );
};

export default DateRangePicker;
