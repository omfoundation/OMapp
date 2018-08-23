import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../Home.js';

let user = {
    registered: true,
    signupMethod: 'gtest',
    username: 'TestUser',
    email: 'bla@bla.com',
    profilePhotoURL: 'wwww.GatitosSiempreLindos.com/xD',
}

test('Home opened',()=>{
    const homeComp = renderer.create(<Home user={user}/>);

    //expect(homeJson).toMatchSnapshot();
    expect(homeComp).toBeDefined();
});