class User {
    constructor(){
        this.name = null;
        this.email = null;
        this.username = null;
        this.profilePhotoURL = null;
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
}

export {User}
