// generate_video.js запускает системный Chrome (channel: 'chrome'),
// поэтому собственный Chromium Puppeteer'у не нужен — иначе он тянул бы
// ~170 МБ при каждой установке зависимостей, в том числе на сборке Vercel.
module.exports = { skipDownload: true };
