
import { authReducer } from "../../Auth/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {
    
    test('debe de retornar el estado por defecto', () => {
        
        const user = {logged: false}

        const state = authReducer(user, {});
        
        expect(state).toEqual(user);
        
    })


    test('debe de autenticar y colocar el name del user', () => {

        const user = {
            logged: false
         }

        const action = {
            type: types.login,
            payload: {
                name: "Hernan"
            }
        }

        const state = authReducer(user, action);

        expect(state).toEqual({
            logged: true,
            name: "Hernan"
        });

        
    })


    test('debe de borrar el name del user y logged false', () => {
        
        const user = {
            logged: true,
            name: "Hernan"
        }
        
        const action = {
            type: types.logout
        }

        const state = authReducer(user, action);

        expect(state).toEqual({
            logged: false
        });

    })

    


})
