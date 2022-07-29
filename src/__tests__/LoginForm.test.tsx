/**
 * @jest-environment jsdom
 */
import React from "react";
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor, screen, act, cleanup } from '@testing-library/react';
import LoginForm from "../Components/Forms/LoginForm";
import { reducer } from "./testReducer";


describe('LoginForm', () => {

  afterEach(cleanup);

    beforeEach(() => {
        reducer(<LoginForm />)
    });

    it('renders component', () => {
      expect(document.querySelector("form")).toBeTruthy()
    });

    it("renders input fields", () => {
      const email = document.querySelector("input[id='Email']");
      const password = document.querySelector("input[id='Password']");
      expect(email).toBeTruthy();
      expect(password).toBeTruthy();
    });

     it("renders login button", () => {
        const button = document.querySelector("button");
        expect(button).toBeTruthy();
    });

    it("submit form and show errors", async () => {
        const button = document.querySelector("button");
        act(() => button?.click());
        await waitFor(() => {
            const error = document.querySelector("p.Mui-error");
            expect(error?.textContent).toBeTruthy();
        });
    });

    it("fill fields", () => {
      const email = document.querySelector("input[id='Email']");
      const password = document.querySelector("input[id='Password']");
      fireEvent.change(email!, { target: { value: "test@test.com" } });
      fireEvent.change(password!, { target: { value: "I7ph_KKSq+ouL^$7" } });
      expect(email).toHaveValue("test@test.com");
      expect(password).toHaveValue("I7ph_KKSq+ouL^$7");
    });

    it('renders tooltip', () => {
      act(async() => {
        screen.getByText("Password dimenticata?").click();
        await waitFor(() => {
              expect(screen.getByRole("tooltip")).toBeTruthy();
              const email = document.querySelector("input[id='Email']");
              fireEvent.focus(email!);
              expect(screen.getByRole("tooltip")).toBeFalsy();
          });
      })
    });

});


 


