import { FieldsProperties, FormField, MenuItems } from "../Components/FormFields";

describe('FormFields', () => {
    it('menu items', async() => {
        expect(Object.keys(MenuItems).length).toEqual(6);
    });

    it('fields properties items', async() => {
        expect(Object.keys(FieldsProperties).length).toEqual(14);
    });

    it('FormField Component', async() => {
        const field =  {
            name: "deanonimization",
            componentType: "checkbox",
            label: "Deanonimizzazione dati",
            hidden: false,
        }
        const component = <FormField field={field}  onChange={jest.fn()} value={false}/>
        expect(component).toBeTruthy();
    });

    
})