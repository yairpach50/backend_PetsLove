import { Application } from "express";
import { MedicineController } from '../controllers/Medicine.controller';
import { authMiddleware } from "../middleware/auth";

export class MedicineRoutes {
  public medicineController: MedicineController = new MedicineController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    // Rutas CRUD para medicamentos
    app.route("/api/medicines/public").get(this.medicineController.getAllMedicines);
    app.route("/api/medicines/public").post(this.medicineController.createMedicine);
    app.route("/api/medicines/public/:id").get(this.medicineController.getMedicineById);
    app.route("/api/medicines/public/:id").patch(this.medicineController.updateMedicine);
    app.route("/api/medicines/public/:id").delete(this.medicineController.deleteMedicine);
    
    // Ruta para desactivar un medicamento (cambiar status a inactivo)
    app.route("/api/medicines/public/:id/deactivate").patch(this.medicineController.deactivateMedicine);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/medicines").get(authMiddleware,this.medicineController.getAllMedicines);
    app.route("/api/medicines").post(authMiddleware,this.medicineController.createMedicine);
    app.route("/api/medicines/:id").get(authMiddleware,this.medicineController.getMedicineById);
    app.route("/api/medicines/:id").patch(authMiddleware,this.medicineController.updateMedicine);
    app.route("/api/medicines/:id").delete(authMiddleware,this.medicineController.deleteMedicine);
    
    // Ruta para desactivar un medicamento (cambiar status a inactivo)
    app.route("/api/medicines/:id/deactivate").patch(authMiddleware,this.medicineController.deactivateMedicine);
  }
}