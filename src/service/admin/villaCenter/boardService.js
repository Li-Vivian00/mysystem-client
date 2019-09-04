export const getAllPhoneModuleInfo = async self => {
  const result = await self.$http
    .get('/api/villaCenter/getPhoneModule', {})
    .catch(error => {
      console.log(error.message);
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
