// models/RefreshToken.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/db_pets";
import { User } from "./User";

export class RefreshToken extends Model {
  public id!: number;
  public user_id!: number;
  public token!: string;
  public device_info!: string;
  public is_valid!: "ACTIVE" | "INACTIVE";
  public expires_at!: Date;
  public created_at!: Date;
  public updated_at!: Date;
}

export interface RefreshTokenI {
  id?: number;
  user_id: number;
  token: string;
  device_info: string;
  is_valid?: "ACTIVE" | "INACTIVE";
  expires_at: Date;
}

RefreshToken.init(
  {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
    device_info: { type: DataTypes.STRING, allowNull: false },
    is_valid: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
    expires_at: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "refresh_tokens",
    sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Relaciones
User.hasMany(RefreshToken, {
  foreignKey: 'user_id',
  sourceKey: "id",
});
RefreshToken.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: "id",
});