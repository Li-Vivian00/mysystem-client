export const userModifyPassword = async (self, formData) => {
  const result = await self.$http
    .post("/api/userLogin/modifyPassword", formData)
    .catch(error => {
      console.log(error)
    })
  return result
}


export const adminModifyPassword = async (self, formData) => {
  const result =  await self.$http
    .post("/api/adminLogin/modifyPassword", formData)
    .catch(error => {
      console.log(error)
    })
  return result
}


export const getAdminPhone = async (self, phone) => {
  const result = await self.$http
    .get("/api/adminLogin/getAdminPhone", {
      params: {
        phone: phone
      }
    }).catch(error => {
      console.log(error)
    })
    return result
}