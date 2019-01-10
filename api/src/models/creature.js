const creature = (sequelize, DataTypes) => {
    const Creature = sequelize.define('creature', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
    });
  /*
    Creature.associate = models => {
        Creature.hasMany(models.Creature_Types, { onDelete: 'CASCADE' });
        Creature.hasMany(models.Creature_Senses, { onDelete: 'CASCADE' });
    };
  */
    return Creature;
  };
  
  export default creature;