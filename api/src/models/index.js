import Sequelize from 'sequelize';
import cls from 'continuation-local-storage';

const namespace = cls.createNamespace('dd-monsters');
Sequelize.useCLS(namespace);

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    define: {
      //prevent sequelize from pluralizing table names
      freezeTableName: true,
      timestamps: false,
      underscored: true
    }
  },
);

const models = {
    Attitude: sequelize.import('./attitude'),
    Morality: sequelize.import('./morality'),
    Size: sequelize.import('./size'),
    Type: sequelize.import('./type'),
    Creature: sequelize.import('./creature'),
    Creature_types: sequelize.import('./creature_types')
  };
  
  models.Creature.belongsTo(models.Morality, { foreignKey: 'morality_code' });
  models.Creature.belongsTo(models.Attitude, { foreignKey: 'attitude_code' });
  models.Creature.belongsTo(models.Size, { foreignKey: 'size_code' });

  models.Creature.belongsToMany(models.Type, { through: 'creature_types', foreignKey: 'creature_id' })
  models.Type.belongsToMany(models.Creature, { through: 'creature_types', foreignKey: 'type_code' })

  Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });

export { sequelize, models };