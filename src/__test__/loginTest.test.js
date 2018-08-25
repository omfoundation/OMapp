import * as omapp from '../omapp/omapp'

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