import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db_pets";
import { MedicalHistory } from "./MedicalHistory";
import { Appointment } from "./Appointment";
import { Procedure } from "./Procedure";
import { Laboratory } from "./Laboratory";
import { VaccineApplication } from "./VaccineApplication";


export class Pet extends Model {
  public id!: number;
  public name!: string;
  public birth_date!: Date;
  public type!: string;
  public color!: string;
  public owner_id!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

export interface PetI {
  id?: number;
  name: string;
  birth_date: Date;
  type: string;
  color: string;
  owner_id: number;
  status?: "ACTIVE" | "INACTIVE";
}

Pet.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    birth_date: { type: DataTypes.DATE, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    owner_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  { tableName: "pets", sequelize, timestamps: false }
);


// RELACIONES

// Una mascota tiene una única historia clínica
Pet.hasOne(MedicalHistory, { 
  foreignKey: "pet_id", 
  sourceKey: "id", 
  as: "historia_clinica" 
});
MedicalHistory.belongsTo(Pet, { 
  foreignKey: "pet_id", 
  targetKey: "id", 
  as: "mascota" 
});

// Una mascota puede tener muchas citas veterinarias
Pet.hasMany(Appointment, { 
  foreignKey: "pet_id", 
  sourceKey: "id", 
  as: "citas" 
});
Appointment.belongsTo(Pet, { 
  foreignKey: "pet_id", 
  targetKey: "id", 
  as: "mascota" 
});

// Una mascota puede tener muchos procedimientos realizados
Pet.hasMany(Procedure, { 
  foreignKey: "pet_id", 
  sourceKey: "id", 
  as: "procedimientos" 
});
Procedure.belongsTo(Pet, { 
  foreignKey: "pet_id", 
  targetKey: "id", 
  as: "mascota" 
});

// Una mascota puede tener muchos estudios de laboratorio
Pet.hasMany(Laboratory, { 
  foreignKey: "pet_id", 
  sourceKey: "id", 
  as: "laboratorios" 
});
Laboratory.belongsTo(Pet, { 
  foreignKey: "pet_id", 
  targetKey: "id", 
  as: "mascota" 
});

// Una mascota puede tener muchas aplicaciones de vacunas
Pet.hasMany(VaccineApplication, { 
  foreignKey: "pet_id", 
  sourceKey: "id", 
  as: "vacunas_aplicadas" 
});
VaccineApplication.belongsTo(Pet, { 
  foreignKey: "pet_id", 
  targetKey: "id", 
  as: "mascota" 
});