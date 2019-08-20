export const register = async (form, self) => {
  let result = await self.$http
    .post("/api/userLogin/addUser", form)
    .catch(error => {
      console.log(error.message)
    })
  return result
}

export const getUserLoginid = async (self, loginid, from) => {
  const result = await self.$http
    .get("/api/userLogin/getUserLoginid", {
      params: {
        loginId: loginid
      }
    }).catch(error => {
      console.log(error)
    })
    return result
}

export const getUserPhone = async (self, phone) => {
  const result = await self.$http
    .get("/api/userLogin/getUserPhone", {
      params: {
        phone: phone
      }
    }).catch(error => {
      console.log(error)
    })
    return result
}