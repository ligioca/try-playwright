const { expect } = require('@playwright/test');

 class AuthActions {

    EMAIL_LOCATOR = 'input[type="email"]'
    PASSWORD_LOCATOR = 'input[type="password"]'
    LOGINBUTTON_LOCATOR = 'button'

    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */

    constructor(page){
        this.page = page        
    }  

    async authenticate(email,password,account){
        const email_element = this.page.locator(this.EMAIL_LOCATOR)
        await email_element.type(email)
        const password_element = this.page.locator(this.PASSWORD_LOCATOR) 
        await password_element.type(password)
        const login_button = this.page.locator(this.LOGINBUTTON_LOCATOR)
        
        await Promise.all([
             await login_button.click(),
             await this.page.waitForNavigation(),    
             await this.page.waitForSelector('#title-bar'),
             await this.page.waitForSelector('button[data-testid="dock-button-conversation"]'),
             await this.page.waitForSelector('.status-button-module__current-status-name'),
             expect(this.page.locator('.status-button-module__current-status-name')).toHaveText('Available')
        ]);
        
    }

    async logout(){
        const userAvatar = this.page.locator('#profile-widget > button')
        await userAvatar.click()
        const logoutButton = this.page.locator('//*[@id="profile-widget"]/div[2]/ul/li/a/div')
        await logoutButton.click()
        this.page.waitForURL('https://account.talkdeskstgid.com/select/atlas')
    }


}
module.exports = { AuthActions }