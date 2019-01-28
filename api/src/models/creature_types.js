const creature_types = (sequelize, DataTypes) => {
    const Creature_types = sequelize.define('creature_types', {
    });
    return Creature_types;
  };
  
  export default creature_types;