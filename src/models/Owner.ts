import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db_pets";
import { Pet } from "./Pet";

export class Owner extends Model {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

export interface OwnerI {
  id?: number;
  name: string;
  phone: string;
  email: string;
  status?: "ACTIVE" | "INACTIVE";
}

Owner.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  { tableName: "owners", sequelize, timestamps: false}
);


// RELACIONES

// Un propietario puede tener muchas mascotas.
Owner.hasMany(Pet, { 
  foreignKey: "owner_id", 
  sourceKey: "id", 
  as: "mascotas" 
});
Pet.belongsTo(Owner, { 
  foreignKey: "owner_id", 
  targetKey: "id", 
  as: "propietario" 
});
