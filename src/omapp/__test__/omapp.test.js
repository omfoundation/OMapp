import firebase from 'firebase';

describe('Tests ligados al mock de firebase', ()=>
    {
        test('El objeto "firebase" debe estar definido', () =>
            {
                expect(firebase).toBeDefined();
            }
        )

        test('La funcion "initializeApp()" debe estar definida', () =>
            {
                expect(firebase.initializeApp()).toBeDefined();
            }
        )

    }
)