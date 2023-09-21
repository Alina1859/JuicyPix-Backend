// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://juicypix.sertralina.tech',
  'https://api.juicypix.sertralina.tech',
  'http://juicypix.sertralina.tech',
  'http://api.juicypix.sertralina.tech',
  'http://localhost:3001',
  'https://localhost:3001',
  'localhost:3001',
  'http://localhost:3000',
  'https://localhost:3000',
  'localhost:3000',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);

  // проверяем, что источник запроса есть среди разрешённых
  if (origin && allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    res.end();

    return;
  }

  next();
};
