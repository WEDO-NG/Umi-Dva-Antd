import { getFirstTagList } from '../services/common'

export default {
    namespace: "common",
    state: {
    },
    effects: {
        *getFirstTagList({ payload }, { call, put }) {
            const response = yield call(getFirstTagList, payload);
            if (response && response.status === 0) {
                yield put({
                    type: "saveFirstTagList",
                    payload: response
                })
            }
        }

    },
    reducers: {
        saveFirstTagList(state, { payload }) {
            let { detail } = payload
            return { ...state, TagList: detail }
        }
    }
}