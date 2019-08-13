export const getAllUser = async (self, username) => {
  const result = await self.$http
    .get("/api/userManage/getUser", {
      params: {
        name: username
      }
    }).catch(error => {
      console.log(error)
    })
  return result
}

export const deleteUser = (self, id) => {
  const result = self.$http
    .post("/api/userManage/deleteUser", {
      id: id
    }, {}).catch(error => {
      console.log(error)
    })
  return result
}

export const updateUser = (self, loginid, username, password, email, phone, card) => {
  const result = self.$http
    .post(
      "/api/userManage/updateUser", {
        loginid: loginid,
        username: username,
        password: password,
        email: email,
        phone: phone,
        card: card
      }, {}
    ).catch(error => {
      console.log(error)
    })
  return result
}

export const searchUser = async (self, selValue, inpValue) => {
    const result = await self.$http
    .get("/api/userManage/getOneUser", {
      params: { id: selValue, name: inpValue }
    }).catch(error => {
        console.log(error)
    })
    return result
}