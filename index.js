const express = require('express')
const app = express()
const path = require('path');
const router = express.Router();
const passport = require('passport')
const express_session = require('express-session')
const flash = require('express-flash')
const methodOverride = require('method-override')

const auth_users = [{username: 'admin', password: 'admin'},{username: 'usman', password: 'usman'}]

const initializePassport = require('./passportConfig')
initializePassport(
  passport,
  username => auth_users.find(user => user.username === username)
)
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(express_session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/login.html'))
})
app.get('/home', function(req, res){
    res.sendFile(path.join(__dirname+'/home.html'))
})
app.post('/login', passport.authenticate('local', {
    successRedirect: '/home', 
    failureRedirect: '/',
    failureflash: true
}))
app.use('/', router)
app.listen(3000)