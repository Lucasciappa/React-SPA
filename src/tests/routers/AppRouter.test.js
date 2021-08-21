import React from 'react';
import {mount} from "enzyme";
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../Auth/AuthContext';

describe('Pruebas en <AppRouter/>', () => {

    test('debe de mostrar el login si no esta autenticado', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user:{
                logged: false
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value = {contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        // console.log(wrapper.html());
        expect(wrapper).toMatchSnapshot();
        
    });

    test('debe de mostrar el componente de Marvel si está autenticado', () => {


        const contextValue = {
            dispatch: jest.fn(),
            user:{
                logged: true,
                name: "Lucas"
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value = {contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper.find(".navbar").exists()).toBe(true);

    })

        

})