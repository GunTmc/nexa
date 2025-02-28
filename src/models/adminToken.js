import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

const AdminToken = sequelize.define(
  "AdminToken",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    id_admin: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "admin_token",
  },
);

export default AdminToken;
