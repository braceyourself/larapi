import axios from 'axios';

const createClient = (baseUrl = null, store = null) => {
    const options = {
        baseURL: baseUrl
    };

    if (store !== null && store.getters.get('user') !== null) {
        options.headers = {
            Authorization: `Bearer ${store.getters.get('user').accessToken}`
        };
    }

    const client = axios.create(options);

    client.interceptors.request.use(
        requestConfig => requestconfig,
        requestError => {
            return Promise.reject(requestError);
        }
    );

    client.interceptors.response.use(
        response => response,
        error=>{
            return Promise.reject(error);
        }
    );

    return client;

};

class ApiClient{
    constructor(baseUrl = null){
        this.client = createClient(baseUrl);
    }

    request(method, url, data = null, conf = {}){
        let config = {
            url, method, data
        };

        return this.client.request(Object.assign(config, conf))
            .then(result => Promise.resolve(result))
            .catch(error => Promise.reject(error));
    }

    get(url, config = {}){
        return this.request('get', url,null, config);
    }
    delete(url, config = {}){
        return this.request('delete', url, null, config);
    }
    head(url, config = {}){
        return this.request.head('head',url, null, config);
    }
    options(url, config = {}){
        return this.request('options', url, null, config);
    }
    post(url, data, config = {}){
        return this.request('post', url, data, config);
    }
    patch(url, data, config = {}){
        return this.request('patch', url, data, config);
    }
    put(url, data, config = {}){
        return this.request('put', url, data, config);
    }
}
let baseClient = new ApiClient();
export default ApiClient;
export {createClient, baseClient};
