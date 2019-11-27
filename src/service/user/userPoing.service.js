export const handlePoint = async (self, form) => {
  const result = await self.$http
    .post('/api/userPoint/handlePoint', form, {})
    .catch(error => {
      console.log(error);
    });
  return result;
};
