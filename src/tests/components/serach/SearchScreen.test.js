import React from 'react';
import { mount } from "enzyme";
import { MemoryRouter, Route } from 'react-router-dom';
import { SerachScreen } from '../../../components/search/SerachScreen';

describe('Pruebas en <SerachScreen />', () => {
   
    test('debe de mostarse correctamente con valores por defecto', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <Route path="/search" component={SerachScreen}/>
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert-info").text().trim() ).toBe("Search a hero");
    
    })

    test('debe de mostrar a batman y el input con el valor del queryString', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <Route path="/search" component={SerachScreen}/>
            </MemoryRouter>
        );

        expect(wrapper.find("input").prop("value") ).toBe("batman");
        expect(wrapper).toMatchSnapshot();

    })
    
    test('debe de mostrar un error si no se encuentra el hero', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman123"]}>
                <Route path="/search" component={SerachScreen}/>
            </MemoryRouter>
        );

        expect(wrapper.find("input").prop("value") ).toBe("batman123");
        expect(wrapper.find(".alert-danger").text().trim() ).toBe("There is not a hero with 'batman123'");

    })

    test('debe de llamar el push del history', () => {
        
        const history = {
            push: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <Route 
                    path="/search" 
                    component={() => <SerachScreen history = {history} />}
                />
            </MemoryRouter>
        );

        wrapper.find("input").simulate("change", {
            target: {
                name: "searchText",
                value: "batman"
            }
        })

        wrapper.find("form").prop("onSubmit")({ 
            preventDefault(){}
        });

        expect(history.push).toHaveBeenCalledWith("?q=batman")

    })
    


});
