import { Request, Response } from 'express';
import { sequelize } from "../database/db_pets";
import { Prescription, PrescriptionI } from '../models/Prescription';
import { Appointment } from '../models/Appointment';
import { PrescriptionMedicine } from '../models/PrescriptionMedicine';
import { Medicine } from '../models/Medicine';

export class PrescriptionController {

  // Obtener todas las prescripciones
  public async getAllPrescriptions(req: Request, res: Response): Promise<void> {
    try {
      const prescriptions: PrescriptionI[] = await Prescription.findAll({
        include: [
          { 
            model: Appointment, 
            as: 'cita', 
            attributes: ['id', 'date', 'reason'] 
          },
          {
            model: Medicine,
            as: 'medicamentos',
            attributes: ['name', 'description'], 
            through: {
              attributes: ['dosage', 'duration', 'instructions'] 
            }
          }
        ]
      });
      res.status(200).json(prescriptions);
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
    const { appointment_id, name, notes, medicines } = req.body; 

    const t = await sequelize.transaction();

    try {
      const newPrescription = await Prescription.create({
        appointment_id,
        name,
        notes
      }, { transaction: t });

      if (medicines && medicines.length > 0) {
        const prescriptionMedicinesData = medicines.map((med: any) => ({
          prescription_id: newPrescription.id,
          medicine_id: med.medicine_id,
          dosage: med.dosage,
          duration: med.duration,
          instructions: med.instructions
        }));

        await PrescriptionMedicine.bulkCreate(prescriptionMedicinesData, { transaction: t });
      }

      await t.commit();

      res.status(201).json({ message: "Receta creada con éxito", id: newPrescription.id });
    } catch (error: any) {
      await t.rollback();
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una prescripción
  public async updatePrescription(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { appointment_id, name, notes, medicines } = req.body; 

    const t = await sequelize.transaction(); 

    try {
      const prescription = await Prescription.findByPk(id);

      if (!prescription) {
        await t.rollback();
        res.status(404).json({ error: 'Prescripción no encontrada' });
        return;
      }

      await prescription.update({ appointment_id, name, notes }, { transaction: t });

      if (medicines !== undefined) {
        await PrescriptionMedicine.destroy({
          where: { prescription_id: id },
          transaction: t
        });

        if (medicines.length > 0) {
          const prescriptionMedicinesData = medicines.map((med: any) => ({
            prescription_id: id,
            medicine_id: med.medicine_id,
            dosage: med.dosage,
            duration: med.duration,
            instructions: med.instructions
          }));

          await PrescriptionMedicine.bulkCreate(prescriptionMedicinesData, { transaction: t });
        }
      }

      await t.commit();
      res.status(200).json({ message: 'Prescripción actualizada correctamente' });

    } catch (error: any) {
      await t.rollback(); 
      console.error(error);
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
