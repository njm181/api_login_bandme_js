class LoginService{

    constructor(){}

    async verifyUserExistMockedResponseSuccess(email, username){
       const loginDataMocked = {
            email: 'email_test@gmail.com',
            username: 'Testing Username',
            isRegistered: true
        };
        return loginDataMocked;
    }

    async  verifyUserExistMockedResponseError(email, username){
        const loginDataMocked = {
            email: '',
            username: '',
            isRegistered: false

        };
        return loginDataMocked;
    }
}

module.exports = LoginService