import { Application } from "express";
import { RoleUserController } from '../../controllers/authorization/RoleUser.controller';

export class RoleUserRoutes {
  public roleUserController: RoleUserController = new RoleUserController();

  public routes(app: Application): void {
    // Rutas CRUD para relaciones usuario-rol
    app.route("/api/role-users").get(this.roleUserController.getAllRoleUsers);
    app.route("/api/role-users").post(this.roleUserController.createRoleUser);
    app.route("/api/role-users/:id").get(this.roleUserController.getRoleUserById);
    app.route("/api/role-users/:id").patch(this.roleUserController.updateRoleUser);
    app.route("/api/role-users/:id").delete(this.roleUserController.deleteRoleUser);
    
    // Ruta para eliminación lógica (marcar como inactivo)
    app.route("/api/role-users/:id/deactivate").patch(this.roleUserController.deleteRoleUserAdv);
  }
}