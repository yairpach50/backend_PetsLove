import { Request, Response } from 'express';
import { Medicine, MedicineI } from '../models/Medicine';

export class MedicineController {

  // Obtener todos los medicamentos
  public async getAllMedicines(req: Request, res: Response): Promise<void> {
    try {
      const medicines: MedicineI[] = await Medicine.findAll();
      res.status(200).json( medicines );
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los medicamentos' });
    }
  }

  // Obtener un medicamento por ID
  public async getMedicineById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const medicine = await Medicine.findByPk(id);
      if (medicine) {
        res.status(200).json(medicine);
      } else {
        res.status(404).json({ error: 'Medicamento no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el medicamento' });
    }
  }

  // Crear un nuevo medicamento
  public async createMedicine(req: Request, res: Response): Promise<void> {
    const { name, description, stock, price, status } = req.body;
    try {
      const newMedicine: MedicineI = await Medicine.create({ name, description, stock, price, status });
      res.status(201).json(newMedicine);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un medicamento
  public async updateMedicine(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, description, stock, price, status } = req.body;
    try {
      const medicine = await Medicine.findByPk(id);
      if (medicine) {
        await medicine.update({ name, description, stock, price, status });
        res.status(200).json(medicine);
      } else {
        res.status(404).json({ error: 'Medicamento no encontrado' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar un medicamento físicamente
  public async deleteMedicine(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const medicine = await Medicine.findByPk(id);
      if (medicine) {
        await medicine.destroy();
        res.status(200).json({ message: 'Medicamento eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Medicamento no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el medicamento' });
    }
  }

  // Desactivar un medicamento (eliminación lógica)
  public async deactivateMedicine(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const medicine = await Medicine.findByPk(id);
      if (medicine) {
        await medicine.update({ status: "INACTIVE" });
        res.status(200).json({ message: 'Medicamento marcado como inactivo' });
      } else {
        res.status(404).json({ error: 'Medicamento no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al desactivar el medicamento' });
    }
  }
}
