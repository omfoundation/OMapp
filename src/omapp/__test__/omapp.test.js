import * as omapp from '../omapp'

describe('Tests ligados al registro de usuarios mediante Google', () =>{
    let username = 'USERNAME_DE_PRUEBA'

    test('La función omapp.isEmailAlreadyRegistered debe de estar definida', () => {
            expect(omapp.isUsernameAlreadyRegistered).toBeDefined();
    })

    test('El username de un usuario no registrado no debe de estar en la base de datos', () => {
        let username = "usernameNoRegistrado"
        return omapp.isUsernameAlreadyRegistered(username)
        .then( (response) => {
            return expect(response).toBe(false)
        }) 
    })

    test('La función omapp.signupWithGoogle debe de estar definida', () => {
        expect(omapp.signupWithGoogle).toBeDefined()
    })

    test('La función omapp.signupWithGoogle debe registrar al usuario en la base ' + 
            'de datos y devolver un objeto con los datos del usuario', () => {

        return omapp.signupWithGoogle(username)
        .then((result) => {
            expect(result.username).toEqual(username)
        })
    })

    test('Luego de haber registrado al usuario la funcion omapp.isUsernameAlreadyRegistered'
    + ' debe de retornar "true"', () => {
        return omapp.isUsernameAlreadyRegistered(username)
        .then( (response) => {
            return expect(response).toBe(true)
        })           
    })
})

test('El username de un usuario registrado debe de estar en la base de datos', () => {
    let username = "usernameRegistrado"
    return omapp.isUsernameAlreadyRegistered(username)
    .then(response => {
        return expect(response).toBe(true)
    }) 
})