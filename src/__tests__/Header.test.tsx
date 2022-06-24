
/**
 * @jest-environment jsdom
 */
import React from "react";
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor, screen, act, within } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from '../Components/Header';
import 'regenerator-runtime/runtime'

const email = "test@test.com"

describe('Header Component', () => {

  it('renders header', () => {
    const result = render(
        <Router>
            <Header email={email}/>
        </Router>
    );
    expect(screen.getByRole("banner")).toBeDefined();
  });

  // it('renders header items', () => {
  //   const result = render(
  //       <Router>
  //           <Header email={email}/>
  //       </Router>
  //   );
  //   const textItems = result.container.querySelectorAll(".MuiTypography-body1")
  //   expect(textItems).toHaveLength(2);
  //   expect(textItems[0]).toHaveTextContent("PagoPA S.p.A.");
  //   expect(textItems[1]).toHaveTextContent(email);
  //   const button = result.container.querySelector("button");
  //   expect(button).toBeDefined();
  //   const icon = result.container.querySelector("svg");
  //   expect(icon).toBeDefined();
  // });

  // it('simulate log out button click', async () => {
  //   const result = render(
  //       <Router>
  //           <Header email={email}/>
  //       </Router>
  //   );
  //   const button = screen.getAllByRole("button")[0];
  //   await act(async() => {
  //     button.click();
  //     await waitFor(async () => {
  //       const modal = result.container.querySelector(".uiDialog-container");
  //       expect(modal).toBeDefined();
  //       if(modal){
  //         within(modal as HTMLElement).findAllByRole("button").then(async buttons => {
  //           expect(buttons).toHaveLength(2);
  //           buttons[0].click();
  //             await waitFor(() => {
  //             expect(modal).toBeUndefined();
  //           })
  //         })
  //       }
  //     });
  //   })
    
  // })

  // it('simulate log out', async () => {
  //  jest.setTimeout(10000)
  //  const result = render(
  //      <Router>
  //          <Header email={email}/>
  //      </Router>
  //  );
  //  const button = screen.getAllByRole("button")[0];
  //  await act(async() => {
  //    button.click();
  //    await waitFor(async () => {
  //      const modal = result.container.querySelector(".uiDialog-container");
  //      expect(modal).toBeDefined();
  //      if(modal){
  //         within(modal as HTMLElement).findAllByRole("button").then(async buttons => {
  //           expect(buttons).toHaveLength(2);
  //           buttons[1].click();
  //             await waitFor(() => {
  //               expect(modal).toBeUndefined();
  //               expect(result).toBeUndefined();
  //           })
  //         })
  //       }
  //    });
  //  })
  // })

});
 


