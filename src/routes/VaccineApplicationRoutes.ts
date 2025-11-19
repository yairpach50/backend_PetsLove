import { Application } from "express";
import { VaccineApplicationController } from "../controllers/VaccineApplication.controller";
import { authMiddleware } from "../middleware/auth";

export class VaccineApplicationRoutes {
  public vaccineApplicationController: VaccineApplicationController = new VaccineApplicationController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/vaccine-applications/public").get(this.vaccineApplicationController.getAllApplications);
    app.route("/api/vaccine-applications/public").post(this.vaccineApplicationController.createApplication);
    app.route("/api/vaccine-applications/public/:id").get(this.vaccineApplicationController.getApplicationById);
    app.route("/api/vaccine-applications/public/:id").patch(this.vaccineApplicationController.updateApplication);
    app.route("/api/vaccine-applications/public/:id").delete(this.vaccineApplicationController.deleteApplication);
    
    // Marcar como aplicada
    app.route("/api/vaccine-applications/public/:id/mark-as-applied").patch(this.vaccineApplicationController.markAsApplied);
  
    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/vaccine-applications").get(authMiddleware,this.vaccineApplicationController.getAllApplications);
    app.route("/api/vaccine-applications").post(authMiddleware,this.vaccineApplicationController.createApplication);
    app.route("/api/vaccine-applications/:id").get(authMiddleware,this.vaccineApplicationController.getApplicationById);
    app.route("/api/vaccine-applications/:id").patch(authMiddleware,this.vaccineApplicationController.updateApplication);
    app.route("/api/vaccine-applications/:id").delete(authMiddleware,this.vaccineApplicationController.deleteApplication);
    
    // Marcar como aplicada
    app.route("/api/vaccine-applications/:id/mark-as-applied").patch(authMiddleware,this.vaccineApplicationController.markAsApplied);
  }
}
