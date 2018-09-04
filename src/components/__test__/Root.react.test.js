import Root from '../Root.react'

import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { User } from '../../omapp/model'


import {auth, provider, db} from '../../constants'
import * as omapp from '../../omapp/omapp'

Enzyme.configure({adapter:new Adapter()})

describe('signupWithGoogle()', ()=> {

   auth.signInWithPopup = null;

    db.collection = null;

    let mockedDB =[]
    
    let testUser = null
    
    beforeAll(function(){
        testUser = new User()
        testUser.email = 'test@gmail.com'
        testUser.profilePhotoURL = 'testProfilePhotoURL'

        let promise = new Promise((resolve) => {
            resolve(testUser)
        })

        omapp.getUserInfoFromGoogle = jest.fn()
        .mockReturnValue(promise)




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

    it('El usuario de prueba debe tener los mismos datos que el usuario guardado en el componente', () => {
        const wrapper = Enzyme.shallow(<Root/>)
        return wrapper.instance().signupWithGoogle()
        .then(result => {
            const userFromComponent = wrapper.instance().getUser()
            expect(userFromComponent).toEqual(testUser)
        })
    })

    it('El usuario de prueba debe tener los mismos datos que el usuario guardado en el componente', () => {
        const wrapper = Enzyme.shallow(<Root/>)
        return wrapper.instance().signupWithGoogle()
        .then(result => {
            const userFromComponent = wrapper.instance().getUser()
            userFromComponent.username = "testUsername"
            wrapper.instance().signupUser(userFromComponent)
            expect(userFromComponent).toEqual(wrapper.instance().getUser())
        })
    })


})