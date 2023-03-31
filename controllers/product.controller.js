const Product = require('../models/product.model')

exports.findAll = function(req, res) {
    console.log("Find all products")
    Product.find({},(err, results) => {
        if(err) {
            res.status(400).json({status: false, data: err})
            console.log('problem in reading products', err)
            logger.info("problem in reading all products",err)
            logger.warn("warn in reading all products",err)
            logger.error("error in reading alla products",err)
            logger.debug("debug in reading all products",err)
        } else {
            res.status(200).json({status: true, data: results})
            console.log('success in reading products') 
        }
    })
}

exports.findOne = function(req, res) {
    const product = req.params.product
    console.log("find one product ", product)
    Product.findOne({product: product}, (err, results) => {
        if (err) {
            res.status(400).json({status: false, data: err})
            console.log(`problem in finding product ${product} `, err) 
            logger.info("problem in finding product",err)
            logger.warn("warn in finding product",err)
            logger.error("error in finding product",err)
            logger.debug("debug in finding product",err)
        } else {
            res.status(200).json({status: true, data: results})
            console.log('success in reading product') 
        }
    })

}

exports.create = function(req, res) {
    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    })

    console.log('insert product ' + req.body.product)

    newProduct.save((err, result) => {
        if (err) {
            res.status(400).json({status: false, data: err})
            console.log(`problem in creating product `, err)
            logger.info("problem in creating product",err)
            logger.warn("warn in creating product",err)
            logger.error("error in creating product",err)
            logger.debug("debug in creating product",err) 
        } else {
            res.status(200).json({status: true, data: result})
            console.log('success in creating product') 
        }
    })
}

exports.update = function(req,res) {
    const product = req.body.product

    const updateProduct = {
        
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }

    Product.findOneAndUpdate({product: product}, updateProduct, {new: true}, (err, result) => {
        if (err) {
            res.status(400).json({status: false, data: err})
            console.log(`problem in updating product `, err) 
            logger.info("problem in updating product",err)
            logger.warn("warn in updating product",err)
            logger.error("error in updating product",err)
            logger.debug("debug in updating product",err)
        } else {
            res.status(200).json({status: true, data: result})
            console.log('success in updating product') 
        }
    }) 
}

exports.delete = function(req,res) {
    const product = req.params.product

    console.log("delete product ", product) 

   Product.findOneAndDelete({product: product}, (err, result) => {
        if (err) {
            res.status(400).json({status: false, data: err})
            console.log(`problem in deleting product `, err) 
            logger.info("problem in deleting product",err)
            logger.warn("warn in deleting product",err)
            logger.error("error in deleting product",err)
            logger.debug("debug in deleting product",err)
        } else {
            res.status(200).json({status: true, data: result})
            console.log('success in deleting product') 
        }
    })
}