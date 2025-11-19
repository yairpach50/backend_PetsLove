import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db_pets";

export class Laboratory extends Model {
  public id!: number;
  public pet_id!: number;
  public test_name!: string;
  public result!: string;
  public date!: Date;
  public status!: "ACTIVE" | "INACTIVE";
}

export interface LaboratoryI {
  id?: number;
  pet_id: number;
  test_name: string;
  result: string;
  date: Date;
  status?: "ACTIVE" | "INACTIVE";
}

Laboratory.init(
  {
    pet_id: { type: DataTypes.INTEGER, allowNull: false },
    test_name: { type: DataTypes.STRING, allowNull: false },
    result: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM("ACTIVE","INACTIVE"), defaultValue: "ACTIVE" },
  },
  { tableName: "laboratories", sequelize, timestamps: false}
);