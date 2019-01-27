
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