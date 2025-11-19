import { Request, Response } from 'express';
import { VaccineApplication, VaccineApplicationI } from '../models/VaccineApplication';
import { Pet } from '../models/Pet';
import { Vaccine } from '../models/Vaccine';
import { Appointment } from '../models/Appointment';

export class VaccineApplicationController {

  // Obtener todas las aplicaciones de vacunas
  public async getAllApplications(req: Request, res: Response): Promise<void> {
    try {
      const applications: VaccineApplicationI[] = await VaccineApplication.findAll({
        include: [
          { model: Pet, as: 'mascota', attributes: ['id', 'name'] },
          { model: Vaccine, as: 'vacuna', attributes: ['id', 'name'] },
          { model: Appointment, as: 'cita', attributes: ['id', 'date', 'reason'] }
        ]
      });
      res.status(200).json({ applications });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las aplicaciones de vacunas' });
    }
  }

  // Obtener una aplicación por ID
  public async getApplicationById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const application = await VaccineApplication.findByPk(id);
      if (application) {
        res.status(200).json(application);
      } else {
        res.status(404).json({ error: 'Aplicación de vacuna no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la aplicación de vacuna' });
    }
  }

  // Crear una nueva aplicación de vacuna
  public async createApplication(req: Request, res: Response): Promise<void> {
    const { pet_id, vaccine_id, date, dose, status, appointment_id } = req.body;
    try {
      const newApplication: VaccineApplicationI = await VaccineApplication.create({
        pet_id,
        vaccine_id,
        appointment_id,
        date,
        dose,
        status
      });
      res.status(201).json(newApplication);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una aplicación de vacuna
  public async updateApplication(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { pet_id, vaccine_id, appointment_id, date, dose, status } = req.body;
    try {
      const application = await VaccineApplication.findByPk(id);
      if (application) {
        await application.update({ pet_id, vaccine_id, appointment_id, date, dose, status });
        res.status(200).json(application);
      } else {
        res.status(404).json({ error: 'Aplicación de vacuna no encontrada' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar físicamente una aplicación de vacuna
  public async deleteApplication(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const application = await VaccineApplication.findByPk(id);
      if (application) {
        await application.destroy();
        res.status(200).json({ message: 'Aplicación de vacuna eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Aplicación de vacuna no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la aplicación de vacuna' });
    }
  }

  // Marcar una aplicación como aplicada (equivalente a "activar")
  public async markAsApplied(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const application = await VaccineApplication.findByPk(id);
      if (application) {
        await application.update({ status: "aplicada" });
        res.status(200).json({ message: 'Aplicación de vacuna marcada como aplicada' });
      } else {
        res.status(404).json({ error: 'Aplicación de vacuna no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la aplicación de vacuna' });
    }
  }
}
