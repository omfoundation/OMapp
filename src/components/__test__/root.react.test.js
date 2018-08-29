import React from 'react';
import renderer from 'react-test-renderer';

import Root from '../Root.react';

describe('Tests ligados al registro de usuarios mediante Google', () =>{
    test('La componente Root debe de estar definida',()=>{
        const root = renderer.create(<Root/>);
        expect(root).toBeDefined();
    });
})

