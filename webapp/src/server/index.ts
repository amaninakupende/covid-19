import axios from 'axios';

const server = axios.create({
    baseURL: "http://localhost:3333"
});

// ?modules=statisGradeCityDetail,diseaseh5Shelf
// const server = axios.create({
//     // baseURL: "https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list"
//     // baseURL: '/api'
//     // baseURL: '/api'
// })

// https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf

export const getListApi = () => server.get('/api/list').then( res => res.data);
// export const getListApi = () => server.post('?modules=statisGradeCityDetail,diseaseh5Shelf').then( res => res.data);


  