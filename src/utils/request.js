import { fetch } from 'dva';
import router from 'umi/router';
import hash from "hash.js";
import { getToken, setToken } from "./token";
import { notification, message } from 'antd';
import CryptoJS from "crypto-js/crypto-js";
import { isAntdPro } from "./utils";

const checkStatus = response => {
    if (response.status === 200) {
        return response;
    }
    const errortext = '网络中断';
    notification.error({
        message: `请求错误 ${response.status}: ${response.url}`,
        description: errortext,
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
};

const cachedSave = response => {
    const authorization = response.headers.get('authorization');
    const contentType = response.headers.get('Content-Type');
    if (authorization) {
        var key = CryptoJS.enc.Utf8.parse("1qaz2wsx3edc4rfv");
        var decrypt = CryptoJS.AES.decrypt(authorization, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        const newToken = CryptoJS.enc.Utf8.stringify(decrypt).toString();
        setToken(newToken);
    }
    if (contentType && contentType.match(/application\/json/i)) {
        // All data is saved as text
        response.clone().text();
    }
    return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default function request(
    url,
    options = {
        expirys: isAntdPro()
    }
) {
    /**
     * Produce fingerprints based on url and parameters
     * Maybe url has the same parameters
     */
    const fingerprint = url + (options.body ? JSON.stringify(options.body) : "");
    const hashcode = hash
        .sha256()
        .update(fingerprint)
        .digest("hex");
    const token = getToken();

    setToken(token);

    const defaultOptions = {
        // credentials: 'include',
        headers: { Authorization: token }
    };
    const newOptions = {
        ...defaultOptions,
        ...options,
        headers: { ...defaultOptions.headers, ...options.headers }
    };
    if (
        newOptions.method === "POST" ||
        newOptions.method === "PUT" ||
        newOptions.method === "DELETE" ||
        newOptions.method === "PATCH"
    ) {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: "application/json",
                "Content-Type": "application/json; charset=utf-8",
                ...newOptions.headers
            };
            newOptions.body = JSON.stringify(newOptions.body);
        } else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: "application/json",
                ...newOptions.headers
            };
        }
    }

    const expirys = options.expirys || 60;
    // options.expirys !== false, return the cache,
    if (options.expirys !== false) {
        const cached = sessionStorage.getItem(hashcode);
        const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
        if (cached !== null && whenCached !== null) {
            const age = (Date.now() - whenCached) / 1000;
            if (age < expirys) {
                const response = new Response(new Blob([cached]));
                return response.json();
            }
            sessionStorage.removeItem(hashcode);
            sessionStorage.removeItem(`${hashcode}:timestamp`);
        }
    }

    return fetch(url, newOptions)
        .then(checkStatus)
        .then(response => cachedSave(response, hashcode))
        .then(response => {
            // DELETE and 204 do not return data by default
            // using .json will report an error.
            const nResponse = response.json();
            return nResponse;
        })
        .then(response => {
            // 进行错误处理
            if (response.status === -1) {
                if (response.errCode === "1004") {
                    /* eslint-disable no-underscore-dangle */
                } else if (response.errCode === "1006") {
                    window.g_app._store.dispatch({
                        type: "login/changeBindMobile",
                        payload: { value: true }
                    });
                } else if (response.errCode === "1100") {
                    window.g_app._store.dispatch({
                        type: "login/menuAndPermission"
                    });
                    this.props.histroy.push("/403");
                } else if (
                    response.errCode === "1001011" ||
                    response.errCode === "1003"
                ) {
                    localStorage.removeItem("userId");
                    localStorage.removeItem("token");
                }
            }
            return response;
        })
        .catch(e => {
            if (e.toString() === "TypeError: Failed to fetch") {
                notification.error({
                    message: `网络中断`,
                    description: `请检查网络连接`,
                });
            }
        });
}


