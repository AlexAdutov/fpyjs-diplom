/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( element ) {
    this.element = element
    this.registerEvents()

  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    /**
     Метод registerEvents() выполняет подписку на события клика (click) для элемента this.element. Когда происходит клик на этом элементе, будет вызываться функция findImages.
     Функция findImages(event) запускается при клике на элементе this.element (который представляет строку ввода и кнопки).
     Внутри функции findImages(event):
     a. Сначала проверяется значение, введенное в строку ввода (input). Если значение пустое или состоит только из пробелов (т.е., не содержит текста), то дальнейшие действия не выполняются.
     b. Затем проверяется, на какой именно элемент (кнопку) был совершен клик. Если это кнопка "Добавить" (имеет класс 'add'), то выполняется следующее:
     Вызывается метод VK.get с передачей значения, введенного в строку ввода (input.value) и колбека (App.imageViewer.drawImages).
     c. Если клик был совершен на кнопке "Заменить" (имеет класс 'replace'), то выполняются следующие действия:
     Вызывается метод App.imageViewer.clear() для очистки отображаемых изображений.
     Затем снова вызывается метод VK.get с передачей значения из строки ввода и колбека для отрисовки изображений.
     */
    this.element.addEventListener("click", findImages);

    function findImages(event) {

      const input = document.querySelector('input')
      if ( input.value.trim()) {

        if (event.target.classList.contains('add')) {
          VK.get(input.value, App.imageViewer.drawImages);
        }
        else if ( event.target.classList.contains('replace')) {
          App.imageViewer.clear()
          VK.get(input.value, App.imageViewer.drawImages);
        }
    }
    }
  }
}