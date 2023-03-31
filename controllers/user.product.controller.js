const User = require('../models/user.model')
const logger = require("../logger/logger")

exports.findOne = function(req, res) {
    const username = req.params.username

    User.findOne({username:username}, {username:1, products:1}, (err, result) => {
        if (err) {
            res.json({status: false, data: err})
            console.log("problem in finding user's products", err)
            logger.info("problem in finding user's products",err)
            logger.warn("warn in finding user's products",err)
            logger.error("error in finding user's products",err)
            logger.debug("debug in finding user's products",err)
        } else {
            res.json({status: true, data: result})
        }
    })
}

exports.create = function(req,res) {

    const username =  req.body.username
    const products = req.body.products

    User.updateOne({username: username},
        {
            $push: {products: products}
        },(err, result) => {
            if (err) {
                res.json({status: false, data: err})
                console.log("problem in creating user's product", err)
            logger.info("problem in creating user's product",err)
            logger.warn("warn in creating user's product",err)
            logger.error("error in creating user's product",err)
            logger.debug("debug in creating user's product",err)
            } else {
                res.json({status: true, data: result})
                console.log("insert ok")
            }
}
)

        
}

exports.update = function (req,res) {
    const username = req.body.username
    const product = req.body.products.product
    const quantity = req.body.products.quantity

    User.updateOne({
     username: username,
     "products.product": product
    },
    {
        $set: {
            "products.$.quantity": quantity
        }
    },
    (err, result) => {
        if (err) {
            res.json({status: false, data: err})
            console.log("problem in updating user's product", err)
            logger.info("problem in updating user's product",err)
            logger.warn("warn in updating user's product",err)
            logger.error("error in updating user's product",err)
            logger.debug("debug in updating user's product",err)
        } else {
            res.json({status: true, data: result})
        }
}
    )
}

exports.delete = function (req,res) {
    const username = req.params.username
    const product = req.params.product

    User.updateOne(
        {username: username},
        {
            $pull:{
                products: {product: product}
            }
        },
        (err, result) => {
            if (err) {
                res.json({status: false, data: err})
                console.log("problem in deleting user's product", err)
            logger.info("problem in deleting user's product",err)
            logger.warn("warn in deleting user's product",err)
            logger.error("error in deleting user's product",err)
            logger.debug("debug in deleting user's product",err)
            } else {
                res.json({status: true, data: result})
            }
    }
        )

}

exports.stats1 = function(req, res) {
    const username = req.params.username

    User.aggregate([
        {
            $match: {
                username: "user1"
            }
        },
        {
           $unwind:"$products" 
        },
        {
            $project: {
                _id: 1, 
                username: 1,
                products: 1
            }
        },
        {
            $group: {
                _id: {
                    username: "$username",
                    product: "$products.product"
                
            },
            totalAmount:{
                $sum: {
                    $multiply: ["$products.cost", "$products.quantity"]
                }
            },
            count: {$sum: 1}

        }
    },
    {
        $sort:{"_id.product":1}
        }
    ],
    (err, result) => {
        if (err) {
            res.json({status: false, data: err})
            console.log("problem in  user's stats", err)
            logger.info("problem in  user's stats",err)
            logger.warn("warn in  user's stats",err)
            logger.error("error in user's stats",err)
            logger.debug("debug in  user's stats",err)
        } else {
            res.json({status: true, data: result})
        }
}
    )
}