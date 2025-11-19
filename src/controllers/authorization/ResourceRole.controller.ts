import { Request, Response } from 'express';
import { ResourceRole, ResourceRoleI } from '../../models/authorization/ResourceRole';

export class ResourceRoleController {

  // Obtener todas las relaciones recurso-rol
  public async getAllResourceRoles(req: Request, res: Response): Promise<void> {
    try {
      const resourceRoles: ResourceRoleI[] = await ResourceRole.findAll();
      res.status(200).json({ resourceRoles });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las relaciones recurso-rol' });
    }
  }

  // Obtener una relación por ID (solo activos)
  public async getResourceRoleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const resourceRole = await ResourceRole.findOne({ where: { id, is_active: "ACTIVE" } });
      if (resourceRole) {
        res.status(200).json(resourceRole);
      } else {
        res.status(404).json({ error: 'Relación no encontrada o inactiva' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la relación recurso-rol' });
    }
  }

  // Crear una nueva relación recurso-rol
  public async createResourceRole(req: Request, res: Response): Promise<void> {
    const { resource_id, role_id, is_active } = req.body;
    try {
      const newResourceRole: ResourceRoleI = await ResourceRole.create({ resource_id, role_id, is_active });
      res.status(201).json(newResourceRole);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una relación recurso-rol
  public async updateResourceRole(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { resource_id, role_id, is_active } = req.body;
    try {
      const resourceRole = await ResourceRole.findOne({ where: { id, is_active: "ACTIVE" } });
      if (resourceRole) {
        await resourceRole.update({ resource_id, role_id, is_active });
        res.status(200).json(resourceRole);
      } else {
        res.status(404).json({ error: 'Relación no encontrada o inactiva' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar una relación físicamente
  public async deleteResourceRole(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const resourceRole = await ResourceRole.findByPk(id);
      if (resourceRole) {
        await resourceRole.destroy();
        res.status(200).json({ message: 'Relación eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Relación no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la relación recurso-rol' });
    }
  }

  // Eliminar una relación lógicamente (marcar como INACTIVE)
  public async deleteResourceRoleAdv(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const resourceRole = await ResourceRole.findOne({ where: { id, is_active: "ACTIVE" } });
      if (resourceRole) {
        await resourceRole.update({ is_active: "INACTIVE" });
        res.status(200).json({ message: 'Relación marcada como inactiva' });
      } else {
        res.status(404).json({ error: 'Relación no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al marcar la relación como inactiva' });
    }
  }
}
