export const getAllOpinionInfo = async self => {
  const result = await self.$http
    .get('/api/repairManage/getAllOpinionInfo', {})
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const updateOpinionInfo = async (self, status, Id, answerContent) => {
  const result = await self.$http
    .get('/api/repairManage/updateOpinionInfo', {
      params: {
        status: status,
        Id: Id,
        answer_content: answerContent
      }
    }, {})
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const getOpinionInfoByItem = async (self, selValue) => {
  const result = await self.$http
    .get('/api/repairManage/getOpinionInfoByItem', {
      params: {
        item: selValue
      }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};
