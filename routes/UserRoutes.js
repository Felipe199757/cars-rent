const router = require("express").Router()

const UserController = require("../controllers/UserController")


const verifyToken = require("../helpers/verify-token")

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.patch("/edit/:id", verifyToken , UserController.editUser)
router.get("/checkuser", UserController.checkUser)
router.get("/:id", UserController.getUserById)
module.exports = router