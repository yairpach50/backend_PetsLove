import { Request, Response } from 'express';
import { RoleUser, RoleUserI } from '../../models/authorization/RoleUser';

export class RoleUserController {

  // Obtener todas las relaciones usuario-rol
  public async getAllRoleUsers(req: Request, res: Response): Promise<void> {
    try {
      const roleUsers: RoleUserI[] = await RoleUser.findAll();
      res.status(200).json({ roleUsers });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las relaciones usuario-rol' });
    }
  }

  // Obtener una relación por ID (solo activos)
  public async getRoleUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const roleUser = await RoleUser.findOne({ where: { id, is_active: "ACTIVE" } });
      if (roleUser) {
        res.status(200).json(roleUser);
      } else {
        res.status(404).json({ error: 'Relación no encontrada o inactiva' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la relación usuario-rol' });
    }
  }

  // Crear una nueva relación usuario-rol
  public async createRoleUser(req: Request, res: Response): Promise<void> {
    const { role_id, user_id, is_active } = req.body;
    try {
      const newRoleUser: RoleUserI = await RoleUser.create({ role_id, user_id, is_active });
      res.status(201).json(newRoleUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una relación usuario-rol
  public async updateRoleUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { role_id, user_id, is_active } = req.body;
    try {
      const roleUser = await RoleUser.findOne({ where: { id, is_active: "ACTIVE" } });
      if (roleUser) {
        await roleUser.update({ role_id, user_id, is_active });
        res.status(200).json(roleUser);
      } else {
        res.status(404).json({ error: 'Relación no encontrada o inactiva' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar una relación físicamente
  public async deleteRoleUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const roleUser = await RoleUser.findByPk(id);
      if (roleUser) {
        await roleUser.destroy();
        res.status(200).json({ message: 'Relación eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Relación no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la relación usuario-rol' });
    }
  }

  // Eliminar una relación lógicamente (marcar como INACTIVE)
  public async deleteRoleUserAdv(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const roleUser = await RoleUser.findOne({ where: { id, is_active: "ACTIVE" } });
      if (roleUser) {
        await roleUser.update({ is_active: "INACTIVE" });
        res.status(200).json({ message: 'Relación marcada como inactiva' });
      } else {
        res.status(404).json({ error: 'Relación no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al marcar la relación como inactiva' });
    }
  }
}
