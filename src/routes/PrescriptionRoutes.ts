import { Application } from "express";
import { PrescriptionController } from "../controllers/Prescription.controller";
import { authMiddleware } from "../middleware/auth";

export class PrescriptionRoutes {
  public prescriptionController: PrescriptionController = new PrescriptionController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/prescriptions/public").get(this.prescriptionController.getAllPrescriptions);
    app.route("/api/prescriptions/public").post(this.prescriptionController.createPrescription);
    app.route("/api/prescriptions/public/:id").get(this.prescriptionController.getPrescriptionById);
    app.route("/api/prescriptions/public/:id").patch(this.prescriptionController.updatePrescription);
    app.route("/api/prescriptions/public/:id").delete(this.prescriptionController.deletePrescription);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/prescriptions").get(authMiddleware,this.prescriptionController.getAllPrescriptions);
    app.route("/api/prescriptions").post(authMiddleware,this.prescriptionController.createPrescription);
    app.route("/api/prescriptions/:id").get(authMiddleware,this.prescriptionController.getPrescriptionById);
    app.route("/api/prescriptions/:id").patch(authMiddleware,this.prescriptionController.updatePrescription);
    app.route("/api/prescriptions/:id").delete(authMiddleware,this.prescriptionController.deletePrescription);
  }
}
