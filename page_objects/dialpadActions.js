const { expect } = require('@playwright/test');

class DialpadActions {

    INPUT_ELEMENT = 'input[type="tel"]'

    constructor(contentFrame){
        this.contentFrame = contentFrame        
    }

    async fillNumber(number){
        const inputPhone = this.contentFrame.locator(this.INPUT_ELEMENT)
        await inputPhone.click()
        await inputPhone.fill(number)
    }

    async callNumber(number){
        
        if(await this.contentFrame.locator(this.INPUT_ELEMENT).textContent() != number ){
            await this.fillNumber(number)
        }
            const callButton = this.contentFrame.locator('button[data-testid="outbound-call-button"]')
            await callButton.click()
            await expect(callButton).toBeDisabled()

    }


} 
module.exports = { DialpadActions }