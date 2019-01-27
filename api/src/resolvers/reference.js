

export default {
    Query: {
      getReferences: async (parent, {references}, {models}) => {
        let result = {};

        if(references){
          for(let ref of references){
            result[ref] = await models[ref].findAll();
          }
        }
        return result;
      },
      
      getAlignment: async (parent, {}, {models}) => {
        const moralities = await models.Morality.findAll();
        const attitudes = await models.Attitude.findAll();
        const alignments = [];
        attitudes.forEach(att => {
            moralities.forEach( moral => {
              alignments.push({
                code: att.code + '-' + moralities.code,
                label: att.label + ' ' + moralities.label,
                descriptions: [att.description, moralities.description]
              });
            });
        });
      },
      getSize: async (parent, {}, {models}) => {
        return await models.Size.findAll();
      }
    }
  };