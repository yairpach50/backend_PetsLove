import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db_pets";


export class Medicine extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public stock!: number;
  public price!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

export interface MedicineI {
  id?: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  status?: "ACTIVE" | "INACTIVE";
}

Medicine.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE","INACTIVE"), defaultValue: "ACTIVE" },
  },
  { tableName: "medicines", sequelize, timestamps: false }
);



