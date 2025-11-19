import { Application } from "express";
import { PrescriptionMedicineController } from "../controllers/PrescriptionMedicineController";
import { authMiddleware } from "../middleware/auth";

export class PrescriptionMedicineRoutes {
  public prescriptionMedicineController: PrescriptionMedicineController = new PrescriptionMedicineController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/prescription-medicines/public").get(this.prescriptionMedicineController.getAllPrescriptionMedicines);
    app.route("/api/prescription-medicines/public").post(this.prescriptionMedicineController.createPrescriptionMedicine);
    app.route("/api/prescription-medicines/public/:id").get(this.prescriptionMedicineController.getPrescriptionMedicineById);
    app.route("/api/prescription-medicines/public/:id").patch(this.prescriptionMedicineController.updatePrescriptionMedicine);
    
    
    app.route("/api/prescription-medicines/public/:id").delete(this.prescriptionMedicineController.deletePrescriptionMedicine);
  
    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/prescription-medicines").get(authMiddleware,this.prescriptionMedicineController.getAllPrescriptionMedicines);
    app.route("/api/prescription-medicines").post(authMiddleware,this.prescriptionMedicineController.createPrescriptionMedicine);
    app.route("/api/prescription-medicines/:id").get(authMiddleware,this.prescriptionMedicineController.getPrescriptionMedicineById);
    app.route("/api/prescription-medicines/:id").patch(authMiddleware,this.prescriptionMedicineController.updatePrescriptionMedicine);
    
    
    app.route("/api/prescription-medicines/:id").delete(authMiddleware,this.prescriptionMedicineController.deletePrescriptionMedicine);
  }
}
