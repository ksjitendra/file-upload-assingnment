
import { Table, Column, Model, DataType, DeletedAt,  } from "sequelize-typescript";  

@Table({
    tableName: 'users',
    timestamps: true,
    paranoid: true
})
export class Users extends Model<Users> {

    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true

    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;  
    
    @DeletedAt
    @Column({
        type: DataType.DATE
    })
    deletedAt: Date

}