import { Request, Response } from 'express';
import { Pet, PetI } from '../models/Pet';
import { Owner } from '../models/Owner';

export class PetController {

  // Obtener todas las mascotas
  public async getAllPets(req: Request, res: Response): Promise<void> {
    try {
      const pets: PetI[] = await Pet.findAll({
        include: [
          { model: Owner, as: 'propietario', attributes: ['id', 'name'] },
        ]
      });
      res.status(200).json( pets );
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las mascotas' });
    }
  }

  // Obtener una mascota por ID
  public async getPetById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pet = await Pet.findByPk(id);
      if (pet) {
        res.status(200).json(pet);
      } else {
        res.status(404).json({ error: 'Mascota no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la mascota' });
    }
  }

  // Crear una nueva mascota
  public async createPet(req: Request, res: Response): Promise<void> {
    const { name, birth_date, type, color, owner_id, status } = req.body;
    try {
      const newPet: PetI = await Pet.create({ name, birth_date, type, color, owner_id, status });
      res.status(201).json(newPet);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una mascota
  public async updatePet(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, birth_date, type, color, owner_id, status } = req.body;
    try {
      const pet = await Pet.findByPk(id);
      if (pet) {
        await pet.update({ name, birth_date, type, color, owner_id, status });
        res.status(200).json(pet);
      } else {
        res.status(404).json({ error: 'Mascota no encontrada' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar una mascota físicamente
  public async deletePet(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const pet = await Pet.findByPk(id);
      if (pet) {
        await pet.destroy();
        res.status(200).json({ message: 'Mascota eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Mascota no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la mascota' });
    }
  }

  // Desactivar una mascota (equivalente a eliminación lógica)
  public async deactivatePet(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const pet = await Pet.findByPk(id);
      if (pet) {
        await pet.update({ status: "INACTIVE" });
        res.status(200).json({ message: 'Mascota marcada como inactiva' });
      } else {
        res.status(404).json({ error: 'Mascota no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al desactivar la mascota' });
    }
  }
}
