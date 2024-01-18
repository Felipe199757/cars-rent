const router = require("express").Router()

const CarController = require("../controllers/CarController")

const verifyToken = require("../helpers/verify-token")

router.post("/register",verifyToken, CarController.register)
router.get("/", CarController.getAll)
router.get("/:id", CarController.getCarById)
router.get("/rent/:id",verifyToken, CarController.rentCar)
router.patch("/edit/:id",verifyToken, CarController.editCar)



module.exports = router