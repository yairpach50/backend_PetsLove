import { Request, Response } from 'express';
import { Laboratory, LaboratoryI } from '../models/Laboratory';
import { Pet } from '../models/Pet';

export class LaboratoryController {

  // Obtener todos los laboratorios
  public async getAllLaboratories(req: Request, res: Response): Promise<void> {
    try {
      const laboratories: LaboratoryI[] = await Laboratory.findAll({
        include: [
          { model: Pet, as: 'mascota', attributes: ['id', 'name'] },
        ]
      });
      res.status(200).json( laboratories );
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los laboratorios' });
    }
  }

  // Obtener un laboratorio por ID
  public async getLaboratoryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const laboratory = await Laboratory.findByPk(id);
      if (laboratory) {
        res.status(200).json(laboratory);
      } else {
        res.status(404).json({ error: 'Laboratorio no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el laboratorio' });
    }
  }

  // Crear un nuevo laboratorio
  public async createLaboratory(req: Request, res: Response): Promise<void> {
    const { pet_id, test_name, result, date, status } = req.body;
    try {
      const newLaboratory: LaboratoryI = await Laboratory.create({ pet_id, test_name, result, date, status });
      res.status(201).json(newLaboratory);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un laboratorio
  public async updateLaboratory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { pet_id, test_name, result, date, status } = req.body;
    try {
      const laboratory = await Laboratory.findByPk(id);
      if (laboratory) {
        await laboratory.update({ pet_id, test_name, result, date, status });
        res.status(200).json(laboratory);
      } else {
        res.status(404).json({ error: 'Laboratorio no encontrado' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar un laboratorio físicamente
  public async deleteLaboratory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const laboratory = await Laboratory.findByPk(id);
      if (laboratory) {
        await laboratory.destroy();
        res.status(200).json({ message: 'Laboratorio eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Laboratorio no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el laboratorio' });
    }
  }

  // Desactivar un laboratorio (equivalente a eliminación lógica)
  public async deactivateLaboratory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const laboratory = await Laboratory.findByPk(id);
      if (laboratory) {
        await laboratory.update({ status: "INACTIVE" });
        res.status(200).json({ message: 'Laboratorio marcado como inactivo' });
      } else {
        res.status(404).json({ error: 'Laboratorio no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al desactivar el laboratorio' });
    }
  }
}
