export const deleteAdmin = (self, Id) => {
  const result = self.$http
    .post("/api/adminManage/deleteAdmin",
      Id, {}).catch(error => {
      console.log(error.message)
    })
  return result
}

export const getAllAdmin = async (self, adminname) => {
  const result = await self.$http
    .get("/api/adminManage/getAdmin", {

    }).catch(error => {
      console.log(error.message)
    })
  return result
}

export const updateAdmin = async (self, form) => {
  const result = await self.$http
    .post(
      "/api/adminManage/updateAdmin",
      form, {}
    ).catch(error => {
      console.log(error)
    })
  return result
}

export const searchAdmin = async (self, selValue, inpValue) => {
  const result = await self.$http
    .get("/api/adminManage/getOneAdmin", {
      params: {
        item: selValue,
        name: inpValue
      }
    }).catch(error => {
      console.log(error.message)
    })
  return result
}
