/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = '958eb5d439726565e9333aa30e50e0f937ee432e927f0dbd541c541887d919a7c56f95c04217915c32008';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){

    VK.lastCallback = callback;

    const script = document.createElement('script');
    script.src = `https://api.vk.com/method/photos.get?user_id=${id}&access_token=${VK.ACCESS_TOKEN}&callback=VK.processData`;
    document.body.appendChild(script);

  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
  const scriptTag = document.querySelector('script[src^="https://api.vk.com/method/photos.get"]');
    if (scriptTag) {
    scriptTag.parentNode.removeChild('scriptTag');
      }

    if (result.error){
      alert(result.error.error_msg);
      return;
    }

    const largestImages = result.response.item.map(item =>{
      const sizes = item.sizes;
      return sizes[sizes.length -1].url;
    })

if(VK.lastCallback){
  VK.lastCallback(largestImages);
}

VK.lastCallback = () =>{};
  }
}
