const Sequelize = require("sequelize");
const {DataTypes} = Sequelize;

module.exports = (sequelize, DataTypes) => {

    const Image = sequelize.define("image", {
        image_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
          },
          file_name: {
            type: DataTypes.STRING, 
          },
          s3_bucket_path: {
            type: DataTypes.STRING, 
          },
          date_created:{
            type: DataTypes.STRING, 
            allowNull: false,
          },
          product_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
              model: 'product',
              key: 'id'
            }},
    }, {
      freezeTableName: true,
      timestamps: false
    })

    return Image
}
