import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/db_pets";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { RoleUser } from "././RoleUser";

export class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public is_active!: "ACTIVE" | "INACTIVE";
  public avatar!: string;

  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public generateToken(): string {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '5h',
    });
  }

  public generateRefreshToken(): { token: string, expiresAt: Date } {
    const expiresIn = '24h';
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn,
    });
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return { token, expiresAt };
  }
}

export interface UserI {
  id?: number;
  username: string;
  email: string;
  password: string;
  is_active?: "ACTIVE" | "INACTIVE";
  avatar?: string;
}

User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    is_active: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
    avatar: { type: DataTypes.STRING, allowNull: true }
  },
  {
    tableName: "users",
    sequelize,
    timestamps: false,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  }
);

// Relaciones
User.hasMany(RoleUser, {
  foreignKey: 'user_id',
  sourceKey: "id",
});
RoleUser.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: "id",
});
