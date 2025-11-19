import { Application } from "express";
import { LaboratoryController } from '../controllers/Laboratory.controller';
import { authMiddleware } from "../middleware/auth";

export class LaboratoryRoutes {
  public laboratoryController: LaboratoryController = new LaboratoryController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    // Rutas CRUD para laboratorios
    app.route("/api/laboratories/public").get(this.laboratoryController.getAllLaboratories);
    app.route("/api/laboratories/public").post(this.laboratoryController.createLaboratory);
    app.route("/api/laboratories/public/:id").get(this.laboratoryController.getLaboratoryById);
    app.route("/api/laboratories/public/:id").patch(this.laboratoryController.updateLaboratory);
    app.route("/api/laboratories/public/:id").delete(this.laboratoryController.deleteLaboratory);
    
    // Ruta para desactivar un laboratorio (cambiar status a inactivo)
    app.route("/api/laboratories/public/:id/deactivate").patch(this.laboratoryController.deactivateLaboratory);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/laboratories").get(authMiddleware,this.laboratoryController.getAllLaboratories);
    app.route("/api/laboratories").post(authMiddleware,this.laboratoryController.createLaboratory);
    app.route("/api/laboratories/:id").get(authMiddleware,this.laboratoryController.getLaboratoryById);
    app.route("/api/laboratories/:id").patch(authMiddleware,this.laboratoryController.updateLaboratory);
    app.route("/api/laboratories/:id").delete(authMiddleware,this.laboratoryController.deleteLaboratory);
    
    // Ruta para desactivar un laboratorio (cambiar status a inactivo)
    app.route("/api/laboratories/:id/deactivate").patch(authMiddleware,this.laboratoryController.deactivateLaboratory);
  }
}