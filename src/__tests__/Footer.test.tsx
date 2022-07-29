/**
 * @jest-environment jsdom
 */
import React from "react";
import 'regenerator-runtime/runtime'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../Components/Footer';

describe('Footer Component', () => {

  it('renders footer', () => {
    const result = render(<Footer/>);
    expect(screen.getByRole("banner")).toBeDefined();
  });

  it('renders footer items', () => {
    const result = render(<Footer/>);
    const items = result.container.querySelectorAll(".MuiTypography-body1")
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("Privacy policy");
    expect(items[1]).toHaveTextContent("Assistenza");
    expect(items[2]).toHaveTextContent("Copyright");
  });
});