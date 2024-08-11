const express = require('express')
const route = express.Router()

const controller = require("../controllers/user.controller")

const authMiddleware = require("../middleware/auth.middleware")

route.post("/register", controller.register)

route.post("/login", controller.login)

route.post("/password/forgot", controller.forgotPassword)

route.post("/password/otp", controller.otpPassword)

route.post("/password/reset", controller.resetPassword)

route.get("/detail", authMiddleware.requireAuth, controller.detail)

route.get("/list", authMiddleware.requireAuth, controller.list)

module.exports = route