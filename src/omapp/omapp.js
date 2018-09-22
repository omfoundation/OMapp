import {auth, provider, db} from '../constants'
import { User } from './model';

export function isUsernameAlreadyRegistered(username){
    return new Promise((resolve) => {
        db.collection('users').doc(username).get()
        .then((doc) => { 
            if(doc.exists){
                resolve(true)
            }
            else{
                resolve(false)
            }
        })
        .catch(error => console.log(error))
    })
}

export function signupUser(user) {
    return new Promise(function(resolve, reject) {
        db.collection('users').doc(user.username).set(user)
        .then(() => resolve(true))
        .catch(error => reject(error))
    })
}

export function getUserInfoFromGoogle(){
    return new Promise((resolve, reject) => {
        let user = new User()
        auth.signInWithPopup(provider)
        .then( result => {
            user.setEmail(result.user.email)
            user.setName(result.user.name)
            user.setProfilePhotoURL(result.user.photoURL)
            resolve(user)
        })
        .catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

/*NEW */
export function isUserRegisteredByEmail(email){
    return new Promise((resolve) => {
        db.collection('users').where('email','==',email)
        .then((doc) => { 
            console.log('DOC RECIVE',doc)
            if(doc.exists){
                resolve(true)
            }
            else{
                resolve(false)
            }
        })
        .catch(error => console.log(error))
    })
}

export function isAuthUser(){
    let user = new User()
    user.setEmail('something')
    user.setUsername('something')

    return user.isAuth()
}