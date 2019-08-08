export const register =  (form, self) => {
  let result =  self.$http
    .post("/api/userLogin/addUser", form)
    .catch(error => {
      console.log(error.message)
    })
  return result
}
