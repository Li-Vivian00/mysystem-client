export const getCountOfUser = async (self) => {
  const result = await self.$http
    .get('/api/dailyNews/getCountOfUser',{})
    .catch(error => {
      console.log(error);
    });
  return result;
}

export const getAvgScore = async (self) => {
  const result = await self.$http
    .get('/api/dailyNews/getAvgScore',{})
    .catch(error => {
      console.log(error);
    });
  return result;
}
