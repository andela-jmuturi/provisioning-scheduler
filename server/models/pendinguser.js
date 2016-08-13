/* eslint-disable new-cap */
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const PendingUser = sequelize.define('PendingUser', {
    firstName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'This email address is invalid'
        }
      }
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    isPending: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    verificationToken: {
      type: DataTypes.STRING(36)
    }
  }, {
    tableName: 'pending_users',
    classMethods: {
      findByToken(token) {
        return this.find({
          where: {
            verificationToken: token
          }
        });
      }
    },
    instanceMethods: {
      toJSON() {
        const values = this.get({ clone: true });
        delete values.password;
        delete values.verificationToken;
        return values;
      }
    },
    hooks: {
      afterValidate: (user) => {
        user.password = bcrypt.hashSync(user.password);
      }
    }
  });

  return PendingUser;
};