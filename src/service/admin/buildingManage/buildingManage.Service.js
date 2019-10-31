export const getAllBuilding = async self => {
  const result = await self.$http
    .get('/api/buildingManage/getAllBuilding', {})
    .catch(error => {
      console.log(error);
    });
  return result;
}
export const getRoomByFloorId = async (self, val) => {
  const result = await self.$http
    .get('/api/buildingManage/getRoomByFloorId', {params: {floorId:val}})
    .catch(error => {
      console.log(error);
    });
  return result;
}
