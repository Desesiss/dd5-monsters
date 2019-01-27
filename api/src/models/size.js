const size = (sequelize, DataTypes) => {
    const Size = sequelize.define('size_category', {
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
    return Size;
  };
  
  export default size;