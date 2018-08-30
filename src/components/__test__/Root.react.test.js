import Root from '../Root.react'

import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { User } from '../../omapp/model'
import * as omapp from '../../omapp/omapp'

Enzyme.configure({adapter:new Adapter()})

describe('signupWithGoogle()', ()=> {

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
    })

    it('El usuario de prueba debe tener los mismos datos que el usuario guardado en el componente', () => {
        const wrapper = Enzyme.shallow(<Root/>)
        return wrapper.instance().signupWithGoogle()
        .then(result => {
            const userFromComponent = wrapper.instance().getUser()
            expect(userFromComponent).toEqual(testUser)
        })
    })
})



