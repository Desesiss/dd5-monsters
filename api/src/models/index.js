import Sequelize from 'sequelize';

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
    Creature: sequelize.import('./creature')
  };
  
  Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });

  models.Creature.belongsTo(models.Morality, { foreignKey: 'morality_code' });
  models.Creature.belongsTo(models.Attitude, { foreignKey: 'attitude_code' });
  models.Creature.belongsTo(models.Size, { foreignKey: 'size_code' });


export { sequelize, models };