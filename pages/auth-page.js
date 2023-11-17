exports.AuthPage = class AuthPage {
    
    constructor(page) {
        this.page = page;
        this.authcode_input = page.locator('#otpCode'); // Updated to use locator
        this.verify_button = page.locator('text=Verify'); // Updated to use locator
    }

    

    async enterAuthCode(authCode) {

        

        await this.authcode_input.fill(authCode);
        await this.verify_button.click();
    }

    
}
