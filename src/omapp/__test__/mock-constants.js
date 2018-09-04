let mockAuth = {}
let mockDb = []

const mockUsers = []

mockUsers['usuarioNoRegistrado@gmail.com'] = {
    email: 'usuarioNoRegistrado@gmail.com',
    name: 'Usuaro N. Registrado',
    emailVerified: true,
    profilePhotoURL: 'http://lucarobertonotes.altervista.org/wp-content/uploads/2017/04/firebase-authentication-logo1.png'
}

mockUsers['usuarioRegistrado@gmail.com'] = {
    email: 'usuarioRegistrado@gmail.com',
    name: 'Usuaro Registrado',
    profilePhotoURL: 'http://lucarobertonotes.altervista.org/wp-content/uploads/2017/04/firebase-authentication-logo1.png'
}

mockUsers['mock@gmail.com'] = {
    email: 'mock@gmail.com',
    name: 'Mr Le Cat',
    profilePhotoURL: 'http://lucarobertonotes.altervista.org/wp-content/uploads/2017/04/firebase-authentication-logo1.png'
}

mockAuth.signInWithPopup = function(provider){

    const mockUser = mockUsers['mock@gmail.com']

    const result = {
        user: {
            email: mockUser.email,
            name: mockUser.name,
            emailVerified: true,
            photoURL: mockUser.profilePhotoURL
        }
    }

    return new Promise((resolve) => resolve(result))
}

mockDb.collection =  function(){

    let thisDB = []

    return {
    db: thisDB,
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

export {mockAuth, mockDb, mockUsers}