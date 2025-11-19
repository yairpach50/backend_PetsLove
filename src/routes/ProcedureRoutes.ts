import { Application } from "express";
import { ProcedureController } from "../controllers/Procedure.controller";
import { authMiddleware } from "../middleware/auth";

export class ProcedureRoutes {
  public procedureController: ProcedureController = new ProcedureController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/procedures/public").get(this.procedureController.getAllProcedures);
    app.route("/api/procedures/public").post(this.procedureController.createProcedure);
    app.route("/api/procedures/public/:id").get(this.procedureController.getProcedureById);
    app.route("/api/procedures/public/:id").patch(this.procedureController.updateProcedure);
    app.route("/api/procedures/public/:id").delete(this.procedureController.deleteProcedure);
    
    // Desactivar procedimiento
    app.route("/api/procedures/public/:id/deactivate").patch(this.procedureController.deactivateProcedure);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/procedures").get(authMiddleware,this.procedureController.getAllProcedures);
    app.route("/api/procedures").post(authMiddleware,this.procedureController.createProcedure);
    app.route("/api/procedures/:id").get(authMiddleware,this.procedureController.getProcedureById);
    app.route("/api/procedures/:id").patch(authMiddleware,this.procedureController.updateProcedure);
    app.route("/api/procedures/:id").delete(authMiddleware,this.procedureController.deleteProcedure);
    
    // Desactivar procedimiento
    app.route("/api/procedures/public/:id/deactivate").patch(authMiddleware,this.procedureController.deactivateProcedure);
  }
}
