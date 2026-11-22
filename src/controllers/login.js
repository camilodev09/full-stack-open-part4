
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const config = require('../utils/config')

const loginUser = async (req,res, next) => {

 try{
  const { username , password} = req.body

  const user =  User.findOne({username})
  const passwordCorrect = 
     user === null ? false:  await bcrypt.compare(password, user.passwordHash)
  
  if(!(user && passwordCorrect)){
    return res.status(401).json({
        error: 'invalid username or pasword',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
 
  const token = jwt.sign( userForToken, config.SECRET,{
    expiresIn: 60*90,
  })

  res.status(200).send({token, username:user.username, name: user.name})

 }
 catch(error){
    next(error)
 }

}

module.exports = { loginUser}