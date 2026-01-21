const express = require("express");
const controller = require("../controllers/equipmentController");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authenticationMiddleware");

router.post('/users/login', userController.loginUser);
router.post('/users/register', userController.registerUser);
router.get('/users/:id', userController.getUser);

router.get("/", controller.getAll);
router.get("/search", controller.searchEquipment);
router.get("/types", controller.getTypes);
router.get("/:id", controller.getById);

router.post("/", authMiddleware.authenticate, controller.create);
router.post("/:id", authMiddleware.authenticate, controller.update);
router.delete("/:id", authMiddleware.authenticate, controller.delete);

module.exports = router;
