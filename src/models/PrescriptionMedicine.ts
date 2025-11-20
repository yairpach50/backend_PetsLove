import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db_pets";

export class PrescriptionMedicine extends Model {
  public id!: number;
  public prescription_id!: number;
  public medicine_id!: number;
  public dosage?: string;
  public duration?: string;
  public instructions?: string;
}

export interface PrescriptionMedicineI {
  id?: number;
  prescription_id: number;
  medicine_id: number;
  dosage?: string;
  duration?: string;
  instructions?: string;
}

PrescriptionMedicine.init(
  {
    prescription_id: { type: DataTypes.INTEGER, allowNull: false },
    medicine_id: { type: DataTypes.INTEGER, allowNull: false },
    dosage: { type: DataTypes.STRING, allowNull: true },
    duration: { type: DataTypes.STRING, allowNull: true },
    instructions: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "prescription_medicines",
    sequelize,
    timestamps: false,
  }
);
