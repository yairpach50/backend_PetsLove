import { Application } from "express";
import { PetController } from "../controllers/Pet.controller";
import { authMiddleware } from "../middleware/auth";

export class PetRoutes {
  public petController: PetController = new PetController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/pets/public").get(this.petController.getAllPets);
    app.route("/api/pets/public").post(this.petController.createPet);
    app.route("/api/pets/public/:id").get(this.petController.getPetById);
    app.route("/api/pets/public/:id").patch(this.petController.updatePet);
    app.route("/api/pets/public/:id").delete(this.petController.deletePet);
    
    // Desactivar mascota (eliminación lógica)
    app.route("/api/pets/public/:id/deactivate").patch(this.petController.deactivatePet);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/pets").get(authMiddleware,this.petController.getAllPets);
    app.route("/api/pets").post(authMiddleware,this.petController.createPet);
    app.route("/api/pets/:id").get(authMiddleware,this.petController.getPetById);
    app.route("/api/pets/:id").patch(authMiddleware,this.petController.updatePet);
    app.route("/api/pets/:id").delete(authMiddleware,this.petController.deletePet);
    
    // Desactivar mascota (eliminación lógica)
    app.route("/api/pets/:id/deactivate").patch(authMiddleware,this.petController.deactivatePet);
  }
}
