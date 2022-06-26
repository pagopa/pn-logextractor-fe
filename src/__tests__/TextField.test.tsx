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
                name: "ipaCode",
                componentType: "textfield",
                label: "IPA Code",
                hidden: false,
                rules: {
                    required: "Error"
                },
                required: false
        }
        render(<TextFieldComponent field={field} onBlur={jest.fn} />);
    });

    it('renders', () => {    
    const component = document.getElementById("IPA Code");
        expect(component).toBeInTheDocument();
    });

})