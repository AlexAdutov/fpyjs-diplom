

/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
/**
 Этот код представляет собой функцию createRequest, которая служит для выполнения запросов к Yandex API. Функция принимает объект options, который содержит параметры запроса, такие как URL, метод (GET, POST и т. д.), заголовки, данные и колбек для обработки результата запроса.
 Код функции выполняет следующие действия:
 Создает строку urlParam, которая будет содержать параметры запроса, если они были указаны в объекте options.data.
 Итерирует по параметрам в объекте options.data и добавляет их в строку urlParam в формате param=value&.
 Удаляет последний символ '&' из строки urlParam.
 Создает объект Headers из заголовков, указанных в options.headers.
 Выполняет асинхронный запрос к Yandex API с использованием fetch. Запрос выполняется на URL, указанный в Yandex.HOST + options.url + urlParam, с указанным методом и заголовками.
 Если ответ имеет статус меньше 204 (успешный), то функция пытается извлечь JSON-данные из ответа и передает их в колбек, указанный в options.callback.
 Если статус ответа равен 204 (пустой ответ), то также вызывается колбек, но с передачей null.
 Если ответ имеет статус, отличный от успешного (больше или равно 204), то выводится сообщение об ошибке в консоль и показывается всплывающее уведомление с текстом 'ошибка'.
 Этот код обеспечивает выполнение HTTP-запросов к Yandex API и обработку ответов с помощью переданного колбека, что позволяет взаимодействовать с API и обрабатывать результаты запросов в вашем приложении.
 */

    let urlParam = '?'
    if (options.data) {
        for (let param in options.data) {
            
            urlParam += param + '=' + options.data[param] + '&'
        }
        urlParam = urlParam.substring(0 , urlParam.length - 1)
    }
    const head = new Headers(options.headers);
    (async () =>{
    let response = await fetch(Yandex.HOST + options.url + urlParam, {
        method: options.method,
        headers: head, 
        })
    let result;
    if (response.status < 204) {
        try {
            result = await response.json()
        } catch (error) {
            console.log(error);
            result = null
        }
        return options.callback(result)
    }
    else if (response.status == 204){ return options.callback(null)}
    else {
        console.log(response)
        alert('ошибка')
    }

    })()

};