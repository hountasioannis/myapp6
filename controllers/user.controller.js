const User = require('../models/user.model')

const logger = require("../logger/logger")

exports.findAll = function(req, res) {
    console.log("Find all users")
    User.find({},(err, results) => {
        if(err) {
            res.status(400).json({status: false, data: err})
            console.log('problem in reading users', err)
            logger.info("problem in reading all users",err)
            logger.warn("warn in reading all users",err)
            logger.error("error in reading alla users",err)
            logger.debug("debug in reading all users",err)
        } else {
            res.status(200).json({status: true, data: results})
            console.log('success in reading users') 
            
        }
    })
}

exports.findOne = function(req, res) {
    const username = req.params.username
    console.log("find one user ", username)
    User.find({username: username}, (err, results) => {
        if (err) {
            res.status(400).json({status: false, data: err})
            console.log(`problem in finding user ${username} `, err) 
            logger.info("problem in finding user",err)
            logger.warn("warn in finding user",err)
            logger.error("error in finding user",err)
            logger.debug("debug in finding user",err)
        } else {
            res.status(200).json({status: true, data: results})
            console.log('success in reading user') 
        }
    })

}

exports.create = function(req, res) {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        products: req.body.products
    })

    console.log('insert user with username ' + req.body.username)

    newUser.save((err, result) => {
        if (err) {
            res.status(400).json({status: false, data: err})
            console.log(`problem in creating user `, err) 
            logger.info("problem in creating user",err)
            logger.warn("warn in creating user",err)
            logger.error("error in creating user",err)
            logger.debug("debug in creating user",err)
        } else {
            res.status(200).json({status: true, data: result})
            console.log('success in creating user') 
        }
    })
}

exports.update = function(req,res) {
    const username = req.body.username

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    }

    User.findOneAndUpdate({username: username}, updateUser, {new: true}, (err, result) => {
        if (err) {
            res.status(400).json({status: false, data: err})
            console.log(`problem in updating user `, err) 
            logger.info("problem in updating user",err)
            logger.warn("warn in updating user",err)
            logger.error("error in updating user",err)
            logger.debug("debug in updating user",err)
        } else {
            res.status(200).json({status: true, data: result})
            console.log('success in updating user') 
        }
    }) 
}

exports.delete = function(req,res) {
    const username = req.params.username

    console.log("delete user ", username) 

    User.findOneAndDelete({username: username}, (err, result) => {
        if (err) {
            res.status(400).json({status: false, data: err})
            console.log(`problem in deleting user `, err) 
            logger.info("problem in deleting user",err)
            logger.warn("warn in deleting user",err)
            logger.error("error in deleting user",err)
            logger.debug("debug in deleting user",err)
        } else {
            res.status(200).json({status: true, data: result})
            console.log('success in deleting user') 
        }
    })
}