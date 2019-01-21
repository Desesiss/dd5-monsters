
import Attitude from './attitude';
import Morality from './morality';
import Size from './size';


const creature = (sequelize, DataTypes) => {
    const Creature = sequelize.define('creature', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      frName: {
        type: DataTypes.STRING(100),
        field: 'frname'
      },
      enName: {
        type: DataTypes.STRING(100),
        field: 'enname'
      },
      caMin: {
        type: DataTypes.INTEGER,
        field: 'camin'
      },
      caMax: {
        type: DataTypes.INTEGER,
        field: 'camax'
      }, 
      pvMin: {
        type: DataTypes.INTEGER,
        field: 'pvmin'
      },	
      pvMax: {
        type: DataTypes.INTEGER,
        field: 'pvmax'
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