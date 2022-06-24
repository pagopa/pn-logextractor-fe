
/**
 * @jest-environment jsdom
 */

import React from "react";
import 'regenerator-runtime/runtime'
import { fireEvent, render, waitFor, screen, act } from '@testing-library/react';
import LoginPage from '../Pages/LoginPage';
import 'regenerator-runtime/runtime'
import { reducer } from "./testReducer";

describe('LoginPage', () => {

  beforeEach(() => {
      reducer(<LoginPage setEmail={jest.fn()}/>)
    });

  it('renders LoginPage', () => {
    expect(document.querySelector("form")).toBeDefined();
  });

  it("includes change password form", () => {
    expect(screen.findByText("Cambio password")).toBeTruthy();
  });


});
 


