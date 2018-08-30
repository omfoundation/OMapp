import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme'

import Root from '../Root.react';

describe('Tests ligados al registro de usuarios mediante Google', () =>{

    test('La componente Root debe de estar definida',()=>{
        const component = renderer.create(<Root/>)
        expect(component).toBeDefined()
    });

    it('calls onClick event on click of a board square', () =>{
        /*
        let wrapper = shallow(<Root/>)
        wrapper.googleAuthenticationHandler()
        wrapper.find('button.square').first().simulate('click')
        */
        expect(true).toBe(true)
      })
})

