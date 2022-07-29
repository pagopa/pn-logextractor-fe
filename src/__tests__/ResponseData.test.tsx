/**
 * @jest-environment jsdom
 */

import React from "react";
import 'regenerator-runtime/runtime'
import { fireEvent, render, waitFor, screen, act, cleanup } from '@testing-library/react';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import ResponseData from '../Components/ResponseData';
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore([]);

describe('ResponseData', () => {

    afterEach(cleanup);
    let store:any;

    beforeEach(() => {
        store = mockStore({
            response: {
                opened: true,
                responseData: {}
            }
        });
    });

    it('renders component', () => {
        const result = render(
            <Provider store={store}>
                <ResponseData />  
            </Provider>
        );
        expect(screen.getByText("Dati di risposta:")).toBeInTheDocument();

    });

});
 


