import React from 'react';
import {mount} from "enzyme";
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en <PrivateRoute/>', () => {

    const props = {
        location: {
            pathname: "/marvel"
        }
    }

    Storage.prototype.setItem = jest.fn()

    test('debe de mostrar el comonente si está autenticado y guardar en el localStorage ', () => {       

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated= {true}
                    component= {() => <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );

        // console.log(wrapper.html());
        expect(wrapper.find("span").exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", props.location.pathname);

    })

    test('debe de bloquear el componente si no está autenticado', () => {       

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated= {false}
                    component= {() => <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );

        expect(wrapper.find("span").exists()).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", props.location.pathname);


    })
    
    
})
