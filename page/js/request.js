var axios = axios.create({
    baseURL: 'http://192.168.1.32:9093',
    timeout: 5000
});

axios.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
}, function (error) {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
});
