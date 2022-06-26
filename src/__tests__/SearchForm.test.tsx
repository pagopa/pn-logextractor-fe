/**
 * @jest-environment jsdom
 */
import React from "react";
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor, screen, act, cleanup } from '@testing-library/react';
import 'regenerator-runtime/runtime'
import SearchForm from "../Components/Forms/SearchForm";
import { reducer } from "./testReducer";

describe('SearchForm', () => {

  afterEach(cleanup);

    beforeEach(() => {
        reducer(<SearchForm />)
    });

    it('renders component', () => {
      expect(document.querySelector("form")).toBeTruthy()
    });

    it("renders input fields", async () => {
        const ticketNumber = document.querySelector("input[id='Numero Ticket']");
        const fiscalCode = document.querySelector("input[id='Codice Fiscale']");
        const recipientTypeRadionGroup = screen.getByRole("radiogroup");
        const recipientTypeRadionInputs = screen.getAllByRole("radio");
        expect(ticketNumber).toBeTruthy();
        expect(fiscalCode).toBeTruthy();
        expect(recipientTypeRadionGroup).toBeTruthy();
        expect(recipientTypeRadionInputs.length).toEqual(2);
        recipientTypeRadionInputs.forEach(input => {
            expect(input.getAttribute("name")).toEqual("recipientType");
            expect(["PF", "PG"].includes(input.getAttribute("value")!)).toBeTruthy();
        }) 
    });

    it("renders resetta filtri button and not be disabled", () => {
        const button = screen.getByRole("button", {
            name: 'Resetta filtri',
        });
        expect(button).toBeTruthy();
        expect(button.getAttribute('disabled')).toEqual(null);
    });

    it("renders ricerca button and be disabled", () => {
        const button = screen.getByRole("button", {
                name: 'Ricerca',
            });
        expect(button).toBeTruthy();
        expect(button).toHaveAttribute('disabled');
    });

    it("fill fields and click ricerca", async () => {
        const ticketNumber = document.querySelector("input[id='Numero Ticket']");
        const fiscalCode = document.querySelector("input[id='Codice Fiscale']");
        fireEvent.change(ticketNumber!, { target: { value: "abc" } });
        fireEvent.change(fiscalCode!, { target: { value: "MLLSNT82P65Z404U" } });
        const button = screen.getByRole("button", {
                name: 'Ricerca',
            });
        act(() => button.click());
        await waitFor(() => {
            expect(button).not.toHaveClass("Mui-disabled");
      });
    });
});


 


