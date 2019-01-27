
export default {
    Query: {
      getCreatures: async (parent, {filter, first, offset}, {models}) => {
        return await models.Creature.findAll();
      },
      getCreature: async (parent, {id}, {models}) => { 
        return await models.Creature.findById(id);
      },
    },
    Mutation: {
      createCreature: async (parent, creature, { models }) => {
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
          // TODO: associations
        });
      },
    }
  };