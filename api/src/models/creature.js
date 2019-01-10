
import Attitude from './attitude';
import Morality from './morality';
import Size from './size';


const creature = (sequelize, DataTypes) => {
    const Creature = sequelize.define('creature', {
      frname: {
        type: DataTypes.STRING(100)
      },
      /*id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true 
      },*/
      frname: {
        type: DataTypes.STRING(100)
      },
      enname: {
        type: DataTypes.STRING(100)
      },
      camin: {
        type: DataTypes.INTEGER
      },
      camax: {
        type: DataTypes.INTEGER
      }, 
      pvmin: {
        type: DataTypes.INTEGER
      },	
      pvmax: {
        type: DataTypes.INTEGER
      },/*
      morality_code: {
        type: DataTypes.STRING(3),
        references: {
          model: Morality,
          key: "code",
          deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE // TODO : check possible values
        },
      },
      attitude_code: {
        type: DataTypes.STRING(3),
        references: {
          model: Attitude,
          key: "code",
          deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE // TODO : check possible values
        },
      },
      size_code: {
        type: DataTypes.STRING(3),
        references: {
          model: Size,
          key: "code",
          deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE // TODO : check possible values
        },
      }*/
    });

    
      /*
    Creature.associate = models => {
      Morality.hasMany(models.Creature);
      Attitude.hasMany(models.Creature);
      Size.hasMany(models.Creature);
    };*/
    return Creature;
  };


  
  export default creature;