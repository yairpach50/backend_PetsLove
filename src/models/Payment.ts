import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db_pets";

export class Payment extends Model {
  public id!: number;
  public appointment_id!: number;
  public amount!: number;
  public method!: "efectivo" | "tarjeta" | "transferencia";
  public date!: Date;
  public status!: "pagado" | "pendiente" | "cancelado";
}

export interface PaymentI {
  id?: number;
  appointment_id: number;
  amount: number;
  method: "efectivo" | "tarjeta" | "transferencia";
  date: Date;
  status?: "pagado" | "pendiente" | "cancelado";
}

Payment.init(
  {
    appointment_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    method: { type: DataTypes.ENUM("efectivo","tarjeta","transferencia"), allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM("pagado","pendiente","cancelado"), defaultValue: "pendiente" },
  },
  { tableName: "payments", sequelize, timestamps: false }
);

