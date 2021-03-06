export const getAllOpinionInfo = async self => {
  const result = await self.$http
    .get('/api/repairManage/getAllOpinionInfo', {})
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const updateOpinionInfo = async (
  self,
  status,
  Id,
  answerContent,
  answer_date
) => {
  const result = await self.$http
    .get(
      '/api/repairManage/updateOpinionInfo',
      {
        params: {
          status: status,
          Id: Id,
          answer_content: answerContent,
          answer_date: answer_date
        }
      },
      {}
    )
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

export const deleteOpinionInfo = async (self, Id) => {
  const result = await self.$http
    .post('/api/repairManage/deleteOpinionInfo', Id, {})
    .catch(error => {
      console.log(error);
    });
  return result;
};
