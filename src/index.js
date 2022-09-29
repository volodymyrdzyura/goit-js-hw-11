import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiGalleryService from './fetchGallery';

const refs = {
  searchForm: document.querySelector('#search-form'),
  divEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  startBtn: document.querySelector('button[data-start]'),
  inputform: document.querySelector('input'),
};

let isShown = 0;

const GalleryEl = new NewsApiGalleryService();
refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(e) {
  e.preventDefault();

  if (e.currentTarget.elements.searchQuery.value === '') {
    return (innerHTML = '');
  }

  GalleryEl.query = e.target.elements.searchQuery.value.trim();
  isShown = 0;
  refs.divEl.innerHTML = '';
  GalleryEl.resetPage();
  fetchGallery();
}

function onLoadMore() {
  GalleryEl.incrementPage();
  fetchGallery();
}

async function fetchGallery() {
  refs.loadMoreBtn.classList.add('is-hidden');

  const response = await GalleryEl.fetchGallery();
  const { hits, total } = response;

  if (!hits.length) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  renderGallery(hits);
  isShown += hits.length;
  if (isShown < total) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
  if (isShown >= total) {
    Notiflix.Notify.info(
      'We re sorry, but you have reached the end of search results.'
    );
  }
}

function renderGallery(elements) {
  console.log(elements);
  const markup = elements
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <a class="gallery__link" href="${largeImageURL}">
                <div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${downloads}
                        </p>
                    </div>
                </div>
            </a>`;
      }
    )
    .join('');

  refs.divEl.insertAdjacentHTML('beforeend', markup);
  new SimpleLightbox('.gallery a');
}
