import {sequelize} from '../models';

export default {
    Query: {
      getCreatures: async (parent, {filter, first, offset}, {models}) => {
        return await models.Creature.findAndCountAll({
          offset: offset, 
          limit: first,
          order:[
              ['frname', 'ASC'],
          ],
          where: {
            $or: [
              {frname: sequelize.where(sequelize.fn('LOWER', sequelize.col('frname')), 'LIKE', '%' + filter + '%')},
              {enname: sequelize.where(sequelize.fn('LOWER', sequelize.col('enname')), 'LIKE', '%' + filter + '%')}
            ] 
          }
        });
      },
      getCreature: async (parent, {id}, {models}) => { 
        let creature = await models.Creature.findByPk(
          id,
          {
            include: [{
              model: models.Morality
            },
            {
              model: models.Attitude
            },
            {
              model: models.Size
            },
            { model: models.Type/*, as: 'creat_types'*/ }
            ]
          }
        );

        
        // Alignment = attitude + morality
        let attitude = creature.attitude ? creature.attitude['label'] + ' ' : '';
        let morality = creature.morality ? creature.morality['label'] : '';
        creature.alignment = attitude + morality;
        // Size
        creature.size = creature.size_category ? creature.size_category['label'] : '';
        // Types
        creature.types = creature.type_categories ? creature.type_categories.map(t =>{return t['label']}) : [];

        return creature;
      },
    },
    Mutation: {
      createCreature: async (parent, creature, { models }) => {
        return await sequelize.transaction(async (t) => {
          return await models.Creature.create({    
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