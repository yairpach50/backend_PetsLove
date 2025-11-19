import { Application } from "express";
import { OwnerController } from '../controllers/Owner.controller';
import { authMiddleware } from "../middleware/auth";

export class OwnerRoutes {
  public ownerController: OwnerController = new OwnerController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    // Rutas CRUD para propietarios
    app.route("/api/owners/public").get(this.ownerController.getAllOwners);
    app.route("/api/owners/public").post(this.ownerController.createOwner);
    app.route("/api/owners/public/:id").get(this.ownerController.getOwnerById);
    app.route("/api/owners/public/:id").patch(this.ownerController.updateOwner);
    app.route("/api/owners/public/:id").delete(this.ownerController.deleteOwner);
    
    // Ruta para desactivar un propietario (cambiar status a inactivo)
    app.route("/api/owners/public/:id/deactivate").patch(this.ownerController.deactivateOwner);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/owners").get(authMiddleware,this.ownerController.getAllOwners);
    app.route("/api/owners").post(authMiddleware,this.ownerController.createOwner);
    app.route("/api/owners/:id").get(authMiddleware,this.ownerController.getOwnerById);
    app.route("/api/owners/:id").patch(authMiddleware,this.ownerController.updateOwner);
    app.route("/api/owners/:id").delete(authMiddleware,this.ownerController.deleteOwner);
    
    // Ruta para desactivar un propietario (cambiar status a inactivo)
    app.route("/api/owners/:id/deactivate").patch(authMiddleware,this.ownerController.deactivateOwner);
  }
}