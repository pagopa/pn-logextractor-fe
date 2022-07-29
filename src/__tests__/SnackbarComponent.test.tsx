/**
 * @jest-environment jsdom
 */
import React from "react";
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect';
import * as redux from 'react-redux';
import SnackbarComponent from "../Components/SnackbarComponent";
import { fireEvent, render, waitFor } from "@testing-library/react";
import configureMockStore from 'redux-mock-store'
import { Provider } from "react-redux";
import { Snackbar } from "@mui/material";

const mockStore = configureMockStore([]);

describe('SnackbarComponent  Component', () => {
  let store;
  let component: any;
  beforeEach(() => {
    store = mockStore({
      snackbar: {
        opened: true,
        statusCode: "400"
      }
    });
    
    component = render(
      <Provider store={store}>
        <SnackbarComponent />
      </Provider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    
  });

  it('renders component', () => {
    expect(component.getByRole("alert")).toBeInTheDocument();
  });
  
});
