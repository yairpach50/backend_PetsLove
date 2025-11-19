import { Application } from "express";
import { PaymentController } from '../controllers/Payment.controller';
import { authMiddleware } from "../middleware/auth";

export class PaymentRoutes {
  public paymentController: PaymentController = new PaymentController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    // Rutas CRUD para pagos
    app.route("/api/payments/public").get(this.paymentController.getAllPayments);
    app.route("/api/payments/public").post(this.paymentController.createPayment);
    app.route("/api/payments/public/:id").get(this.paymentController.getPaymentById);
    app.route("/api/payments/public/:id").patch(this.paymentController.updatePayment);
    app.route("/api/payments/public/:id").delete(this.paymentController.deletePayment);
    
    // Ruta para cancelar un pago (cambiar status a cancelado)
    app.route("/api/payments/public/:id/cancel").patch(this.paymentController.cancelPayment);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/payments").get(authMiddleware,this.paymentController.getAllPayments);
    app.route("/api/payments").post(authMiddleware,this.paymentController.createPayment);
    app.route("/api/payments/:id").get(authMiddleware,this.paymentController.getPaymentById);
    app.route("/api/payments/:id").patch(authMiddleware,this.paymentController.updatePayment);
    app.route("/api/payments/:id").delete(authMiddleware,this.paymentController.deletePayment);

    // Ruta para marcar un pago como pagado 
    app.route("/api/payments/:id/apply").patch(authMiddleware, this.paymentController.applyPayment);
    
    // Ruta para cancelar un pago (cambiar status a cancelado)
    app.route("/api/payments/:id/cancel").patch(authMiddleware,this.paymentController.cancelPayment)

  }
}