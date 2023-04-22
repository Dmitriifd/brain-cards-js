import { createCategory } from './components/createCategory.js';
import { createHeader } from './components/createHeader.js';
import { createElement } from './helper/createElement.js';
import { fetchCategories } from './service/api.service.js';

const initApp = async () => {
  const headerParent = document.querySelector('.header');
  const app = document.querySelector('#app');

  const headerObj = createHeader(headerParent);
  const categoryObj = createCategory(app);

  const loaderWrap = createElement('div', {
    className: 'loader-wrap'
  });

  const loader = createElement('img', {
    className: 'loader',
    src: '../img/loader.png'
  });

  loaderWrap.append(loader);

  app.append(loaderWrap);

  const renderIndex = async (e) => {
    e?.preventDefault();

    const categories = await fetchCategories();
    if (categories.error) {
      app.append(
        createElement('p', {
          className: 'server-error',
          textContent: 'Ошибка сервера, попробуйте зайти позже'
        })
      );
      return;
    }

    app.removeChild(loaderWrap);
    categoryObj.mount(categories);
  };

  renderIndex();

  headerObj.headerLogoLink.addEventListener('click', () => renderIndex);
  headerObj.headerBtn.addEventListener('click', () => {
    categoryObj.unmount();
    headerObj.updateHeaderTitle('Новая категория');
  });
};

initApp();
