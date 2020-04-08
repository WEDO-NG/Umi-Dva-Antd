import request from "../utils/request";
import { stringify } from "querystring";

export async function getFirstTagList(params) {
    return request(`/api/v1/tag/next/list?${stringify(params)}`)
}