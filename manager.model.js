const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {

    const manager = sequelize.define("manager", {
        name: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
          },
          email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
              notEmpty: true,
              isEmail: true,
            },
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
              len: [7, 60],
            },
          },
          originalname: {
            type: DataTypes.STRING,
        },
        filename: {
            type: DataTypes.STRING,
        },
        path: {
            type: DataTypes.STRING,
        },
        scanStatus: {
          type: DataTypes.BOOLEAN,
          default: true
        },
       size: {
            type: DataTypes.STRING,
        },
        encoded:{
            type: DataTypes.JSON,
        },
          role: {
            type: DataTypes.STRING,
          },
        },
    )

    manager.beforeCreate(async (manager) => {
      manager.password = await manager.generatePasswordHash();
    });
  
    manager.beforeUpdate(async (manager) => {
      manager.password = await manager.generatePasswordHash();
    });
  
    manager.prototype.generatePasswordHash = async function () {
      const saltRounds = 10;
      return await bcrypt.hash(this.password, saltRounds);
    };
    manager.prototype.isPasswordMatch = async function (password) {
      return await bcrypt.compare(password, this.password);
    };

    return manager;

}