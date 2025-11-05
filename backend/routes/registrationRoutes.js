import express from "express";
import { 
  createRegistration, 
  getAllRegistrations, 
  updateRegistrationStatus,
  deleteRegistration 
} from "../controllers/registrationController.js";

const router = express.Router();

router.post("/", createRegistration);              // POST /api/registrations
router.get("/", getAllRegistrations);              // GET /api/registrations
router.put("/:id", updateRegistrationStatus);      // PUT /api/registrations/:id
router.delete("/:id", deleteRegistration);         // DELETE /api/registrations/:id

export default router;
