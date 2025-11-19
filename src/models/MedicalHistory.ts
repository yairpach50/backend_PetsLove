import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db_pets";

export class MedicalHistory extends Model {
  public id!: number;
  public pet_id!: number;
  public description!: string;
  public date!: Date;
  public status!: "ACTIVE" | "INACTIVE";
}

export interface MedicalHistoryI {
  id?: number;
  pet_id: number;
  description: string;
  date: Date;
  status?: "ACTIVE" | "INACTIVE";
}

MedicalHistory.init(
  {
    pet_id: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE","INACTIVE"), defaultValue: "ACTIVE" },
  },
  { tableName: "medical_histories", sequelize, timestamps: false }
);


