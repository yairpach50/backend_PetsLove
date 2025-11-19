import { Request, Response } from "express";
import { PrescriptionMedicine, PrescriptionMedicineI } from "../models/PrescriptionMedicine";

export class PrescriptionMedicineController {
  
  // Obtener todos los registros
  public async getAllPrescriptionMedicines(req: Request, res: Response): Promise<void> {
    try {
      const prescriptionMedicines: PrescriptionMedicineI[] = await PrescriptionMedicine.findAll();
      res.status(200).json({ prescriptionMedicines });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los medicamentos recetados" });
    }
  }

  // Obtener un registro por ID
  public async getPrescriptionMedicineById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const prescriptionMedicine = await PrescriptionMedicine.findByPk(id);
      if (prescriptionMedicine) {
        res.status(200).json(prescriptionMedicine);
      } else {
        res.status(404).json({ error: "Registro no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el registro" });
    }
  }

  // Crear un nuevo registro
  public async createPrescriptionMedicine(req: Request, res: Response): Promise<void> {
    const { prescription_id, medicine_id, dosage, duration, instructions } = req.body;
    try {
      const newPrescriptionMedicine: PrescriptionMedicineI = await PrescriptionMedicine.create({
        prescription_id,
        medicine_id,
        dosage,
        duration,
        instructions,
      });
      res.status(201).json(newPrescriptionMedicine);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un registro existente
  public async updatePrescriptionMedicine(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { prescription_id, medicine_id, dosage, duration, instructions } = req.body;

    try {
      const prescriptionMedicine = await PrescriptionMedicine.findByPk(id);
      if (prescriptionMedicine) {
        await prescriptionMedicine.update({
          prescription_id,
          medicine_id,
          dosage,
          duration,
          instructions,
        });
        res.status(200).json(prescriptionMedicine);
      } else {
        res.status(404).json({ error: "Registro no encontrado" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar un registro
  public async deletePrescriptionMedicine(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const prescriptionMedicine = await PrescriptionMedicine.findByPk(id);
      if (prescriptionMedicine) {
        await prescriptionMedicine.destroy();
        res.status(200).json({ message: "Registro eliminado correctamente" });
      } else {
        res.status(404).json({ error: "Registro no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el registro" });
    }
  }
}
