import React from 'react';
import ReactDOM from 'react-dom';

import TestUtils from 'react-dom/test-utils';
import createComponent from 'react-unit';

import Home from '../Home';

let user = {
    registered: false,
    signupMethod: null,
    username: null,
    email: null,
    profilePhotoURL: null,
}

describe('Home test unit', ()=>{

    it('Component Home defined', function(){
        var component = TestUtils.renderIntoDocument(<Home user={user}/>);
        
        expect(TestUtils.isCompositeComponent(component)).toEqual(true);
    });
})
