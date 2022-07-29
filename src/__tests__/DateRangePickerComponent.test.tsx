/**
 * @jest-environment jsdom
 */
import React from "react";
import 'regenerator-runtime/runtime'
import { fireEvent, render, waitFor, screen, act } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import DateRangePickerComponent from "../Components/DataRangePickerComponent";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarPickerView } from "@mui/lab";

/**
 * @typedef {Object} DatePicker
 */
type DatePicker = {
    /**
     * label of the field
     */
    label: string,
    /**
     * calendar type
     */
    view: CalendarPickerView[],
    /**
     * value of the field if there is any
     */
    value: string,
}

const datePickers:Array<DatePicker>  = [
        {
            label: "Dal",
            view:["day"],
            value:"2022-04-20"
        },
        {
            label: "Al",
            view:["day"],
            value:"2022-06-20"
        }
]

describe('DateRangePickerComponent', () => {

  it('renders component', () => {
    const result = render(
        <Router>
            <DateRangePickerComponent datePickers={datePickers} onChange={jest.fn()} required={true} onBlur={jest.fn()} />
        </Router>
    );
    expect(result).toBeDefined();
  });

  it('test on change', async () => {
    render(<DateRangePickerComponent datePickers={datePickers} onChange={() => console.log("change")} required={true} onBlur={jest.fn()} />);
    const logSpy = jest.spyOn(console, 'log')
    screen.findByLabelText("Dal").then(async(textfield) => {
      expect(textfield).toBeTruthy()
      fireEvent.change(textfield!, { target: { value: "2022-05-20" } });
      await waitFor(() => {
        expect(jest.fn()).toHaveBeenCalled();
        expect(logSpy).toBeCalled();
        expect(textfield).toHaveValue("2022-05");
      });
    });    
  });
});

 

