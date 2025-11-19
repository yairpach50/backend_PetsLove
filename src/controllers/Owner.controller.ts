import { Request, Response } from 'express';
import { Owner, OwnerI } from '../models/Owner';

export class OwnerController {

  // Obtener todos los propietarios
  public async getAllOwners(req: Request, res: Response): Promise<void> {
    try {
      const owners: OwnerI[] = await Owner.findAll();
      res.status(200).json( owners );
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los propietarios' });
    }
  }

  // Obtener un propietario por ID
  public async getOwnerById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const owner = await Owner.findByPk(id);
      if (owner) {
        res.status(200).json(owner);
      } else {
        res.status(404).json({ error: 'Propietario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el propietario' });
    }
  }

  // Crear un nuevo propietario
  public async createOwner(req: Request, res: Response): Promise<void> {
    const { name, phone, email, status } = req.body;
    try {
      const newOwner: OwnerI = await Owner.create({ name, phone, email, status });
      res.status(201).json(newOwner);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un propietario
  public async updateOwner(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, phone, email, status } = req.body;
    try {
      const owner = await Owner.findByPk(id);
      if (owner) {
        await owner.update({ name, phone, email, status });
        res.status(200).json(owner);
      } else {
        res.status(404).json({ error: 'Propietario no encontrado' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar un propietario físicamente
  public async deleteOwner(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const owner = await Owner.findByPk(id);
      if (owner) {
        await owner.destroy();
        res.status(200).json({ message: 'Propietario eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Propietario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el propietario' });
    }
  }

  // Desactivar un propietario (equivalente a eliminación lógica)
  public async deactivateOwner(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const owner = await Owner.findByPk(id);
      if (owner) {
        await owner.update({ status: "INACTIVE" });
        res.status(200).json({ message: 'Propietario marcado como inactivo' });
      } else {
        res.status(404).json({ error: 'Propietario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al desactivar el propietario' });
    }
  }
}
