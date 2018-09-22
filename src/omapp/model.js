class User {
    constructor(){
        this.name = null;
        this.email = null;
        this.username = null;
        this.profilePhotoURL = null;
    }

    setName(value){
        this.name = value
    }

    getName(){
        return this.name
    }


    setEmail(value){
        this.email = value
    }

    getEmail(){
        return this.email
    }


    setUsername(value){
        this.username = value
    }

    getUsername(){
        return this.username
    }


    setProfilePhotoURL(value){
        this.profilePhotoURL = value
    }

    getProfilePhotoURL(){
        return this.profilePhotoURL
    }

    toJSON(){
        console.log("A VER", this.profilePhotoURL)
        return {
                "name": this.name,
                "email": this.email,
                "username": this.username,
                "profilePhotoURL": this.profilePhotoURL
            }
    }

    isAuth(){
        //!!!MEJORAR
        if((this.email != null) && (this.username != null)){
            return true
        }
        return false
    }
}

export {User}
