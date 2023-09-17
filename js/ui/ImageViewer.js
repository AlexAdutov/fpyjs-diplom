/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {

  constructor( element ) {
    /**
     Конструктор constructor(element) получает элемент (HTML-элемент), представляющий блок отображения изображений,
     и сохраняет его в свойстве this.element. Кроме того, он инициализирует свойства previewBlock и imageList,
     представляющие соответственно блок предпросмотра изображений и список изображений, внутри блока.
     */
    this.element = element
    this.previewBlock = this.element.querySelector(".image");
    this.imageList = this.element.querySelector(".images-list .grid .row");
    this.registerEvents()
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
  registerEvents(){
  /**
   Метод registerEvents() добавляет обработчики событий для блока изображений:
   Одиночный клик на изображении: Если пользователь кликает на изображении, оно переключает класс "selected" для
   выделения/снятия выделения. Также вызывается метод checkButtonText() для обновления текста на кнопке "Выбрать всё".
   Двойной клик на изображении: Если пользователь выполняет двойной клик на изображении, оно отображается в блоке предпросмотра (previewBlock).
   Клик на кнопке "Выбрать всё": Этот обработчик проверяет состояние всех изображений (выделены ли они или нет).
   Если все изображения уже выделены, кнопка меняет текст на "Снять выделение", иначе текст становится "Выбрать всё".
   Также вызывается метод checkButtonText() для обновления состояния кнопки "Отправить на диск".
   Клик на кнопке "Посмотреть загруженные файлы": Этот обработчик открывает модальное окно предпросмотра загруженных
   файлов (filePreviewer) и вызывает методы для загрузки и отображения загруженных файлов.
   Клик на кнопке "Отправить на диск": Этот обработчик открывает модальное окно для загрузки файлов (fileUploader) и
   вызывает методы для отображения выбранных изображений.
   */
    // Одинарный клик
    this.imageList.addEventListener('click', (event) => {if (event.target.tagName.toLowerCase() === "img") {
      event.target.classList.toggle("selected")
      this.checkButtonText()
    }})
    // Двойной клик
    this.imageList.addEventListener('dblclick', (event) => {if (event.target.tagName.toLowerCase() === "img"){this.previewBlock.src = event.target.src}})

    // ВыБрать все
    document.querySelector('.select-all').addEventListener('click', () => {

      const arrImg = Array.from(this.imageList.querySelectorAll('img'))
      if ( ImageViewer.anySelected(arrImg))
        arrImg.forEach(element => {element.classList.remove('selected')})
      else {  
        arrImg.forEach(element => {element.classList.add('selected')})
      }
      this.checkButtonText()
    })

    // Посмотреть загруженные файлы
    document.querySelector('.show-uploaded-files').addEventListener('click', () => {
      const modal = App.getModal('filePreviewer')
      document.querySelector(".uploaded-previewer-modal .content").innerHTML = '<i class="asterisk loading icon massive"></i>';
      modal.open();
      Yandex.getUploadedFiles(callback => {modal.showImages(callback)})
    })

    // Отправить на диск
    document.querySelector('.send').addEventListener('click', () => {
      const modal = App.getModal('fileUploader');
      const allImgSrc = Array.from(this.imageList.querySelectorAll(".selected")).map(el => el.src);
      modal.open()
      modal.showImages(allImgSrc)
    })
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    this.imageList.innerHTML = ''
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
  /**
   * Метод drawImages(images) принимает массив изображений и отрисовывает их на странице. Каждое изображение представляется в виде элемента HTML <img>, добавленного в список imageList
   * */
    if (images.length > 0) {
      document.querySelector('.select-all').classList.remove('disabled')
    } else {
      document.querySelector('.select-all').classList.add('disabled')
    }

    images.forEach( image => {

      let pict = document.createElement('div')
      pict.classList.add('four', 'wide', 'column', 'ui', 'medium', 'image-wrapper');
      pict.innerHTML = `<img src="${image.url}" alt="url"/>`;
      document.querySelector(".images-list .grid .row").appendChild(pict)
      // this.imageList.appendChild(pict);
    })

  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    /**
     Метод checkButtonText() контролирует текст на кнопках "Выбрать всё" и "Отправить на диск" в зависимости от состояния выделения изображений.
     * */
    const allImage = Array.from(this.imageList.querySelectorAll('img'))
    const allBtn = document.querySelector('.select-all')
    const sendBtn = document.querySelector('.send')
    allBtn.innerText = ImageViewer.allSelected(allImage) ? 'Снять выделение' : 'Выбрать всё'
    allBtn.innerText = ImageViewer.anySelected(allImage) ? 'Снять выделение' : 'Выбрать всё'
    ImageViewer.anySelected(allImage) ? sendBtn.classList.remove('disabled') : sendBtn.classList.add('disabled')
  }

  /**
   Статические методы anySelected(element) и allSelected(element) проверяют, есть ли хотя бы одно
   выделенное изображение и все ли изображения выделены соответственно. Эти методы используются в методе checkButtonText() для определения состояния кнопок.
  * */
  static anySelected(element) {
    for (let index = 0; index < element.length; index++) {
        if (element[index].classList.contains('selected')) {return true};
    }
    return false;
  }

  static allSelected(element) {
    for (let index = 0; index < element.length; index++) {
        if (!element[index].classList.contains('selected')) {return false};
    }
    return true;
  }

}