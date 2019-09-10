export const getAllOpinionInfo = async self => {
    const result = await self.$http
      .get('/api/repairManage/getAllOpinionInfo', {})
      .catch(error => {
        console.log(error);
      });
    return result;
  };
  
  export const updateOpinionInfo = async (self, form) => {
    const result = await self.$http
      .post('/api/repairManage/updateOpinionInfo', form, {})
      .catch(error => {
        console.log(error);
      });
    return result;
  };
  
  export const getOpinionInfoByItem = async (self, selValue) => {
    const result = await self.$http
      .get('/api/repairManage/getOpinionInfoByItem', {
        params: { item: selValue }
      })
      .catch(error => {
        console.log(error);
      });
    return result;
  };
  