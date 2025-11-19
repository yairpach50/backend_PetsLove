// models/Resource.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/db_pets";

export class Resource extends Model {
  public id!: number;
  public path!: string;
  public method!: string;
  public is_active!: "ACTIVE" | "INACTIVE";
}

export interface ResourceI {
  id?: number;
  path: string;
  method: string;
  is_active?: "ACTIVE" | "INACTIVE";
}

Resource.init(
  {
    path: { type: DataTypes.STRING, allowNull: false },
    method: { type: DataTypes.STRING, allowNull: false },
    is_active: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  { tableName: "resources", sequelize, timestamps: false }
);

import { ResourceRole } from "./ResourceRole";

Resource.hasMany(ResourceRole, { foreignKey: 'resource_id', sourceKey: "id" });
ResourceRole.belongsTo(Resource, { foreignKey: 'resource_id', targetKey: "id" });
