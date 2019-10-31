export const getAllBill = async self => {
  const result = await self.$http
    .get('/api/billManage/getAllBill', {})
    .catch(error => {
      console.log(error);
    });
  return result;
}

export const getBillByloginId = async (self, loginid) => {
  const result = await self.$http
    .get('/api/billManage/getBillByloginId', {
      params: {
        loginid
      }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
}

export const addBill = async (self, form) => {
  const result = await self.$http
    .post('/api/billManage/addBill', form, {})
    .catch(error => {
      console.log(error);
    });
  return result;
}

export const getBillByItem = async (self, value) => {
  const result = await self.$http
  .get('/api/billManage/getBillByItem', {params: {value}})
  .catch(error => {
    console.log(error);
  });
return result;
}

export const deleteBill = async (self, val) => {
  const result = await self.$http
  .get('/api/billManage/deleteBill', {params: {val}})
  .catch(error => {
    console.log(error);
  });
return result;
}
export const getBillById = async (self, val) => {
  const result = await self.$http
  .get('/api/billManage/getBillById', {params: {val}})
  .catch(error => {
    console.log(error);
  });
return result;
}
