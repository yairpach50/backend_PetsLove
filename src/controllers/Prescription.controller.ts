import { Request, Response } from 'express';
import { Prescription, PrescriptionI } from '../models/Prescription';
import { Appointment } from '../models/Appointment';

export class PrescriptionController {

  // Obtener todas las prescripciones
  public async getAllPrescriptions(req: Request, res: Response): Promise<void> {
    try {
      const prescriptions: PrescriptionI[] = await Prescription.findAll({
              include: [
                { model: Appointment, as: 'cita', attributes: ['id', 'date', 'reason'] },
              ]
            });
      res.status(200).json( prescriptions );
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las prescripciones' });
    }
  }

  // Obtener una prescripción por ID
  public async getPrescriptionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const prescription = await Prescription.findByPk(id);
      if (prescription) {
        res.status(200).json(prescription);
      } else {
        res.status(404).json({ error: 'Prescripción no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la prescripción' });
    }
  }

  // Crear una nueva prescripción
  public async createPrescription(req: Request, res: Response): Promise<void> {
    const { appointment_id, name, notes } = req.body;
    try {
      const newPrescription: PrescriptionI = await Prescription.create({
        appointment_id,
        name,
        notes
      });
      res.status(201).json(newPrescription);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una prescripción
  public async updatePrescription(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { appointment_id, name, notes } = req.body;
    try {
      const prescription = await Prescription.findByPk(id);
      if (prescription) {
        await prescription.update({ appointment_id, name, notes });
        res.status(200).json(prescription);
      } else {
        res.status(404).json({ error: 'Prescripción no encontrada' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar una prescripción físicamente
  public async deletePrescription(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const prescription = await Prescription.findByPk(id);
      if (prescription) {
        await prescription.destroy();
        res.status(200).json({ message: 'Prescripción eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Prescripción no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la prescripción' });
    }
  }
}
