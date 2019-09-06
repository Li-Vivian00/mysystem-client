export const getAllPhoneModuleInfo = async self => {
  const result = await self.$http
    .get('/api/villaCenter/getPhoneModule', {})
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const updatePhoneModuleInfo = async (self, form) => {
  const result = await self.$http
    .post('/api/villaCenter/updatePhoneModuleInfo', form, {})
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const deletePhoneModule = async (self, id) => {
  const result = await self.$http
    .post('/api/villaCenter/deletePhoneModule', id, {})
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const getOnePhoneModule = async (self, inpValue) => {
  const result = await self.$http
    .get('/api/villaCenter/getOnePhoneModule', {
      params: {
        item: inpValue
      }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};


export const getWarningModuleInfo = async self => {
  const result = await self.$http
  .get('/api/villaCenter/getWarningModuleInfo', {})
  .catch(error => {
    console.log(error);
  });
return result;
}

export const updateWarningModuleInfo = async (self, form) => {
  const result = await self.$http
    .post('/api/villaCenter/updateWarningModuleInfo', form, {})
    .catch(error => {
      console.log(error);
    });
  return result;
}