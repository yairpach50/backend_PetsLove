import { Application } from "express";
import { VaccineController } from "../controllers/Vaccine.controller";
import { authMiddleware } from "../middleware/auth";

export class VaccineRoutes {
  public vaccineController: VaccineController = new VaccineController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/vaccines/public").get(this.vaccineController.getAllVaccines);
    app.route("/api/vaccines/public").post(this.vaccineController.createVaccine);
    app.route("/api/vaccines/public/:id").get(this.vaccineController.getVaccineById);
    app.route("/api/vaccines/public/:id").patch(this.vaccineController.updateVaccine);
    app.route("/api/vaccines/public/:id").delete(this.vaccineController.deleteVaccine);
    
    // Desactivar vacuna
    app.route("/api/vaccines/public/:id/deactivate").patch(this.vaccineController.deactivateVaccine);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/vaccines").get(authMiddleware,this.vaccineController.getAllVaccines);
    app.route("/api/vaccines").post(authMiddleware,this.vaccineController.createVaccine);
    app.route("/api/vaccines/:id").get(authMiddleware,this.vaccineController.getVaccineById);
    app.route("/api/vaccines/:id").patch(authMiddleware,this.vaccineController.updateVaccine);
    app.route("/api/vaccines/:id").delete(authMiddleware,this.vaccineController.deleteVaccine);
    
    // Desactivar vacuna
    app.route("/api/vaccines/:id/deactivate").patch(authMiddleware,this.vaccineController.deactivateVaccine);
  }
}
