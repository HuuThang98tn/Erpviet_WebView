import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';
const METHOD_PATCH = 'PATCH';
const apiClient = axios.create();

const rateLimitConfig = {
    maxRequests: 10, // Maximum number of requests allowed per time period
    timePeriod: 60000, // Time period in milliseconds (e.g. 1 minute)
    onRateLimited: () => {
        console.log('Rate limit exceeded');
    },
    currentRequests: 0
};
apiClient.interceptors.request.use(requestConfig => {
    // Check if the rate limit has been exceeded
    if (rateLimitConfig.currentRequests >= rateLimitConfig.maxRequests) {
        // If the rate limit has been exceeded, trigger the onRateLimited callback and return a rejected promise
        rateLimitConfig.onRateLimited();
        return Promise.reject(new Error('Rate limit exceeded'));
    }
    // If the rate limit has not been exceeded, increment the currentRequests counter and continue with the request
    rateLimitConfig.currentRequests++;
    return requestConfig;
});

const requestAPI = async (method: any, url: any, headers: any = {}, dataBody: any) => {
    headers['Content-Type'] = headers['Content-Type']
        ? headers['Content-Type']
        : 'application/json';
    headers.accept = 'application/json';

    const config: any = {
        timeout: 10000, // thời gian chờ
        baseURL: "https://erp.izisolution.vn",
        url,
        headers,
        method,
        data: dataBody
    };

    console.log("=============URL=============>", config);
    console.log("dataBodydataBodydataBodydataBody", dataBody);

    if (method === METHOD_GET) {
        config.params = dataBody;
    } else {
        config.data = dataBody;
    }
    return apiClient.request(config)
        .then(async res => {
            // console.log("loloaaaaaaaaaaa", res?.data?.result);
            return res?.data?.result;
        })
        .catch(err => {
            if (err.code === 'ECONNABORTED') {
                throw 'Hết thời gian, không thể kết nối!';
            } else {
                throw `${err}`;
            }
        });
};

export default {
    get({ url, dataBody, headers = {} }: any) {
        return requestAPI(METHOD_GET, url, headers, dataBody);
    },

    post(url: any, dataBody: any, headers = {}) {
        return requestAPI(METHOD_POST, url, headers, dataBody);
    },

    put({ url, dataBody, headers = {} }: any) {
        return requestAPI(METHOD_PUT, url, headers, dataBody);
    },
    patch({ url, dataBody, headers = {} }: any) {
        return requestAPI(METHOD_PATCH, url, headers, dataBody);
    },

    delete({ url, dataBody, headers = {} }: any) {
        return requestAPI(METHOD_DELETE, url, headers, dataBody);
    },
};
