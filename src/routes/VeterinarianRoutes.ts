import { Application } from "express";
import { VeterinarianController } from "../controllers/Veterinarian.controller";
import { authMiddleware } from "../middleware/auth";

export class VeterinarianRoutes {
  public veterinarianController: VeterinarianController = new VeterinarianController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/veterinarians/public").get(this.veterinarianController.getAllVeterinarians);
    app.route("/api/veterinarians/public").post(this.veterinarianController.createVeterinarian);
    app.route("/api/veterinarians/public/:id").get(this.veterinarianController.getVeterinarianById);
    app.route("/api/veterinarians/public/:id").patch(this.veterinarianController.updateVeterinarian);
    app.route("/api/veterinarians/public/:id").delete(this.veterinarianController.deleteVeterinarian);
    
    // Desactivar veterinario (eliminación lógica)
    app.route("/api/veterinarians/public/:id/deactivate").patch(this.veterinarianController.deactivateVeterinarian);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/veterinarians").get(authMiddleware,this.veterinarianController.getAllVeterinarians);
    app.route("/api/veterinarians").post(authMiddleware,this.veterinarianController.createVeterinarian);
    app.route("/api/veterinarians/:id").get(authMiddleware,this.veterinarianController.getVeterinarianById);
    app.route("/api/veterinarians/:id").patch(authMiddleware,this.veterinarianController.updateVeterinarian);
    app.route("/api/veterinarians/:id").delete(authMiddleware,this.veterinarianController.deleteVeterinarian);
    
    // Desactivar veterinario (eliminación lógica)
    app.route("/api/veterinarians/:id/deactivate").patch(authMiddleware,this.veterinarianController.deactivateVeterinarian);
  }
}
