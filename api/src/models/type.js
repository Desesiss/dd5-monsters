const type = (sequelize, DataTypes) => {
    const Type = sequelize.define('type_category', {
      code: {
        type: DataTypes.STRING(3),
        primaryKey: true
      },
      label: {
        type: DataTypes.STRING(100)
      },
      description: {
        type: DataTypes.STRING(2000)
      }
    });
    return Type;
  };
  
  export default type;