import { Request, Response } from 'express';
import { RefreshToken, RefreshTokenI } from '../../models/authorization/RefreshToken';

export class RefreshTokenController {

  // Obtener todos los refresh tokens
  public async getAllTokens(req: Request, res: Response): Promise<void> {
    try {
      const tokens: RefreshTokenI[] = await RefreshToken.findAll();
      res.status(200).json({ tokens });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los tokens' });
    }
  }

  // Obtener un token por ID (solo activos)
  public async getTokenById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const token = await RefreshToken.findOne({ where: { id, is_valid: "ACTIVE" } });
      if (token) {
        res.status(200).json(token);
      } else {
        res.status(404).json({ error: 'Token no encontrado o inactivo' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el token' });
    }
  }

  // Crear un nuevo token
  public async createToken(req: Request, res: Response): Promise<void> {
    const { user_id, token, device_info, expires_at, is_valid } = req.body;
    try {
      const newToken: RefreshTokenI = await RefreshToken.create({ user_id, token, device_info, expires_at, is_valid });
      res.status(201).json(newToken);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un token
  public async updateToken(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { token, device_info, expires_at, is_valid } = req.body;
    try {
      const refreshToken = await RefreshToken.findOne({ where: { id, is_valid: "ACTIVE" } });
      if (refreshToken) {
        await refreshToken.update({ token, device_info, expires_at, is_valid });
        res.status(200).json(refreshToken);
      } else {
        res.status(404).json({ error: 'Token no encontrado o inactivo' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar un token físicamente
  public async deleteToken(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const refreshToken = await RefreshToken.findByPk(id);
      if (refreshToken) {
        await refreshToken.destroy();
        res.status(200).json({ message: 'Token eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Token no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el token' });
    }
  }

  // Eliminar un token lógicamente (marcar como INACTIVE)
  public async deleteTokenAdv(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const refreshToken = await RefreshToken.findOne({ where: { id, is_valid: "ACTIVE" } });
      if (refreshToken) {
        await refreshToken.update({ is_valid: "INACTIVE" });
        res.status(200).json({ message: 'Token marcado como inactivo' });
      } else {
        res.status(404).json({ error: 'Token no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al marcar el token como inactivo' });
    }
  }
}
