const express = require('express')
const route = express.Router()

const controller = require("../controllers/user.controller")

route.post("/register", controller.register)

route.post("/login", controller.login)

module.exports = route