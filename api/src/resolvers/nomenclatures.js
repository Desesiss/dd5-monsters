

export default {
    Query: {
      getAlignment: async (parent, {}, {models}) => {
        const moralities = await models.Morality.findAll();
        const attitudes = await models.Attitude.findAll();
        const alignments = [];
        attitudes.forEach(att => {
            moralities.forEach( moral => {
              alignments.push({
                code: att.code + '-' + moralities.code,
                name: att.name + ' ' + moralities.name,
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