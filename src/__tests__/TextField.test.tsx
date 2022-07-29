/**
 * @jest-environment jsdom
 */
import React from 'react';
import 'regenerator-runtime/runtime'
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'
import TextFieldComponent from '../Components/TextFieldComponent';

describe('Testfield Component', () => {
    let field;
    beforeEach(() => {
        field =  {
                name: "publicAuthorityName",
                componentType: "textfield",
                label: "Codice IPA",
                hidden: false,
                rules: {
                    required: "Error"
                },
                required: false
        }
        render(<TextFieldComponent field={field} onBlur={jest.fn} />);
    });

    it('renders', () => {    
    const component = document.getElementById("Codice IPA");
        expect(component).toBeInTheDocument();
    });

})