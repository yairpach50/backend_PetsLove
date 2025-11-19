import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db_pets";

export class Procedure extends Model {
  public id!: number;
  public pet_id!: number;
  public appointment_id!: number;
  public name!: string;
  public description!: string;
  public date!: Date;
  public status!: "ACTIVE" | "INACTIVE";
}

export interface ProcedureI {
  id?: number;
  pet_id: number;
  appointment_id: number;
  name: string;
  description: string;
  date: Date;
  status?: "ACTIVE" | "INACTIVE";
}

Procedure.init(
  {
    pet_id: { type: DataTypes.INTEGER, allowNull: false },
    appointment_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE","INACTIVE"), defaultValue: "ACTIVE" },
  },
  { tableName: "procedures", sequelize, timestamps: false }
);

