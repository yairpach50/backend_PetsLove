import { Application } from "express";
import { ResourceController } from '../../controllers/authorization/Resource.controller';

export class ResourceRoutes {
  public resourceController: ResourceController = new ResourceController();

  public routes(app: Application): void {
    // Rutas CRUD para recursos
    app.route("/api/resources").get(this.resourceController.getAllResources);
    app.route("/api/resources").post(this.resourceController.createResource);
    app.route("/api/resources/:id").get(this.resourceController.getResourceById);
    app.route("/api/resources/:id").patch(this.resourceController.updateResource);
    app.route("/api/resources/:id").delete(this.resourceController.deleteResource);
    
    // Ruta para eliminación lógica (marcar como inactivo)
    app.route("/api/resources/:id/deactivate").patch(this.resourceController.deleteResourceAdv);
  }
}