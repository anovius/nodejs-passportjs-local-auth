const LocalStrategy = require('passport-local').Strategy

function initialize(passport, getUser) {
    const authUser = async (username, password, done) => {
        const user = getUser(username)
        if(user == null){
            return done(null, false, {message: "User not exist"})
        }
        try{
            if(await password === user.password){
                return done(null, user)
            }
            else{
                return done(null, false, {message: 'Password not match'})
            }
        }
        catch(e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'username' }, authUser))
    passport.serializeUser((user, done) => done(null, user.username))
    passport.deserializeUser((username, done) => {
      return done(null, getUser(username))
    })
}

module.exports = initialize