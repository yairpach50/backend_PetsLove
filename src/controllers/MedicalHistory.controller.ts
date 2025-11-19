import { Request, Response } from 'express';
import { MedicalHistory, MedicalHistoryI } from '../models/MedicalHistory';
import { Pet } from '../models/Pet';

export class MedicalHistoryController {

  // Obtener todos los historiales médicos
  public async getAllHistories(req: Request, res: Response): Promise<void> {
    try {
      const histories: MedicalHistoryI[] = await MedicalHistory.findAll({
              include: [
                { model: Pet, as: 'mascota', attributes: ['id', 'name'] },
              ]
            });
      res.status(200).json( histories );
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los historiales médicos' });
    }
  }

  // Obtener un historial médico por ID
  public async getHistoryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const history = await MedicalHistory.findByPk(id);
      if (history) {
        res.status(200).json(history);
      } else {
        res.status(404).json({ error: 'Historial médico no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el historial médico' });
    }
  }

  // Crear un nuevo historial médico
  public async createHistory(req: Request, res: Response): Promise<void> {
    const { pet_id, description, date, status } = req.body;
    try {
      const newHistory: MedicalHistoryI = await MedicalHistory.create({ pet_id, description, date, status });
      res.status(201).json(newHistory);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un historial médico
  public async updateHistory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { pet_id, description, date, status } = req.body;
    try {
      const history = await MedicalHistory.findByPk(id);
      if (history) {
        await history.update({ pet_id, description, date, status });
        res.status(200).json(history);
      } else {
        res.status(404).json({ error: 'Historial médico no encontrado' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar un historial médico físicamente
  public async deleteHistory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const history = await MedicalHistory.findByPk(id);
      if (history) {
        await history.destroy();
        res.status(200).json({ message: 'Historial médico eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Historial médico no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el historial médico' });
    }
  }

  // Desactivar un historial médico (equivalente a eliminación lógica)
  public async deactivateHistory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const history = await MedicalHistory.findByPk(id);
      if (history) {
        await history.update({ status: "INACTIVE" });
        res.status(200).json({ message: 'Historial médico marcado como inactivo' });
      } else {
        res.status(404).json({ error: 'Historial médico no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al desactivar el historial médico' });
    }
  }
}
