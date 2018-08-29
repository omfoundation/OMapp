let provider;
let auth = {};
let db = {};

export {provider, auth, db};

auth.signInWithPopup = function(){
    return new Promise((resolve) => resolve({"user":{"email":"luis.morin@gmail.com"}}))
}



db.collection = function(collection){
    return {
        doc: function(id){
            return {
                get: function(){

                    let doc;

                    if(id === "non-registered@gmail.com"){
                        doc = {
                            exists:false,
                        }
                    }else if(id === "registered@gmail.com"){
                        doc = {
                            exists:true,
                            email:"luis.morin@gmail.com",
                            nickname: "lamorin",
                            profilePhotoURL: "http://www.smashingphotoz.com/wp-content/uploads/2012/11/11_cat_photos.jpg"
                        }
                    }else{
                        doc = {
                            exists:false,
                        }                        
                    }

                    return new Promise((resolve) => {
                        resolve(doc)
                    })
                }
            }
        }
    }
}