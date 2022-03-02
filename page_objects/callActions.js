class CallActions {

    ACCEPT_CALL_BUTTON = 'button[data-testid="accept-call-button"]'

    constructor(frame){
        this.frame = frame
    }

    async acceptCall(){
        const acceptCallButton = this.frame.locator(this.ACCEPT_CALL_BUTTON)
        await acceptCallButton.click()
    }

    async endCall(){
        const endCallButton = this.frame.locator('button[data-testid="end-call-button"]')
        await endCallButton.click()
    }


} 
module.exports = { CallActions }