export const userCenter = async (self, userLoginId) => {
  const result = await self.$http
    .get("/api/user/getUser", {
      params: {
        userLoginId: userLoginId
      }
    })
    .catch(error => {
      console.log(error)
    })
  return result
}
