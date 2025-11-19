import { Application } from "express";
import { RefreshTokenController } from '../../controllers/authorization/RefreshToken.controller';

export class RefreshTokenRoutes {
  public refreshTokenController: RefreshTokenController = new RefreshTokenController();

  public routes(app: Application): void {
    // Rutas CRUD para refresh tokens
    app.route("/api/refresh-tokens").get(this.refreshTokenController.getAllTokens);
    app.route("/api/refresh-tokens").post(this.refreshTokenController.createToken);
    app.route("/api/refresh-tokens/:id").get(this.refreshTokenController.getTokenById);
    app.route("/api/refresh-tokens/:id").patch(this.refreshTokenController.updateToken);
    app.route("/api/refresh-tokens/:id").delete(this.refreshTokenController.deleteToken);
    
    // Ruta para eliminación lógica (marcar como inactivo)
    app.route("/api/refresh-tokens/:id/deactivate").patch(this.refreshTokenController.deleteTokenAdv);
  }
}