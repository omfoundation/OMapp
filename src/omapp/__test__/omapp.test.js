import * as omapp from '../omapp'

describe('Tests ligados al registro de usuarios', () =>
    {
        test('La función omapp.signInWithEmailPromise debe de estar definida', () =>
            {
                expect(omapp.isEmailAlreadyRegistered).toBeDefined();
            }
        )

        test('El email de un usuario no registrado no debe de estar en la base de datos', () =>
            {
                let email = "non-registered@gmail.com"
                return omapp.isEmailAlreadyRegistered(email)
                .then( (response) => {
                    return expect(response).toBe(false)
                }) 
            }
        )

        test('El email de un usuario registrado debe de estar en la base de datos', () =>
            {
                let email = "registered@gmail.com"
                return omapp.isEmailAlreadyRegistered(email)
                .then( (response) => {
                    return expect(response).toBe(true)
                }) 
            }
        )

    }
)