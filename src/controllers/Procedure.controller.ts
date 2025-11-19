import { Request, Response } from 'express';
import { Procedure, ProcedureI } from '../models/Procedure';
import { Pet } from '../models/Pet';
import { Appointment } from '../models/Appointment';

export class ProcedureController {

  // Obtener todos los procedimientos
  public async getAllProcedures(req: Request, res: Response): Promise<void> {
    try {
      const procedures: ProcedureI[] = await Procedure.findAll({
              include: [
                { model: Pet, as: 'mascota', attributes: ['id', 'name'] },
                { model: Appointment, as: 'cita', attributes: ['id', 'date', 'reason'] }
              ]
            });
      res.status(200).json( procedures );
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los procedimientos' });
    }
  }

  // Obtener un procedimiento por ID
  public async getProcedureById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const procedure = await Procedure.findByPk(id);
      if (procedure) {
        res.status(200).json(procedure);
      } else {
        res.status(404).json({ error: 'Procedimiento no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el procedimiento' });
    }
  }

  // Crear un nuevo procedimiento
  public async createProcedure(req: Request, res: Response): Promise<void> {
    const { pet_id, appointment_id, name, description, date, status } = req.body;
    try {
      const newProcedure: ProcedureI = await Procedure.create({ pet_id, appointment_id, name, description, date, status });
      res.status(201).json(newProcedure);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un procedimiento
  public async updateProcedure(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { pet_id, name, appointment_id, description, date, status } = req.body;
    try {
      const procedure = await Procedure.findByPk(id);
      if (procedure) {
        await procedure.update({ pet_id, appointment_id, name, description, date, status });
        res.status(200).json(procedure);
      } else {
        res.status(404).json({ error: 'Procedimiento no encontrado' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar un procedimiento físicamente
  public async deleteProcedure(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const procedure = await Procedure.findByPk(id);
      if (procedure) {
        await procedure.destroy();
        res.status(200).json({ message: 'Procedimiento eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Procedimiento no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el procedimiento' });
    }
  }

  // Desactivar un procedimiento (equivalente a eliminación lógica)
  public async deactivateProcedure(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const procedure = await Procedure.findByPk(id);
      if (procedure) {
        await procedure.update({ status: "INACTIVE" });
        res.status(200).json({ message: 'Procedimiento marcado como inactivo' });
      } else {
        res.status(404).json({ error: 'Procedimiento no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al desactivar el procedimiento' });
    }
  }
}
