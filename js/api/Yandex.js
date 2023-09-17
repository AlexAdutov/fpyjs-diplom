/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getHeader() {
    /**
     getHeader(): Этот метод возвращает заголовки, необходимые для выполнения запросов к Yandex Disk API.
     Он включает в себя авторизационный заголовок Authorization, который содержит токен доступа пользователя к
     Yandex Disk. Токен получается из метода getToken().
     * */
    return {
      'Authorization': `OAuth ${this.getToken()}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  static getToken(){
    /**
     getToken(): Этот метод проверяет, есть ли токен Yandex Disk в локальном хранилище браузера (localStorage).
     Если токен отсутствует, он запрашивает его у пользователя с помощью prompt и сохраняет его в локальном хранилище.
     * */
    let token = localStorage.getItem('tokenYA');
    if (!token ){
      token = prompt('Введите токен Yandex Disk')
      localStorage.setItem('tokenYA', token)
    }
    return token
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    /**
     uploadFile(path, url, callback): Этот метод отправляет запрос на загрузку файла в облако Yandex Disk.
     Он принимает path - путь, по которому нужно сохранить файл, url - URL файла для загрузки, и callback -
     функцию обратного вызова, которая будет выполнена после завершения загрузки файла.
     */
    url = url.replace(/&/g, '%26' )
    url = url.replace(/=/g, '%3D' )
    createRequest({
      method: 'POST',
      url:'/resources/upload',
      data: {path , url},
      headers: this.getHeader(),
      callback: callback 
    })
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
    /**
     removeFile(path, callback): Этот метод отправляет запрос на удаление файла из облака Yandex Disk. Он принимает
     path - путь к файлу, который нужно удалить, и callback - функцию обратного вызова, которая будет выполнена после успешного удаления файла.
     **/
    createRequest({
      method: 'DELETE',
      url:'/resources',
      data: {path},
      headers: this.getHeader(),
      callback: callback 
    })
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
/**
 getUploadedFiles(callback): Этот метод отправляет запрос на получение списка всех загруженных файлов в облаке
 Yandex Disk. Он принимает callback - функцию обратного вызова, которая будет вызвана с результатом запроса.
 * */
    createRequest({
      method: 'GET',
      url:'/resources/files',
      headers: this.getHeader(),
      callback: callback 
    })
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    /**
     downloadFileByUrl(url): Этот статический метод выполняет скачивание файла по его URL. Он создает элемент <a>,
     устанавливает его href в URL файла и инициирует скачивание, вызывая метод click().
     * */
    let link = document.createElement('a');
    link.href = url;
    link.click(); 
  }
}