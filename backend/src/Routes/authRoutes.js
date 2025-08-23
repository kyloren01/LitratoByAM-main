const express = require("express");
const router = express.Router();
const authController = require("../Controller/authController");
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
// email verification
router.get("/verify", authController.verifyEmail);
router.get("/getProfile", authMiddleware, authController.getProfile);
router.put("/updateProfile", authMiddleware, authController.updateProfile);
router.put("/changePassword", authMiddleware, authController.changePassword);
router.put("/updatePassword", authMiddleware, authController.updatePassword);

module.exports = router;
