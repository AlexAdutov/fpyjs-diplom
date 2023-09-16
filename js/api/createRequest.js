/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();

      // Инициализируем параметры запроса
  const method = options.method || 'GET';
  const url = options.url || '';
  const data = options.data || null;
  const headers = options.headers || {};
  const callback = options.callback || function () {};

    // Устанавливаем тип ответа на JSON
    xhr.responseType = 'json';

    // Устанавливаем обработчик для события 'load' (успешный запрос)
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
        // Если запрос успешен, вызываем callback с null и данными ответа
        callback(null, xhr.response);
        } else {
        // Если произошла ошибка, вызываем callback с объектом ошибки
        callback(new Error(`Request failed with status ${xhr.status}`));
        }
    });

    // Устанавливаем обработчик для события 'error' (ошибка запроса)
    xhr.addEventListener('error', () => {
        callback(new Error('Network error'));
    });    

    // Открываем соединение и отправляем запрос
    xhr.open(method, url);    

    // Устанавливаем заголовки
    for (const header in headers) {
        if (headers.hasOwnProperty(header)) {
        xhr.setRequestHeader(header, headers[header]);
        }
    }

    xhr.send(data);
};
