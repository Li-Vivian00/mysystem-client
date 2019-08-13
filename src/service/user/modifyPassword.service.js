export const modifyPassword = (self, formData) => {
  const result = self.$http
    .post("/api/user/modifyPassword", formData)
    .catch(error => {
      console.log(error)
    })
  return result
}
