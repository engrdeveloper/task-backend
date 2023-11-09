import express from "express";
import { login, register, fetchUser } from "../controllers/user";
import { authenticateJWT } from "../middleware/auth";
import { createTask, listTask } from "../controllers/tasks";

const router: express.Router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/user", authenticateJWT, fetchUser);

router.post("/create-task", authenticateJWT, createTask);

router.get("/list-tasks", authenticateJWT, listTask);

// Handle 404 error
router.use("*", (req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    error: {
      message: "URL NOT FOUND",
    },
  });
});

export default router;
