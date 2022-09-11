// import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api';
// const API_KEY = '28442536-1443146eb90a3a0b59e7fe2e3';

// export const fetchPicsWithQuery = async searchQuery => {
//   axios.defaults.baseURL = BASE_URL;
//   const response = axios.get(`/search?query=${searchQuery}`);
//   return response.data.hits;
// };

// export default {
//   fetchPicsWithQuery,
// };

// export const fetchPics = async searchQuery => {
//   axios.defaults.baseURL = BASE_URL;

//   const searchParams = new URLSearchParams({
//     key: API_KEY,
//     q: searchQuery,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     page: 1,
//     per_page: 12,
//   });

//   try {
//     const response = await axios.get(`/?${searchParams}`);
//     return response.data.hits;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export default class PicsApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   async fetchPics() {
//     axios.defaults.baseURL = 'https://pixabay.com/api';

//     const searchParams = new URLSearchParams({
//       key: '28442536-1443146eb90a3a0b59e7fe2e3',
//       q: this.searchQuery,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       page: this.page,
//       per_page: 12,
//     });

//     try {
//       const response = await axios.get(`/?${searchParams}`);
//       this.page += 1;
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   resetPage() {
//     this.page = 1;
//   }
// }
