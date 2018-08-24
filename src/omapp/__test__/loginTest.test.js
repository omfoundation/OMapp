import * as omapp from '../omapp'

describe('tests de login usando email y password', ()=>
    {
        let email = 'luis.morin@gmail.com';
        let password = '1234567';

        beforeAll(
            () => {
        
            }
        )

        test('TEST - Login usando email y password', ()=>
            {
                return omapp.signInWithEmailPromise(email, password)
                .then(response =>
                    {
                        expect(response.success).toBe(false)
                    }
                )
            }
        )
    }
)



test('User',()=>{
    //expect(homeJson).toMatchSnapshot();

    var user;

    //expect(user).not.toBeDefined();
});