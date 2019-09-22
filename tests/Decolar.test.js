require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

beforeEach(() => {
  jest.setTimeout(30000);
})

// Expected: 'Por favor, insira uma data de ida' and 'Por favor, insira uma data de volta'
test('make search with origin but without dates', async () => {
  // Open browser
  const driver = await new Builder().forBrowser('chrome').build();
  // Open website
  await driver.get('https://www.decolar.com/passagens-aereas/');
  // Make an click on Search button
  await driver.findElement(By.className('sbox-search')).click();
  // Fetch messages of warning to check if contains the message where is for origin field
  let messages = await driver.findElements(By.className('validation-msg'));
  // Get the size of the array
  const size = messages.length;
  // Expected variable inside the array
  const expectedArray = ['Por favor, insira uma data de ida', 'Por favor, insira uma data de volta'];
  // Array where will contain all results found
  let receivedArray = [];
  // Loop for iterate for each message and add to receivedArray
  for(var i=0; i<size; i++) {
    let text = await messages[i].getText();
    if(text != '' || text != undefined) receivedArray.push(text);
  }
  await driver.sleep(500);
  // Run assert for expected with received
  expect(receivedArray).toEqual(expect.arrayContaining(expectedArray));
  // Close the browser
  await driver.quit();
});

// Expected: 'Por favor, insira uma origem'
test('make search without origin', async () => {
  // Open browser
  const driver = await new Builder().forBrowser('chrome').build();
  // Open website
  await driver.get('https://www.decolar.com/passagens-aereas/');
  await driver.sleep(300);
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

// Expected: 'Por favor, insira um destino'
test('check on button without defined dates and without destiny', async () => {
  // Open browser
  const driver = await new Builder().forBrowser('chrome').build();
  // Open website
  await driver.get('https://www.decolar.com/passagens-aereas/');
  // Make an click on 'Ainda não defini as datas'
  await driver.findElement(By.className('checkbox-check sbox-3-icon-checkmark -mr1 sbox-ui-icon')).click();
  // Make an click on Search button
  await driver.findElement(By.className('sbox-search')).click();
  // Fetch messages of warning to check if contains the message where is for origin field
  let messages = await driver.findElements(By.className('validation-msg'));
  // Get the size of the array
  const size = messages.length;
  // Expected variable inside the array
  const expectedArray = ['Por favor, insira um destino'];
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

// Expected: 'Por favor, insira uma data de ida' and 'Por favor, insira uma data de volta'
test('With origin and destiny but without dates', async () => {
  // Open browser
  const driver = await new Builder().forBrowser('chrome').build();
  // Open website
  await driver.get('https://www.decolar.com/passagens-aereas/');

  // Set text of destiny
  await driver.findElement(By.className('sbox-places-second')).sendKeys('Rio de Janeiro, Rio de Janeiro, Brasil');
  // Sleep for wait the dropdown show
  await driver.sleep(2000);
  // Press enter to select the location
  await driver.findElement(By.className('sbox-places-second')).sendKeys(Key.ENTER);

  // Make an click on Search button
  await driver.findElement(By.className('sbox-search')).click();
  await driver.sleep(1000);
  // Fetch messages of warning to check if contains the message where is for origin field
  let messages = await driver.findElements(By.className('validation-msg'));
  // Get the size of the array
  const size = messages.length;
  // Expected variable inside the array
  const expectedArray = ['Por favor, insira uma data de ida', 'Por favor, insira uma data de volta'];
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

// Expected: Page with title 'Passagens aéreas para Rio de Janeiro saindo de São Paulo | Decolar'
test('With origin and destiny and check on button without defined dates', async () => {
  // Open browser
  const driver = await new Builder().forBrowser('chrome').build();
  // Open website
  await driver.get('https://www.decolar.com/passagens-aereas/');

  // Set text of destiny
  await driver.findElement(By.className('sbox-places-second')).sendKeys('Rio de Janeiro, Rio de Janeiro, Brasil');
  // Sleep for wait the dropdown show
  await driver.sleep(2000);
  // Press enter to select the location
  await driver.findElement(By.className('sbox-places-second')).sendKeys(Key.ENTER);

  // Make an click on 'Ainda não defini as datas'
  await driver.findElement(By.className('checkbox-check sbox-3-icon-checkmark -mr1 sbox-ui-icon')).click();
  // Make an click on Search button
  await driver.findElement(By.className('sbox-search')).click();
  
  // Sleep for wait the page loads
  await driver.sleep(3000);
  const expectedTitle = 'Passagens aéreas para Rio de Janeiro saindo de São Paulo | Decolar';
  // Get the title of the page
  let receivedTitle = await driver.getTitle();
  // Run assert for expected with received
  expect(receivedTitle.trim()).toEqual(expectedTitle);
  // Close the browser
  await driver.quit();
});