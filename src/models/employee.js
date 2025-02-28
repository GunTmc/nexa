import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

const Employee = sequelize.define("Employee", {
    id: {
        type: DataTypes.INTEGER,
    },
    nip: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    gend: {
        type: DataTypes.ENUM("Laki-laki", "Perempuan"),
        allowNull: true,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tgl_lahir: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    insert_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    insert_by: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    update_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    update_by: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "karyawan",
    timestamps: false,
});

export default Employee;

