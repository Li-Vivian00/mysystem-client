export const getAllRepairInfo = async self => {
    const result = await self.$http
    .get('/api/repairManage/getAllRepairInfo',{})
    .catch(error => {
        console.log(error);
      });
    return result;
}

export const updateRepairInfo = async (self, form) => {
  const result = await self.$http
  .post('/api/repairManage/updateRepairInfo',form,{})
  .catch(error => {
      console.log(error);
    });
  return result;
}