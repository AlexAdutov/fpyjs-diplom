/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = 'afd58514afd58514afd58514e2acc02205aafd5afd58514cad0329bb828fa37ae433094';
  static lastCallback;


  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    this.lastCallback = callback

    this.ACCESS_TOKEN = localStorage.getItem('tokenVK')
    if (!this.ACCESS_TOKEN){
      const token = prompt('Введите токен VK')
      localStorage.setItem('tokenVK', token)
    }

    let script = document.createElement('SCRIPT');
    script.id = 'vk__response'
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&access_token=${this.ACCESS_TOKEN}&v=5.131&callback=VK.processData`;
    document.getElementsByTagName("head")[0].appendChild(script)

  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    let resultList = []
    document.getElementById('vk__response').remove()
    if (result.response) {
      result.response.items.forEach(element => {
        resultList.push(element.sizes[element.sizes.length -1]);
      });

    } else if (result.error) {
      alert(result.error.error_msg)
      return
    }
    this.lastCallback(resultList);
    this.lastCallback = () => {}
  }
}
