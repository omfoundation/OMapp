import * as omapp from '../omapp'
import {auth, provider, db} from '../../constants'

describe('Registro de un usuario ', () =>{
    let username = 'USERNAME_DE_PRUEBA'

    auth.signInWithPopup = null;

    db.collection = null;

    let mockedDB =[]
    
    beforeAll( () => {

        auth.signInWithPopup = function(){
            let result = {
                user: {
                        email: 'mock@gmail.com',
                        emailVerified: true,
                        photoURL: 'http://lucarobertonotes.altervista.org/wp-content/uploads/2017/04/firebase-authentication-logo1.png'
                }
            }
            return new Promise((resolve) => resolve(result))
        }

        db.collection =  function(){
            return {
            db: mockedDB,
            doc: function(docId){
                let db = this.db
                return {
                    get: function(){

                        let doc;

                        if(docId === "usernameRegistrado"){
                            doc = {
                                email:"luis.morin@gmail.com",
                                username: "lamorin",
                                profilePhotoURL: "http://www.smashingphotoz.com/wp-content/uploads/2012/11/11_cat_photos.jpg"
                            }
                        }else{
                            doc = db[docId]
                        }

                        if (doc === undefined) {
                            doc = {exists: false}
                        }
                        else{
                            doc.exists = true;
                        }

                        return new Promise((resolve) => {
                            resolve(doc)
                        })
                    },
                    set(doc){
                        db[doc.username] = doc
                        return {
                            then: (callback) => {
                                callback()
                            }
                        }
                    }
                }
            }
        } 
    }     
    })

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