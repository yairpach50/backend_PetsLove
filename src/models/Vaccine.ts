import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db_pets";
import { VaccineApplication } from "./VaccineApplication";

export class Vaccine extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public manufacturer!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

export interface VaccineI {
  id?: number;
  name: string;
  description: string;
  manufacturer: string;
  status?: "ACTIVE" | "INACTIVE";
}

Vaccine.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    manufacturer: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE","INACTIVE"), defaultValue: "ACTIVE" },
  },
  { tableName: "vaccines", sequelize, timestamps: false }
);


// RELACIONES

// Una vacuna puede ser aplicada en muchas ocasiones diferentes
Vaccine.hasMany(VaccineApplication, { 
  foreignKey: "vaccine_id", 
  sourceKey: "id", 
  as: "aplicaciones" 
});
VaccineApplication.belongsTo(Vaccine, { 
  foreignKey: "vaccine_id", 
  targetKey: "id", 
  as: "vacuna" 
});
