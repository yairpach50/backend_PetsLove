import { Request, Response } from 'express';
import { Payment, PaymentI } from '../models/Payment';
import { Appointment } from '../models/Appointment';

export class PaymentController {

  // Obtener todos los pagos
  public async getAllPayments(req: Request, res: Response): Promise<void> {
    try {
      const payments: PaymentI[] = await Payment.findAll({
              include: [
                { model: Appointment, as: 'cita', attributes: ['id', 'date', 'reason'] },
              ]
            });
      res.status(200).json( payments );
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los pagos' });
    }
  }

  // Obtener un pago por ID
  public async getPaymentById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(id);
      if (payment) {
        res.status(200).json(payment);
      } else {
        res.status(404).json({ error: 'Pago no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el pago' });
    }
  }

  // Crear un nuevo pago
  public async createPayment(req: Request, res: Response): Promise<void> {
    const { appointment_id, amount, method, date, status } = req.body;
    try {
      const newPayment: PaymentI = await Payment.create({ appointment_id, amount, method, date, status });
      res.status(201).json(newPayment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un pago
  public async updatePayment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { appointment_id, amount, method, date, status } = req.body;
    try {
      const payment = await Payment.findByPk(id);
      if (payment) {
        await payment.update({ appointment_id, amount, method, date, status });
        res.status(200).json(payment);
      } else {
        res.status(404).json({ error: 'Pago no encontrado' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar un pago físicamente
  public async deletePayment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      if (payment) {
        await payment.destroy();
        res.status(200).json({ message: 'Pago eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Pago no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el pago' });
    }
  }

  // Aplicar un pago (marcar como pagado)
  public async applyPayment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      if (payment) {
        await payment.update({ status: "pagado" });
        res.status(200).json({ message: "Pago aplicado correctamente" });
      } else {
        res.status(404).json({ error: "Pago no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al aplicar el pago" });
    }
  }

  // Cancelar un pago (equivalente a eliminación lógica)
  public async cancelPayment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      if (payment) {
        await payment.update({ status: "cancelado" });
        res.status(200).json({ message: 'Pago cancelado correctamente' });
      } else {
        res.status(404).json({ error: 'Pago no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al cancelar el pago' });
    }
  }
}
