import { Application } from "express";
import { UserController } from '../../controllers/authorization/User.controller';

export class UserRoutes {
  public userController: UserController = new UserController();

  public routes(app: Application): void {
    // Ruta de autenticación
    app.route("/api/users/login").post(this.userController.login);

    // Rutas CRUD
    app.route("/api/users").get(this.userController.getAllUsers);
    app.route("/api/users").post(this.userController.createUser);
    app.route("/api/users/:id").get(this.userController.getUserById);
    app.route("/api/users/:id").patch(this.userController.updateUser);
    app.route("/api/users/:id").delete(this.userController.deleteUser);
  }
}