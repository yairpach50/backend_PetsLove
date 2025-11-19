import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db_pets";

export class VaccineApplication extends Model {
  public id!: number;
  public pet_id!: number;
  public vaccine_id!: number;
  public appointment_id!: number;
  public date!: Date;
  public dose!: string;
  public status!: "aplicada" | "pendiente";
}

export interface VaccineApplicationI {
  id?: number;
  pet_id: number;
  vaccine_id: number;
  appointment_id: number;
  date: Date;
  dose: string;
  status?: "aplicada" | "pendiente";
}

VaccineApplication.init(
  {
    pet_id: { type: DataTypes.INTEGER, allowNull: false },
    vaccine_id: { type: DataTypes.INTEGER, allowNull: false },
    appointment_id: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    dose: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM("aplicada","pendiente"), defaultValue: "pendiente" },
  },
  { tableName: "vaccine_applications", sequelize, timestamps: false }
);