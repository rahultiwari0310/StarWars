const Auth = {
    user: '',
    isAuthenticated: false,
    authenticate( user ) {
        this.user = user;
        this.isAuthenticated = true
    },
    signout() {
        this.user = '';
        this.isAuthenticated = false
    }
};

export default Auth;