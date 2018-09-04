import * as omapp from '../omapp'
import {auth, db} from '../../constants'
import { mockDb, mockAuth, mockUsers } from './mock-constants'
import { User } from '../model'

describe('Tests ligados al registro de usuarios mediante Google', () =>{

    auth.signInWithPopup = mockAuth.signInWithPopup

    db.collection = mockDb.collection
   
    test('La función omapp.getUserInfoFromGoogle debe de estar definida', () => {
        expect(omapp.getUserInfoFromGoogle).toBeDefined()
    })

    test('La función omapp.getUserInfoFromGoogle devolver la informacion de usuario mock', 
    () => {
        let expectedUserInfo = new User()

        expectedUserInfo.setEmail(mockUsers['mock@gmail.com'].email)
        expectedUserInfo.setName(mockUsers['mock@gmail.com'].name)
        expectedUserInfo.setProfilePhotoURL(mockUsers['mock@gmail.com'].profilePhotoURL)

        return omapp.getUserInfoFromGoogle('mock@gmail.com')
        .then( user => {
            expect(user).toEqual(expectedUserInfo)
        })
    })

    test('La función omapp.signupUser debe de estar definida', () => {
        expect(omapp.signupUser).toBeDefined()
    })

    test('La funcion omapp.signupUser debe devolver true al registrar con éxito el usuario en la base de datos', () => {
        return omapp.signupUser(mockUsers['mock@gmail.com'])
        .then( (response) => {
            return expect(response).toBe(true)
        })           
    })
})