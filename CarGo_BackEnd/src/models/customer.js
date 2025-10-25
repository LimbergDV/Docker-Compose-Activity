module.exports= (sequelize, DataTypes)=>{

//Define Table CUSTOMER
const Customer = sequelize.define(
    "Customer",{
        id_customer: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        last_names: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING(12),
            allowNull: false,
        },
        CURP: {
            type: DataTypes.STRING(18),
            allowNull: false,
        },
        number_license:{
            type: DataTypes.STRING(18),
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {tableName: "customer",timestamps: false});

    
    return Customer;
};


