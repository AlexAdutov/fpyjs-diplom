/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor(element) {
    this.element = element;
    this.selectedImages = new Set();
    this.imageBlock = document.querySelector('.image-block'); // Элемент, в котором будут отрисовываться изображения
    this.previewBlock = document.querySelector('.preview-block'); // Элемент для предпросмотра
    this.registerEvents();
  }


  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents() {
    this.element.addEventListener('click', event => {
      const target = event.target;

      if (target.tagName === 'IMG') {
        // Одиночный клик на изображении
        target.classList.toggle('selected');
        this.checkButtonText();
      }
    });

    this.element.addEventListener('dblclick', event => {
      const target = event.target;

      if (target.tagName === 'IMG') {
        // Двойной клик на изображении
        this.previewImage(target.src);
      }
    });
  }

  previewImage(src) {
    // Отобразить изображение в блоке предпросмотра
    this.previewBlock.innerHTML = `<img src="${src}" alt="Preview">`;
  } 

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    // Очистить отрисованные изображения
    this.imageBlock.innerHTML = '';
    this.checkButtonText();
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    // Отрисовать изображения
    const imageHTML = images.map(image => `
      <div class="four wide column ui medium image-wrapper">
        <img src="${image}" />
      </div>
    `).join('');
    this.imageBlock.innerHTML = imageHTML;
    this.checkButtonText();
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText() {
    const images = this.element.querySelectorAll('.image-wrapper img');
    const selectAllButton = document.querySelector('.select-all');
    const sendButton = document.querySelector('.send');

    if (this.selectedImages.size === images.length) {
      selectAllButton.textContent = 'Снять выделение';
    } else {
      selectAllButton.textContent = 'Выбрать всё';
    }

    if (this.selectedImages.size > 0) {
      sendButton.classList.remove('disabled');
    } else {
      sendButton.classList.add('disabled');
    }
  }
}