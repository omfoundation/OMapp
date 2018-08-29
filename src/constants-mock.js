let provider;
let auth = {};
let db = {};

export {provider, auth, db};

auth.signInWithPopup = function(){

    let result = {
        user: {
            email: 'mock@gmail.com',
            emailVerified: true,
            photoURL: 'http://lucarobertonotes.altervista.org/wp-content/uploads/2017/04/firebase-authentication-logo1.png'
        }
    }

    return new Promise((resolve) => resolve(result))
}

let mockedDB = []

db.collection = function(collection){
    return {
        db: mockedDB,
        doc: function(docId){
            let db = this.db
            return {
                get: function(){

                    let doc;

                    if(docId === "usernameRegistrado"){
                        doc = {
                            email:"luis.morin@gmail.com",
                            username: "lamorin",
                            profilePhotoURL: "http://www.smashingphotoz.com/wp-content/uploads/2012/11/11_cat_photos.jpg"
                        }
                    }else{
                        doc = db[docId]
                    }

                    if (doc === undefined) {
                        doc = {exists: false}
                    }
                    else{
                        doc.exists = true;
                    }

                    return new Promise((resolve) => {
                        resolve(doc)
                    })
                },
                set(doc){
                    db[doc.username] = doc
                    return {
                        then: (callback) => {
                            callback()
                        }
                    }
                }
            }
        }
    }
}