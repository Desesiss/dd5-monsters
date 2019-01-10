const attitude = (sequelize, DataTypes) => {
    const Attitude = sequelize.define('attitude', {
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
    return Attitude;
  };
  
  export default attitude;