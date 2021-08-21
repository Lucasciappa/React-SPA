import React from 'react';
import {mount} from "enzyme";
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';


describe('Pruebas en <DashboardRoutes />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user:{
            logged: true,
            name: "Lucas"
        }
    }

    test('debe de mostarse correctamente', () => {

        const wrapper = mount(
            <AuthContext.Provider value = {contextValue}>
                <MemoryRouter>
                    <DashboardRoutes/>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find(".text-info").text().trim()).toBe("Lucas")

 
    });

});
    