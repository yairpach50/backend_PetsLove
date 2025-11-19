import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db_pets";
import { Appointment } from "./Appointment";

export class Veterinarian extends Model {
  public id!: number;
  public name!: string;
  public specialty!: string;
  public phone!: string;
  public email!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

export interface VeterinarianI {
  id?: number;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  status?: "ACTIVE" | "INACTIVE";
}

Veterinarian.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    specialty: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false},
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  { tableName: "veterinarians", sequelize, timestamps: false }
);


// RELACIONES

// Un veterinario puede atender muchas citas
Veterinarian.hasMany(Appointment, { 
  foreignKey: "veterinarian_id", 
  sourceKey: "id", 
  as: "citas" 
});
Appointment.belongsTo(Veterinarian, { 
  foreignKey: "veterinarian_id", 
  targetKey: "id", 
  as: "veterinario" 
});

