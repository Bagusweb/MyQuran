import axios from "axios";

export default axios.create({
    baseURL: 'https://api.alquran.cloud/v1/',
    'Access-Control-Allow-Origin': '*'
});