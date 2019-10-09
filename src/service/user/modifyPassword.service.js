export const userModifyPasswordByPhone = async (self, formData) => {
  const result = await self.$http
    .post('/api/userLogin/modifyPassword', formData)
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const adminModifyPasswordByPhone = async (self, formData) => {
  const result = await self.$http
    .post('/api/adminLogin/modifyPassword', formData)
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const getAdminPhone = async (self, phone) => {
  const result = await self.$http
    .get('/api/adminLogin/getAdminPhone', {
      params: {
        phone: phone
      }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const userModifyPassword = async (self, loginid, newPass) => {
  const result = await self.$http
    .get('/api/user/userModifyPassword', {
      params: { newPassword: newPass, loginId: loginid }
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};
