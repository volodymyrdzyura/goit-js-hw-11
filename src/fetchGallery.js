import axios from 'axios';

export default class NewsApiGalleryService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    async fetchGallery() {
        console.log(this);
    const BASE_URL = `https://pixabay.com/api/`;
    const API_KEY = `30182984-752123c3a4bfc9822dc18d3b7`;

    const response = await axios.get(
              `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&
      image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&
      per_page=40`
          );
          return response.data;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery
    }
}
    