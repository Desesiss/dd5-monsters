import {sequelize} from '../models';

export default {
    Query: {
      getCreatures: async (parent, {filter, first, offset}, {models}) => {
        return await models.Creature.findAll({
          offset: offset, 
          limit: first,
          where: {
            $or: [
              {frname: sequelize.where(sequelize.fn('LOWER', sequelize.col('frname')), 'LIKE', '%' + filter + '%')},
              {enname: sequelize.where(sequelize.fn('LOWER', sequelize.col('enname')), 'LIKE', '%' + filter + '%')}
            ] 
          }
        });
      },
      getCreature: async (parent, {id}, {models}) => { 
        let creature = await models.Creature.findById(id);
        let moralities = await models.Morality.findAll();
        let attitudes = await models.Attitude.findAll();
        let sizes = await models.Size.findAll();
        // Alignment = attitude + morality
        let attitude = creature.attitude_code == null ? null : attitudes.find(item => {return item.code == creature.attitude_code})['label'];
        let morality = creature.morality_code == null ? null : moralities.find(item => {return item.code == creature.morality_code})['label'];
        creature.alignment = (attitude == null ? '' : attitude + ' ') + (morality == null ? '' : morality)
        // Size
        creature.size = creature.size_code == null ? null : sizes.find(item => {return item.code == creature.size_code})['label'];
        return creature;
      },
    },
    Mutation: {
      createCreature: async (parent, creature, { models }) => {
        return await sequelize.transaction(async (t) => {
          await models.Creature.create({    
          frName: creature.frName,
          enName: creature.enName,
          caMin: creature.caMin,
          caMax: creature.caMax,
          pvMin: creature.pvMin,
          pvMax: creature.pvMax,
          morality_code: creature.morality_code,
          attitude_code: creature.attitude_code,
          size_code: creature.size_code
        }).then(async newCrea => {
          await models.Creature_types.bulkCreate(
            creature.type_codes.map(t_code => {return {
              type_code: t_code,
              creature_id: newCrea.id
            }})
          );
          return newCrea.id;
        })});
      },
    }
  };