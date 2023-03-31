const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

let addressSchema = new Schema({
    area: {type: String},
    road: {type: String}
}, {_id: false})

let phoneSchema = new Schema({
    type: {type: String},
    number: {type: String}
}, {_id: false})

let productSchema = new Schema({
    product: {type: String},
    cost: {type: Number},
    quantity: {type: Number},
    date: {type: Date, default: Date.now}
}, {_id: false})

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'password is required field'],
        max: 100
    },
    name: {
        type: String,
        max: 100
    },
    surname: {
        type: String,
        max: 100
    },
    email: {
        type: String,
        required: [true,"email is requires field"],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'email address is not valid']
    },
    address: addressSchema,
    phone: {type:[phoneSchema], null:true},
    products: {
     type:[productSchema], null:true}
    },{
      collection: 'users',
      timestamps: true  
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)