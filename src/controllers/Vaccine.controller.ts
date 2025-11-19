import { Request, Response } from 'express';
import { Vaccine, VaccineI } from '../models/Vaccine';

export class VaccineController {

  // Obtener todas las vacunas
  public async getAllVaccines(req: Request, res: Response): Promise<void> {
    try {
      const vaccines: VaccineI[] = await Vaccine.findAll();
      res.status(200).json( vaccines );
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las vacunas' });
    }
  }

  // Obtener una vacuna por ID
  public async getVaccineById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vaccine = await Vaccine.findByPk(id);
      if (vaccine) {
        res.status(200).json(vaccine);
      } else {
        res.status(404).json({ error: 'Vacuna no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la vacuna' });
    }
  }

  // Crear una nueva vacuna
  public async createVaccine(req: Request, res: Response): Promise<void> {
    const { name, description, manufacturer, status } = req.body;
    try {
      const newVaccine: VaccineI = await Vaccine.create({ name, description, manufacturer, status });
      res.status(201).json(newVaccine);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una vacuna
  public async updateVaccine(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, description, manufacturer, status } = req.body;
    try {
      const vaccine = await Vaccine.findByPk(id);
      if (vaccine) {
        await vaccine.update({ name, description, manufacturer, status });
        res.status(200).json(vaccine);
      } else {
        res.status(404).json({ error: 'Vacuna no encontrada' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar una vacuna físicamente
  public async deleteVaccine(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const vaccine = await Vaccine.findByPk(id);
      if (vaccine) {
        await vaccine.destroy();
        res.status(200).json({ message: 'Vacuna eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Vacuna no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la vacuna' });
    }
  }

  // Desactivar una vacuna (equivalente a eliminación lógica)
  public async deactivateVaccine(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const vaccine = await Vaccine.findByPk(id);
      if (vaccine) {
        await vaccine.update({ status: "INACTIVE" });
        res.status(200).json({ message: 'Vacuna marcada como inactiva' });
      } else {
        res.status(404).json({ error: 'Vacuna no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al desactivar la vacuna' });
    }
  }
}
