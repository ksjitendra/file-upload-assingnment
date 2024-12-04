import { Table, Column, Model, DataType, DeletedAt } from "sequelize-typescript";


/// Not - will driven the uploadedAt from the createdAt
@Table({
        tableName: 'files',
        timestamps: true,
        paranoid: true
})
    export class Files extends Model<Files> {
        @Column({
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        })
        id: number;
    
        @Column({
            type: DataType.STRING,
            allowNull: false,

        })
        name: string;
    
        @Column({
            type: DataType.STRING,
            allowNull: false,
        })
        path: string;

        @Column({
            type: DataType.INTEGER,
            allowNull: false,
            field: 'uploaded_by'
        })
        uploadedBy: number

        @DeletedAt
        @Column({
            type: DataType.DATE
        })
        deletedAt: Date
    }