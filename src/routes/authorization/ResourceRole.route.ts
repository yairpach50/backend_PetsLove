import { Application } from "express";
import { ResourceRoleController } from '../../controllers/authorization/ResourceRole.controller';

export class ResourceRoleRoutes {
  public resourceRoleController: ResourceRoleController = new ResourceRoleController();

  public routes(app: Application): void {
    // Rutas CRUD para relaciones recurso-rol
    app.route("/api/resource-roles").get(this.resourceRoleController.getAllResourceRoles);
    app.route("/api/resource-roles").post(this.resourceRoleController.createResourceRole);
    app.route("/api/resource-roles/:id").get(this.resourceRoleController.getResourceRoleById);
    app.route("/api/resource-roles/:id").patch(this.resourceRoleController.updateResourceRole);
    app.route("/api/resource-roles/:id").delete(this.resourceRoleController.deleteResourceRole);
    
    // Ruta para eliminación lógica (marcar como inactivo)
    app.route("/api/resource-roles/:id/deactivate").patch(this.resourceRoleController.deleteResourceRoleAdv);
  }
}