// models/RoleUser.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/db_pets";

export class RoleUser extends Model {
  public id!: number;
  public role_id!: number;
  public user_id!: number;
  public is_active!: "ACTIVE" | "INACTIVE";
}

export interface RoleUserI {
  id?: number;
  role_id: number;
  user_id: number;
  is_active?: "ACTIVE" | "INACTIVE";
}

RoleUser.init(
  {
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.ENUM("ACTIVE","INACTIVE"), defaultValue: "ACTIVE" },
  },
  { tableName: "role_users", sequelize, timestamps: false }
);
