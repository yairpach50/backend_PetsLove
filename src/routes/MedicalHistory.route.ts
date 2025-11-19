import { Application } from "express";
import { MedicalHistoryController } from '../controllers/MedicalHistory.controller';
import { authMiddleware } from "../middleware/auth";

export class MedicalHistoryRoutes {
  public medicalHistoryController: MedicalHistoryController = new MedicalHistoryController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    // Rutas CRUD para historiales médicos
    app.route("/api/medical-histories/public").get(this.medicalHistoryController.getAllHistories);
    app.route("/api/medical-histories/public").post(this.medicalHistoryController.createHistory);
    app.route("/api/medical-histories/public/:id").get(this.medicalHistoryController.getHistoryById);
    app.route("/api/medical-histories/public/:id").patch(this.medicalHistoryController.updateHistory);
    app.route("/api/medical-histories/public/:id").delete(this.medicalHistoryController.deleteHistory);
    
    // Ruta para desactivar un historial médico (cambiar status a inactivo)
    app.route("/api/medical-histories/public/:id/deactivate").patch(this.medicalHistoryController.deactivateHistory);
  
  // ================== RUTAS CON AUTENTICACIÓN ==================
  app.route("/api/medical-histories").get(authMiddleware,this.medicalHistoryController.getAllHistories);
    app.route("/api/medical-histories").post(authMiddleware,this.medicalHistoryController.createHistory);
    app.route("/api/medical-histories/:id").get(authMiddleware,this.medicalHistoryController.getHistoryById);
    app.route("/api/medical-histories/:id").patch(authMiddleware,this.medicalHistoryController.updateHistory);
    app.route("/api/medical-histories/:id").delete(authMiddleware,this.medicalHistoryController.deleteHistory);
    
    // Ruta para desactivar un historial médico (cambiar status a inactivo)
    app.route("/api/medical-histories/:id/deactivate").patch(authMiddleware,this.medicalHistoryController.deactivateHistory);
  }
}