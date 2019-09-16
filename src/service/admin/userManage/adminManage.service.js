export const deleteAdmin = async (self, Id) => {
  const result = await self.$http
    .post('/api/adminManage/deleteAdmin', Id, {})
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const getAllAdmin = async self => {
  const result = await self.$http
    .get('/api/adminManage/getAdmin', {})
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const updateAdmin = async (self, form) => {
  const result = await self.$http
    .post('/api/adminManage/updateAdmin', form, {})
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const searchAdmin = async (self, selValue, inpValue) => {
  const result = await self.$http
    .get('/api/adminManage/getOneAdmin', {
      params: {
        item: selValue,
        name: inpValue
      }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const getAdminLoginid = async (self, loginid) => {
  const result = await self.$http
    .get('/api/adminLogin/getAdminLoginid', {
      params: {
        loginId: loginid
      }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};
