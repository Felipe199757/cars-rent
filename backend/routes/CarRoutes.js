const router = require("express").Router()

const CarController = require("../controllers/CarController")
    const imageUpload = require("../helpers/image-upload")

const verifyToken = require("../helpers/verify-token")

router.post("/register", imageUpload.array("images"), verifyToken, CarController.register)
router.get("/", CarController.getAll)
router.get("/:id", CarController.getCarById)
router.get("/rent/:id", verifyToken, CarController.rentCar)
router.patch("/edit/:id",  verifyToken,imageUpload.array("images"), CarController.editCar)


module.exports = router