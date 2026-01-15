const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../../middlewares/auth.middleware');



const role = require("../../middlewares/role.middleware");
const {
  createTask,
  getMyTasks,
  getAllTasks,
  deleteTask
} = require("../../controllers/task.controller");

router.post("/", authenticate, createTask);               // user/admin
router.get("/my", authenticate, getMyTasks);               // user
router.get("/admin/all",authenticate, authorizeAdmin, role("admin"), getAllTasks); // admin
router.delete("/:id",authenticate, authorizeAdmin, role("admin"), deleteTask);     // admin

module.exports = router;
