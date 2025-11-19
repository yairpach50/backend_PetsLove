import { Application } from "express";
import { AppointmentController } from '../controllers/Appointment.controller';
import { authMiddleware } from "../middleware/auth";

export class AppointmentRoutes {
  public appointmentController: AppointmentController = new AppointmentController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    // Rutas CRUD para citas
    app.route("/api/appointments/public").get(this.appointmentController.getAllAppointments);
    app.route("/api/appointments/public").post(this.appointmentController.createAppointment);
    app.route("/api/appointments/public/:id").get(this.appointmentController.getAppointmentById);
    app.route("/api/appointments/public/:id").patch(this.appointmentController.updateAppointment);
    app.route("/api/appointments/public/:id").delete(this.appointmentController.deleteAppointment);
    
    // Ruta para cancelar una cita (actualización de estado)
    app.route("/api/appointments/public/:id/cancel").patch(this.appointmentController.cancelAppointment);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/appointments").get(authMiddleware,this.appointmentController.getAllAppointments);
    app.route("/api/appointments").post(authMiddleware,this.appointmentController.createAppointment);
    app.route("/api/appointments/:id").get(authMiddleware,this.appointmentController.getAppointmentById);
    app.route("/api/appointments/:id").patch(authMiddleware,this.appointmentController.updateAppointment);
    app.route("/api/appointments/:id").delete(authMiddleware,this.appointmentController.deleteAppointment);

    // Marcar como completada
    app.route("/api/appointments/:id/complete").patch(authMiddleware, this.appointmentController.completeAppointment);
    
    // Ruta para cancelar una cita (actualización de estado)
    app.route("/api/appointments/:id/cancel").patch(authMiddleware,this.appointmentController.cancelAppointment);
  }
}