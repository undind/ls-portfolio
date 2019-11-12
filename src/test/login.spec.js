const fs = require('fs');
const webdriverio = require('webdriverio');
const options = require('./../../wdio.conf');
const client = webdriverio.multiremote(options);

jest.setTimeout(90000);

beforeAll(() => {
  return client.init().url('http://localhost:8080/admin#/login');
});

test('На странице есть кнопка "Авторизоваться"', () => {
  return client
    .isExisting('.basic-button')
    .then((browsers) => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .screenshot()
    .then((screenshots) => {
      for (const browserName in screenshots) {
        fs.writeFileSync(`./screenshots/login_form_${browserName}.png`, screenshots[browserName].value, 'base64');
      }
    });
});

test('Форма имеет все необходимые поля', () => {
  return client
    .isExisting('input[type="text"]')
    .then((browsers) => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .isExisting('input[type="password"]')
    .then((browsers) => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .screenshot()
    .then((screenshots) => {
      for (const browserName in screenshots) {
        fs.writeFileSync(`./screenshots/login_inputs_${browserName}.png`, screenshots[browserName].value, 'base64');
      }
    });
});

test('Кнопка Отправить заблокирована до тех пор, пока не введены все необходимые данные', () => {
  return client
    .setValue('input[type="text"]', 'test')
    .setValue('input[type="password"]', '12')
    .isEnabled('.basic-button')
    .then((browsers) => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(false);
      }
    })
    .screenshot()
    .then((screenshots) => {
      for (const browserName in screenshots) {
        fs.writeFileSync(`./screenshots/login_not_send_${browserName}.png`, screenshots[browserName].value, 'base64');
      }
    })
    .setValue('input[type="text"]', 'test')
    .setValue('input[type="password"]', '123')
    .isEnabled('.basic-button')
    .then((browsers) => {
      for (const browserName in browsers) {
        expect(browsers[browserName]).toBe(true);
      }
    })
    .screenshot()
    .then((screenshots) => {
      for (const browserName in screenshots) {
        fs.writeFileSync(`./screenshots/login_send_${browserName}.png`, screenshots[browserName].value, 'base64');
      }
    })
});

afterAll(() => {
  return client.end();
});
