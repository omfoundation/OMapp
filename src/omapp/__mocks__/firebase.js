module.exports = {
    initializeApp : jest.fn(()=>'initializeApp'),
    auth: function(){}
}

function auth(){
    return {GoogleAuthProvider: GoogleAuthProvider}
}

function GoogleAuthProvider(){}