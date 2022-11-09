import axios from 'axios';
const URL = 'https://pixabay.com/api/';
const API_KEY = '27732054-5513c218cb3363c8c09534df6';

export const params = {
    q: '',
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: 1,
};

const customAxios = axios.create({
    baseURL: URL,
});

export const getImage = async params => {
    try {
        const response = await customAxios.get('', { params: { ...params, key: API_KEY } })
        return response;
    } catch {
        console.log('error');
    }
};