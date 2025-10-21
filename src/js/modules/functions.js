fetch('./files/cards.json')
  .then(res => res.json())
  .then(cardsData => {
    const cardsItems = document.querySelector('.cards__items');
    const sliderWrap = document.querySelector('.slider__cards');
    const prevBtn = document.querySelector('.slider__btn--prev');
    const nextBtn = document.querySelector('.slider__btn--next');
    if (!cardsItems || !sliderWrap || !prevBtn || !nextBtn) return;

    function renderCardHTML(card) {
      const bgClass = card.backgroundType === 'color' ? `item-card__background--${card.backgroundValue}` : '';
      const bgStyle = card.backgroundType === 'image' ? `style="background-image: url('img/${card.backgroundValue}')"` : '';
      const tagsHTML = card.tags.map(t => `<span class="item-card__tag">${t}</span>`).join('');
      return `
        <div class="item-card">
          <div class="item-card__background ${bgClass}" ${bgStyle}></div>
          <div class="item-card__tags item-card__tags--${card.tagColor}">${tagsHTML}</div>
          <h5 class="item-card__autor item-card__autor--${card.authorColor}">${card.author}</h5>
          <h3 class="item-card__title">${card.title}</h3>
          <p class="item-card__descr">${card.description}</p>
          <a href="#" class="item-card__btn btn btn--${card.buttonColor}">${card.buttonText}</a>
        </div>
      `;
    }

    cardsItems.innerHTML = cardsData.map(card => renderCardHTML(card)).join('');

    let current = 0;
    function getSlidesToShow() {
      const w = window.innerWidth;
      if (w <= 575.98) return 1;
      if (w <= 1199.98) return 2;
      return 3;
    }

    function renderSlider() {
      const slidesToShow = getSlidesToShow();
      let html = '';
      for (let i = 0; i < slidesToShow; i++) {
        const idx = (current + i) % cardsData.length;
        html += renderCardHTML(cardsData[idx]);
      }
      sliderWrap.innerHTML = html;
    }
    console.log('Slides to show: ', getSlidesToShow());
    renderSlider();

    prevBtn.onclick = () => {
      const slidesToShow = getSlidesToShow();
      current = (current - slidesToShow + cardsData.length) % cardsData.length;
      renderSlider();
    };
    nextBtn.onclick = () => {
      const slidesToShow = getSlidesToShow();
      current = (current + slidesToShow) % cardsData.length;
      renderSlider();
    };
    window.onresize = () => {
      current = 0;
      renderSlider();
    };
  });
