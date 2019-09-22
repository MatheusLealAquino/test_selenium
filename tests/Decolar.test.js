require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

beforeEach(() => {
  jest.setTimeout(30000);
})

test('make search without origin', async () => {
  // Open browser
  const driver = await new Builder().forBrowser('chrome').build();
  // Open website
  await driver.get('https://www.decolar.com/passagens-aereas/');
  // Select all text
  await driver.findElement(By.className('sbox-places-first')).sendKeys(Key.chord(Key.CONTROL, "a"));
  // Clear all text before select all
  await driver.findElement(By.className('sbox-places-first')).sendKeys(Key.BACK_SPACE);
  // Make an click on Search button
  await driver.findElement(By.className('sbox-search')).click();
  // Fetch messages of warning to check if contains the message where is for origin field
  let messages = await driver.findElements(By.className('validation-msg'));
  // Get the size of the array
  const size = messages.length;
  // Expected variable inside the array
  const expectedArray = ['Por favor, insira uma origem'];
  // Array where will contain all results found
  let receivedArray = [];
  // Loop for iterate for each message and add to receivedArray
  for(var i=0; i<size; i++) {
    let text = await messages[i].getText();
    if(text != '') receivedArray.push(text);
  }
  // Run assert for expected with received
  expect(receivedArray).toEqual(expect.arrayContaining(expectedArray));
  // Close the browser
  await driver.quit();
});

