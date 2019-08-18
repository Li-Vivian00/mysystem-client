export const adminCenter = async (self, adminLoginId) => {
    const result = await self.$http
      .get("/api/adminLogin/getAdminInfo", {
        params: {
            adminLoginId: adminLoginId
        }
      })
      .catch(error => {
        console.log(error)
      })
    return result
  }
  