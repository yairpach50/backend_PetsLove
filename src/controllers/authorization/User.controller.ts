import { Request, Response } from 'express';
import { User, UserI } from '../../models/authorization/User';
import bcrypt from 'bcryptjs';

export class UserController {

  // Obtener todos los usuarios
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: UserI[] = await User.findAll();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }

  // Obtener usuario por ID
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (user) res.status(200).json({ user });
      else res.status(404).json({ message: 'Usuario no encontrado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el usuario' });
    }
  }

  // Crear un nuevo usuario
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, avatar } = req.body;
      const user: UserI = await User.create({ username, email, password, avatar });
      res.status(201).json({ user });
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ error: 'El email ya está registrado' });
      } else {
        res.status(500).json({ error: 'Error al crear el usuario' });
      }
    }
  }

  // Actualizar usuario
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const [updated] = await User.update(req.body, { where: { id } });
      if (updated) {
        const updatedUser = await User.findByPk(id);
        res.status(200).json({ updatedUser });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  }

  // Eliminar usuario
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await User.destroy({ where: { id } });
      if (deleted) res.status(200).json({ message: 'Usuario eliminado' });
      else res.status(404).json({ message: 'Usuario no encontrado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  }

  // Login de usuario
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }

      const isValid = await user.checkPassword(password);
      if (!isValid) {
        res.status(401).json({ message: 'Contraseña incorrecta' });
        return;
      }

      const token = user.generateToken();
      const refreshToken = user.generateRefreshToken();

      res.status(200).json({ user, token, refreshToken });
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  }
}
