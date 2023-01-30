import { httpService } from "./http.service.js"


const STORAGE_KEY = "stay_db"
const BASE_URL = "filter/"
// _createStays()

export const filterServiceReq = {

  queryByText
}


async function queryByText(text) {
  const queryParams = `?text=${text}`;
  const stays = await httpService.get(BASE_URL + queryParams);
  // console.log(stays);
  return stays
}
