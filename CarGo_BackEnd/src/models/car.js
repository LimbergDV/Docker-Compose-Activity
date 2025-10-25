module.exports= (sequelize, DataTypes)=>{

//Define Table CAR
const Car = sequelize.define(
    "Car",{
        id_car:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        brand:{
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        model:{
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type_car: {
            type: DataTypes.STRING(35),
            allowNull: false,
        },
        plate_number:{
            type:DataTypes.STRING(8),
            allowNull: false,
        },
        price_day: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {tableName: "car", timestamps: false});


    return Car;
};