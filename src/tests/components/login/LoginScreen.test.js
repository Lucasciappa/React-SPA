import React from 'react';
import { mount } from "enzyme";
import "@testing-library/jest-dom";

import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../Auth/AuthContext';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen/>', () => {

    
    const history = {
        replace: jest.fn()
    }
    
    const contextValue = {
        dispatch: jest.fn()
    }
    
    const wrapper = mount(
        <AuthContext.Provider value = {contextValue}>
            <LoginScreen history={history} />
        </AuthContext.Provider>
    );
    
    test('debe de mostrarse correctamente', () => {


        expect(wrapper.find(".container").exists() ).toBe(true);
        expect(wrapper).toMatchSnapshot();
        
    })

    test('debe de realizar el dispatch y la navegacion', () => {


        const handleClick = wrapper.find("button").prop("onClick");

        handleClick();

        expect( contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: "Lucas"
            }
        });

        expect( history.replace ).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath','/dc');
        handleClick();
        expect( history.replace ).toHaveBeenCalledWith('/dc');

                
    })
})