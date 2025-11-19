import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db_pets";
import { VaccineApplication } from "./VaccineApplication";
import { Payment } from "./Payment";
import { Prescription } from "./Prescription";
import { Procedure } from "./Procedure";

export class Appointment extends Model {
  public id!: number;
  public pet_id!: number;
  public veterinarian_id!: number;
  public date!: Date;
  public reason!: string;
  public status!: "programado" | "completado" | "cancelado";
}

export interface AppointmentI {
  id?: number;
  pet_id: number;
  veterinarian_id: number;
  date: Date;
  reason: string;
  status?: "programado" | "completado" | "cancelado";
}

Appointment.init(
  {
    pet_id: { type: DataTypes.INTEGER, allowNull: false },
    veterinarian_id: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    reason: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM("programado","completado","cancelado"), defaultValue: "programado" },
  },
  { tableName: "appointments", sequelize, timestamps: false }
);


// RELACIONES

// Una cita puede tener varias aplicaciones de vacunas
Appointment.hasMany(VaccineApplication, { 
  foreignKey: "appointment_id", 
  sourceKey: "id", 
  as: "aplicaciones_vacunas" 
});
VaccineApplication.belongsTo(Appointment, { 
  foreignKey: "appointment_id", 
  targetKey: "id", 
  as: "cita" 
});

// Cada cita tiene un único pago asociado
Appointment.hasOne(Payment, { 
  foreignKey: "appointment_id", 
  sourceKey: "id", 
  as: "pago" 
});
Payment.belongsTo(Appointment, { 
  foreignKey: "appointment_id", 
  targetKey: "id", 
  as: "cita" 
});

// Una cita puede generar varias recetas médicas
Appointment.hasMany(Prescription, { 
  foreignKey: "appointment_id", 
  sourceKey: "id", 
  as: "recetas" 
});
Prescription.belongsTo(Appointment, { 
  foreignKey: "appointment_id", 
  targetKey: "id", 
  as: "cita" 
});

// Una cita puede tener muchos procedimientos
Appointment.hasMany(Procedure, { 
  foreignKey: "appointment_id", 
  as: "procedimientos" 
});
Procedure.belongsTo(Appointment, { 
  foreignKey: "appointment_id", 
  as: "cita" 
});