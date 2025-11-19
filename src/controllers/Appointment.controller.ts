import { Request, Response } from 'express';
import { Appointment, AppointmentI } from '../models/Appointment';
import { Pet } from '../models/Pet';
import { Veterinarian } from '../models/Veterinarian';

export class AppointmentController {

  // Obtener todas las citas con nombre de mascota y veterinario
  public async getAllAppointments(req: Request, res: Response) {
    try {
      const appointments = await Appointment.findAll({
        include: [
          { model: Pet, as: 'mascota', attributes: ['id', 'name'] },
          { model: Veterinarian, as: 'veterinario', attributes: ['id', 'name'] }
        ]
      });

    res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las citas" });
    }
  }
  
  // Obtener una cita por ID
  public async getAppointmentById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByPk(id);
      if (appointment) {
        res.status(200).json(appointment);
      } else {
        res.status(404).json({ error: 'Cita no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la cita' });
    }
  }

  // Crear una nueva cita
  public async createAppointment(req: Request, res: Response): Promise<void> {
    const { pet_id, veterinarian_id, date, reason, status } = req.body;
    try {
      const newAppointment: AppointmentI = await Appointment.create({ pet_id, veterinarian_id, date, reason, status });
      res.status(201).json(newAppointment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una cita
  public async updateAppointment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { pet_id, veterinarian_id, date, reason, status } = req.body;
    try {
      const appointment = await Appointment.findByPk(id);
      if (appointment) {
        await appointment.update({ pet_id, veterinarian_id, date, reason, status });
        res.status(200).json(appointment);
      } else {
        res.status(404).json({ error: 'Cita no encontrada' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Marcar una cita como completada
  public async completeAppointment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const appointment = await Appointment.findByPk(id);
      if (appointment) {
        await appointment.update({ status: "completado" });
        res.status(200).json({ message: 'Cita marcada como completada' });
      } else {
        res.status(404).json({ error: 'Cita no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al completar la cita' });
    }
  }

  // Eliminar una cita físicamente
  public async deleteAppointment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const appointment = await Appointment.findByPk(id);
      if (appointment) {
        await appointment.destroy();
        res.status(200).json({ message: 'Cita eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Cita no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la cita' });
    }
  }

  // Cancelar una cita (equivalente a eliminación lógica)
  public async cancelAppointment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const appointment = await Appointment.findByPk(id);
      if (appointment) {
        await appointment.update({ status: "cancelado" });
        res.status(200).json({ message: 'Cita cancelada correctamente' });
      } else {
        res.status(404).json({ error: 'Cita no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al cancelar la cita' });
    }
  }
}
