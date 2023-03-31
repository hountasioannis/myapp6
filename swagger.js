const m2s = require('mongoose-to-swagger')
const User = require('./models/user.model')
const Product = require('./models/product.model')

exports.options = {
    "definitions": {
        User: m2s(User),
        Product: m2s(Product)
    },
    "swagger":"2.0",
    "info": {
        "version": "1.0.0",
        "description": "Products application api",
        "tilte": "products crud api"
    },
    "host": "localhost:3000",
    "basePath": "/",
    "tags": [
        {
            "name":"Users",
            "description":"api for users"
        },
        {
            "name":"Users and Products",
            "description":"api for users and their products" 
        },
        {
            "name":"Products",
            "description":"api for products" 
        }
    ],
    "schemes": ["http"],
    "consumes":["application/json"],
    "produces":["application/json"],
    "paths":{
        "/api/user/findAll":{
            "get" : {
                "tags":[
                    "Users"
                ],
                "summary":"get all users from system",
                "responses":{
                    "200":{
                        "description" : "OK",
                        "schema": {
                            "$ref":"#/definitions/User"
                        }
                    }
                }
            }
        },
        "/api/user/findOne/{username}":{
            "get" : {
                "tags":[
                    "Users"
                ],
                "parameters":[
                    {"name":"username",
                    "in":"path",
                    "required":true,
                    "description":"username of the user",
                    "type":"string"
                }
                ],
                "summary":"get a user from system",
                "responses":{
                    "200":{
                        "description" : "user findK",
                        "schema": {
                            "$ref":"#/definitions/User"
                        }
                    }
                }
            }
        },
        "/api/user/create":{
            "post":{
                "tags": [
                    "Users"
                ],
                "description": "Create new user",
                    "parameters": [ {
                        "name":"Create User",
                        "in": "body",
                        "description": "users parameters that will be create",
                        "schema":{
                           "type":"object",
                           "properties": {
                            "name":{"type":"string"},
                            "surname":{"type": "string"},
                            "email": {"type": "string"},
                            "username":{"type": "string"},
                            "password":{"type": "string"},
                            "address":{
                                "type": "object",
                            "properties":{
                                "area":{"type": "string"},
                                "road":{"type": "string"}
                            }
                            },
                            "phone":{
                                "type":"array",
                                "items":{
                                    "type":"object",
                                    "properties":{
                                        "type":{"type": "string"},
                                        "number":{"type": "string"}
                                    }
                                }
                            }
                           },
                           "required":["username", "email"]
                        }
                    }],
                    "produces" : ["application/json"],
                    "responses":{
                        "200":{
                            "description":"created",
                            "schema":{
                                "$ref":"#/definitions/User"
                            }
                        }
                    }
                }
            },
            "/api/user/update":{
                "patch":{
                    "tags":[
                        "Users"
                    ],
                    "description":"update user",
                    "parameters":[{
                        "name":"update user",
                        "in": "body",
                        "description":"user that will update",
                        "schema":{
                            "type":"object",
                            "properties":{
                                "username":{"type": "string"},
                                "name":{"type":"string"},
                                "surname":{"type":"string"},
                                "email":{"type":"string"},
                                "address":{
                                    "type": "object",
                                "properties":{
                                    "area":{"type": "string"},
                                    "road":{"type": "string"}
                                }
                                },
                                "phone":{
                                    "type":"array",
                                    "items":{
                                        "type":"object",
                                        "properties":{
                                            "type":{"type": "string"},
                                            "number":{"type": "string"}
                                        }
                                    }
                                }
                            },
                            "required":["email"]
                        }
                    }],
                    "produces":["application/json"],
                    "responses":{
                        "200":{
                            "description":"updated user"
                        }
                    }
                }
            },
            "/api/user/delete/{username}":{
                "delete":{
                    "tags":[
                        "Users"
                    ],
                    "description":"deletes a user",
                    "parameters":[{
                        "name":"username",
                        "in":"path",
                        "description":"username that deletes user"
                    }],
                    "responses":{
                        "200": {
                            "deescription":"deleted user"
                        }
                    }
                }
            },
            "/api/product/findAll":{
                "get" : {
                    "tags":[
                        "Products"
                    ],
                    "summary":"get all products from system",
                    "responses":{
                        "200":{
                            "description" : "OK",
                            "schema": {
                                "$ref":"#/definitions/Product"
                            }
                        }
                    }
                }
            },
            "/api/product/findOne/{product}":{
                "get" : {
                    "tags":[
                        "Products"
                    ],
                    "parameters":[
                        {"name":"product",
                        "in":"path",
                        "required":true,
                        "description":"product",
                        "type":"string"
                    }
                    ],
                    "summary":"get a product from system",
                    "responses":{
                        "200":{
                            "description" : "product findK",
                            "schema": {
                                "$ref":"#/definitions/Product"
                            }
                        }
                    }
                }
            },
            "/api/product/create":{
                "post":{
                    "tags": [
                        "Products"
                    ],
                    "description": "Create new product",
                        "parameters": [ {
                            "name":"Create Product",
                            "in": "body",
                            "description": "product's parameters that will be create",
                            "schema":{
                               "type":"object",
                               "properties": {
                                "product":{"type":"string"},
                                "cost":{"type": "number"},
                                "description": {"type": "string"},
                                "quantity":{"type": "number"}
                                } },
                               "required":["product", "cost","description","quantity"]
                            }
                        ],
                        "produces" : ["application/json"],
                        "responses":{
                            "200":{
                                "description":"created",
                                "schema":{
                                    "$ref":"#/definitions/Product"
                                }
                            }
                        }
                    }
                },
                "/api/product/update":{
                    "patch":{
                        "tags":[
                            "Products"
                        ],
                        "description":"update product",
                        "parameters":[{
                            "name":"update product",
                            "in": "body",
                            "description":"product that will update",
                            "schema":{
                                "type":"object",
                                "properties":{
                                    "product":{"type":"string"},
                                    "cost":{"type": "number"},
                                    "description": {"type": "string"},
                                    "quantity":{"type": "number"}
                                    } },
                                   "required":["product", "cost","description","quantity"]
                                            
                        }],
                        "produces":["application/json"],
                        "responses":{
                            "200":{
                                "description":"updated product"
                            }
                        }
                    }
                },
                "/api/product/delete/{product}":{
                    "delete":{
                        "tags":[
                            "Products"
                        ],
                        "description":"deletes a product",
                        "parameters":[{
                            "name":"product",
                            "in":"path",
                            "description":" product will be deleted"
                        }],
                        "responses":{
                            "200": {
                                "deescription":"deleted product"
                            }
                        }
                    }
                },
            "/api/userproducts/findOne/{username}":{
                "get":{
                        "tags":[
                            "Users and Products"
                    ],
                    "parameters":[{
                       "name" : "username",
                       "in": "path",
                       "description":"find user's products",
                       "type":"string"
                    }] ,
                    "responses":{
                        "200": {
                            "description":"gets the products "
                        }
                    }
                }
            },
            "/api/userproducts/create": {
                "post": {
                  "tags": [
                    "Users and Products"
                  ],
                  "description": "Add new product for user in system",
                  "parameters": [
                    {
                      "name": "Add new product for user",
                      "in": "body",
                      "description": "Product that we want to add to user",
                      "schema": {
                        "type": "object",
                        "properties": {
                          "username": { "type": "string" },
                          "products":{
                            "type":"object",
                            "properties": {
                                "product": { "type": "string" },
                                "cost": { "type": "number" },
                                "quantity": { "type": "number" }
                                
                            }
                        }
                          
                        },
                        "required": ["username","product","cost" ,"quantity"]
                      }
                    }
                  ],
                  "produces": [
                    "application/json"
                  ],
                  "responses": {
                    "200": {
                      "description": "New product is added",
                    }
                  }
                } 
              },
              "/api/userproducts/update": {
                "patch": {
                  "tags": [
                    "Users and Products"
                  ],
                  "description": "Update product from user system",
                  "parameters": [{
                    "name": "update product from user in system",
                    "in": "body",
                    "description": "Product of user that we will update",
                    "schema":{
                      "type":"object",
                      "properties": {
                        "username": { "type": "string" },
                        "products":{
                            "type":"object",
                            "properties": {
                                "product": { "type": "string" },
                                "cost": { "type": "number" },
                                "quantity": { "type": "number" }
                            }
                        }
                       
                      },
                      "required": ["quantity"]
                    }
                  }],
                  "produces": [
                    "application/json"
                  ],
                  "responses": {
                    "200": {
                      "description": "Update a product of user",
                      "schema": {
                        "$ref": "#/definitions/User"
                      }
                    }
                  }
                } 
              },
              "/api/userproducts/delete/{username}/{product}": {
                "delete": {
                  "tags": [
                    "Users and Products"
                  ],
                  "description": "Delete product from user in system",
                  "parameters": [{
                      "name": "username",
                      "in": "path",
                      "description": "Username that we want to find",
                      "schema": {
                        "$ref": "#/definitions/User"
                      }
                  },{
                    "name": "product",
                    "in": "path",
                    "description": " product that we want to delete",
                    "schema": {
                      "$ref": "#/definitions/User"
                    }
                }],
                  "produces": [
                    "application/json"
                  ],
                  "responses": {
                    "200": {
                      "description": "Delete a product from user",
                    }
                  }
                } 
              },
        }
}













                            