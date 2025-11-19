import { Request, Response } from 'express';
import { Veterinarian, VeterinarianI } from '../models/Veterinarian';

export class VeterinarianController {

  // Obtener todos los veterinarios
  public async getAllVeterinarians(req: Request, res: Response): Promise<void> {
    try {
      const veterinarians: VeterinarianI[] = await Veterinarian.findAll();
      res.status(200).json( veterinarians );
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los veterinarios' });
    }
  }

  // Obtener un veterinario por ID
  public async getVeterinarianById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const veterinarian = await Veterinarian.findByPk(id);
      if (veterinarian) {
        res.status(200).json(veterinarian);
      } else {
        res.status(404).json({ error: 'Veterinario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el veterinario' });
    }
  }

  // Crear un nuevo veterinario
  public async createVeterinarian(req: Request, res: Response): Promise<void> {
    const { name, specialty, phone, email, status } = req.body;
    try {
      const newVeterinarian: VeterinarianI = await Veterinarian.create({
        name, specialty, phone, email, status
      });
      res.status(201).json(newVeterinarian);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un veterinario
  public async updateVeterinarian(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, specialty, phone, email, status } = req.body;
    try {
      const veterinarian = await Veterinarian.findByPk(id);
      if (veterinarian) {
        await veterinarian.update({ name, specialty, phone, email, status });
        res.status(200).json(veterinarian);
      } else {
        res.status(404).json({ error: 'Veterinario no encontrado' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar físicamente un veterinario
  public async deleteVeterinarian(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const veterinarian = await Veterinarian.findByPk(id);
      if (veterinarian) {
        await veterinarian.destroy();
        res.status(200).json({ message: 'Veterinario eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Veterinario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el veterinario' });
    }
  }

  // Desactivar un veterinario (eliminación lógica)
  public async deactivateVeterinarian(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const veterinarian = await Veterinarian.findByPk(id);
      if (veterinarian) {
        await veterinarian.update({ status: "INACTIVE" });
        res.status(200).json({ message: 'Veterinario marcado como inactivo' });
      } else {
        res.status(404).json({ error: 'Veterinario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al desactivar el veterinario' });
    }
  }
}
