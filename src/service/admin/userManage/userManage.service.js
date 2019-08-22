export const getAllUser = async (self, username) => {
  const result = await self.$http
    .get("/api/userManage/getUser", {

    }).catch(error => {
      console.log(error)
    })
  return result
}

export const deleteUser = async (self, Id) => {
  const result = await self.$http
    .post("/api/userManage/deleteUser",
      Id, {}).catch(error => {
      console.log(error)
    })
  return result
}

export const updateUser = async (self, form) => {
  const result = await self.$http
    .post(
      "/api/userManage/updateUser",
      form, {}
    ).catch(error => {
      console.log(error)
    })
  return result
}

export const searchUser = async (self, selValue, inpValue) => {
  const result = await self.$http
    .get("/api/userManage/getOneUser", {
      params: {
        item: selValue,
        name: inpValue
      }
    }).catch(error => {
      console.log(error)
    })
  return result
}
