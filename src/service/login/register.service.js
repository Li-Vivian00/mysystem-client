export const register = (form, self) => {
  let result = self.$http
    .post("/api/userLogin/addUser", form)
    .catch(error => {
      console.log(error.message)
    })
  return result
}

export const getUser = async (self, loginId) => {
  const result = await self.$http
    .get("/api/userLogin/getUser", {
      params: {
        loginId: loginId
      }
    }).catch(error => {
      console.log(error)
    })
    return result
}
