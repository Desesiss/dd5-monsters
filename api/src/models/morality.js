const morality = (sequelize, DataTypes) => {
    const Morality = sequelize.define('morality', {
      code: {
        type: DataTypes.STRING(3),
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100)
      },
      description: {
        type: DataTypes.STRING(2000)
      }
    });
    return Morality;
  };
  
  export default morality;