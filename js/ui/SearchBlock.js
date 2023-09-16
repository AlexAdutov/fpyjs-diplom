/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor(element) {
    this.element = element;
    this.previewBlock = document.querySelector('.image-preview');
    this.imageBlock = document.querySelector('.image-block');
    this.registerEvents();
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents() {
    this.element.addEventListener('click', event => {
      const target = event.target;

      if (target.classList.contains('replace') || target.classList.contains('add')) {
        const userId = this.element.querySelector('input').value.trim();

        if (userId !== '') {
          if (target.classList.contains('replace')) {
            App.imageViewer.clear();
          }

          VK.get(userId, images => {
            App.imageViewer.drawImages(images);
          });
        }
      }
    });
  }
}