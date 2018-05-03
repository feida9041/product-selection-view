import axios from 'axios';
import api from 'src/config/api';

axios.defaults.baseURL = api.base_url();

class Api {
    /*
      * 登陆
      * loginInfo = {
      *   username: string,
      *   password: string,
      *   platform: string,
      * }
      * */
    static async login(loginInfo) {
        return (await (axios.post(`/login`, loginInfo))).data;
    };

    static async logout() {
        const data = await axios.get(`/logout`);
        localStorage.clear();
        return data;
    };

    static async getList(url, obj) {
        return await axios.get(url, {
            params: obj
        });
    };

    static async get(url, obj) {
        return await axios.get(url, {
            params: obj
        });
    };

    static async saveData(url, obj) {
        return await axios.post(url, obj);
    };

    static async deleteData(url, obj) {
        return await axios.delete(url, {
            params: obj
        });
    };

    static async upload(formdata, callback) {
        return await axios({
            url: '/upload',
            method: 'POST',
            data: formdata,
            onUploadProgress: function (progressEvent) { //原生获取上传进度的事件
                if (progressEvent.lengthComputable) {
                    //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                    //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                    callback(progressEvent);
                }
            },
            headers: {'Content-Type': 'multipart/form-data'}
        })
    };
}

export default Api;
