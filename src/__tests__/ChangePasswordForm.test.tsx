/**
 * @jest-environment jsdom
 */
import React from "react";
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor, screen, act, getByText } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import ChangePasswordForm from '../Components/Forms/ChangePasswordForm';


describe('ChangePasswordForm', () => {

  it('renders component', () => {
    const result = render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider>  
    );
    expect(result).toBeTruthy();
  });

  it('renders title', () => {
    const {getByText} = render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider>  
    )
    expect(getByText("Cambio password")).toBeTruthy()
  });

  it('renders button', () => {
     render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider> 
     );
    const button = screen.getByRole(/Button/i, {
        name: 'Cambia password',
    });
    expect(button).toBeTruthy()
  });

  it('renders new password field', () => {
   const result = render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider>  
    );
    const field = document.querySelector("input[id='Nuova password']")
    expect(field).toBeTruthy()
  });

  it('renders confirm new password field', () => {
   const result = render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider>  
    );
    const field = document.querySelector("input[id='Conferma password']")
    expect(field).toBeTruthy()
  });

  it('click button and show errors',async () => {
    const result = render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider>  
        );
        const button = screen.getByRole(/Button/i, {
            name: 'Cambia password',
        });
        fireEvent.click(button);
        await waitFor(async () => {
            const errors = result.getAllByText("Password non corretta");
            expect(errors.length).toEqual(2)
        });

    })

  it('fill inputs and click button', async () => {
    const result = render(
        <Provider store={store}>
            <Router>
                <ChangePasswordForm />
            </Router>
        </Provider>  
        );

    const newPassword = document.querySelector("input[id='Nuova password']")
    fireEvent.change(newPassword!, { target: { value: "Test_Cognito_2.!" } });
    await waitFor(() => {
        expect(newPassword).toHaveValue("Test_Cognito_2.!");
    });

    const confirmPassword = document.querySelector("input[id='Conferma password']")


    result.findByRole("button").then(async button => {
        button.click();
        await waitFor(async () => {
            expect(jest.fn()).toBeCalledTimes(1);
            expect(result).toBeUndefined();
            expect(newPassword).toBeUndefined();
            expect(confirmPassword).toBeUndefined();
            expect(confirmPassword).toBeUndefined();
        });
    })

    })
});
 


