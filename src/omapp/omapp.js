import {auth, provider, db} from '../constants'
import { User } from './model';

export function isUsernameAlreadyRegistered(username){
    return new Promise((resolve) => {
        db.collection('users').doc(username).get()
        .then((doc) => { 
            if(doc.exists){
                console.log('dentro de isUsernameAlreadyRegistered: true')
                resolve(true)
            }
            else{
                console.log('dentro de isUsernameAlreadyRegistered: false')
                resolve(false)
            }
        })
        .catch(error => console.log(error))
    })
}

export function signInWithGooglePromise() {

    return new Promise(function(resolve, reject) {
        auth.signInWithPopup(provider)
        .then((result) => {
            db.collection('users').doc(result.user.username).get()
                .then((doc) => {
                    resolve({
                        email: result.user.email,
                        username: doc.username,
                        signupMethod: doc.signupMethod,
                        registered: true,
                        profilePhotoURL: doc.profilePhotoURL
                    })
                });
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

export function signInWithEmailPromise(email, password) {

    return new Promise(function(resolve, reject) {
        auth.signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then(result => {
            console.log(result);
            db.collection('users').doc(result.user.email).get()
            .then((doc) => {
                if(doc.exists){
                    resolve(
                        {
                            success: true,
                            user: 
                            {
                                email: email,
                                nickname: doc.nickname,
                                profilePhotoURL: doc.profilePhotoURL
                            }
                        }
                    )
                }
                else{
                    resolve({success:false, user:null})
                }

            })
            .catch(error => 
                {
                    reject(error);
                    console.log(error);
                }
            );
        })
        .catch(error => 
            {
                if(
                    error.code === 'auth/invalid-email'  ||
                    error.code === 'auth/user-disabled'  ||
                    error.code === 'auth/user-not-found' ||
                    error.code === 'auth/wrong-password'
                ){
                    resolve({success:false, user:null})
                }
                else{
                    reject(error)
                }
                console.log(error);
            }
        );
    });
}

export function signOutPromise() {

    return new Promise(function(resolve, reject) {
        auth.signOut()
        .then(() => {
            resolve();
        }).catch(function(error) {
            console.log(error);
            reject(error);
        });
    });
}

export function signupUser(user) {
    console.log('omapp.signup')
    return new Promise(function(resolve, reject) {
        console.log('omapp.signup')
        db.collection('users').doc(user.username).set(user)
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
}

export function getUserInfoFromGoogle(){
    return new Promise((resolve, reject) => {
        let user = null
        auth.signInWithPopup(provider)
        .then((result) => {
            user = new User()
            user.email = result.user.email
            user.profilePhotoURL = result.user.profilePhotoURL
            resolve(user)
        })
        .catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}
