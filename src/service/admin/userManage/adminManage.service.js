export const deleteAdmin = (self, id) => {
  const result = self.$http
    .post("/api/adminManage/deleteAdmin", {
      id: id
    }, {}).catch(error => {
      console.log(error.message)
    })
  return result
}

export const getAllAdmin = async (self, adminname) => {
  const result = await self.$http
    .get("/api/adminManage/getAdmin", {
      params: {
        name: adminname
      }
    }).catch(error => {
      console.log(error.message)
    })
  return result
}

export const updateAdmin = (self, loginid, adminname, password, email, phone, card) => {
  const result = self.$http
    .post(
      "/api/adminManage/updateAdmin", {
        loginid: loginid,
        adminname: adminname,
        password: password,
        email: email,
        phone: phone,
        card: card
      }, {}
    ).catch(error => {
      console.log(error.message)
    })
  return result
}

export const searchAdmin = async (self, selValue, inpValue) => {
  const result = await self.$http
    .get("/api/adminManage/getOneAdmin", {
      params: {
        id: selValue,
        name: inpValue
      }
    }).catch(error => {
      console.log(error.message)
    })
  return result
}
