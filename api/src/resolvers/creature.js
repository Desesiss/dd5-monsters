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
        let attitude = creature.attitude_code == null ? null : attitudes.find(item => {return item.code == creature.attitude_code})['name'];
        let morality = creature.morality_code == null ? null : moralities.find(item => {return item.code == creature.morality_code})['name'];
        creature.alignment = (attitude == null ? '' : attitude + ' ') + (morality == null ? '' : morality)
        // Size
        creature.size = creature.size_code == null ? null : sizes.find(item => {return item.code == creature.size_code})['name'];
        return creature;
      },
    },
    Mutation: {
      createCreature: async (parent, creature, { models }) => {
        let attitude = null;
        let morality = null;
        if(creature.alignment_code.contains('-')){
          [attitude, morality] = creature.alignment_code.split('-');
        }
        return await models.Creature.create({    
          frName: creature.frName,
          enName: creature.enName,
          caMin: creature.caMin,
          caMax: creature.caMax,
          pvMin: creature.pvMin,
          pvMax: creature.pvMax,
          morality_code: morality,
          attitude_code: attitude,
          size_code: creature.size_code
          // TODO: associations
        });
      },
    }
  };