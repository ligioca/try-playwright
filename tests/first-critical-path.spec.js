// @ts-check
const { test, expect, chromium } = require('@playwright/test');
const { DialpadActions } = require('../page_objects/dialpadActions');
const { AuthActions } = require('../page_objects/authActions')
const { CallActions } = require('../page_objects/callActions')
const { delay } = require('../helpers/callHelper')

require('dotenv').config()

test.beforeEach(async () => {
  console.log('Starting tests')
});

test('Login', async ({ }) => {
  //Login
  const browser = await chromium.launch({
    args: [
      '--disable-infobars',
      '--window-size=1920,1080',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--suppress-message-center-popups'
    ]
  })
  const page = await browser.newPage();
  const loginPage = new AuthActions(page)
  await page.goto('/atlas/apps', {waitUntil:"load"})
  await loginPage.authenticate(process.env.e2e_convo_user,process.env.e2e_convo_pw,process.env.accountName)
  
  //Get iframe
  console.log('Get iframe1')
  const handle = await page.$('iframe')
  const contentFrame = await handle.contentFrame()
  
  const dialpadFrame = new DialpadActions(contentFrame)

  //Creating A New Browser

  console.log('Creating A New Browser')
  const browser2 = await chromium.launch({
    args: [
      '--disable-infobars',
      '--window-size=1920,1080',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--suppress-message-center-popups'
    ]
  })

  const contextB2 = await browser2.newContext()
  contextB2.grantPermissions(['microphone', 'notifications'])
  const page2 = await browser2.newPage()
  const loginPage2 = new AuthActions(page2)

  await page2.goto('https://' + process.env.accountName + '.gettalkdesk.com/atlas/apps', {waitUntil:"load"})
  console.log('Login browser 2')
  await loginPage2.authenticate(process.env.e2e_convo_user1,process.env.e2e_convo_pw,process.env.accountName)  
  
  // const handle2 = await page2.$('iframe')
  // const contentFrame2 = await handle2.contentFrame()
  
  await dialpadFrame.callNumber("+18449261760") // we can make a constant in env for this
  await expect(page.locator('.status-button-module__current-status-name')).toHaveText('On a Call') 
  
  // const offerScreen2 = new CallActions(contentFrame2) 

  // await page2.bringToFront()
  
  // await offerScreen2.acceptCall()
  
  console.log("wait a bit")
  await delay(10000)
  // await offerScreen2.endCall()
  
  //Logout
  page.bringToFront()
  await loginPage.logout()
  
});