import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db_pets";
import { Medicine } from "./Medicine";
import { PrescriptionMedicine } from "./PrescriptionMedicine";

export class Prescription extends Model {
  public id!: number;
  public name!: string;
  public notes?: string;
  public appointment_id!: number;
}

export interface PrescriptionI {
  id?: number;
  name: string;
  notes?: string;
  appointment_id: number;
}

Prescription.init(
  {
    appointment_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    notes: { type: DataTypes.TEXT, allowNull: true },
  },
  { tableName: "prescriptions", sequelize, timestamps: false }
);


// RELACIONES

// Una receta puede tener muchos medicamentos (a través de PrescriptionMedicine)
// y un medicamento puede estar en muchas recetas.
Prescription.belongsToMany(Medicine, {
  through: PrescriptionMedicine,
  foreignKey: "prescription_id",
  otherKey: "medicine_id",
  as: "medicamentos",
});