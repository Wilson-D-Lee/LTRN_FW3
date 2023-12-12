const { TOTP } = require('otpauth');

exports.AuthPage = class AuthPage {
    constructor(page) {
        this.page = page;
        this.authcode_input = page.locator('#otpCode');
        this.verify_button = page.locator('text=Verify');
    }

    async generateAndEnterTOTP(userType) {
        let secret;
        switch (userType) {
            case 'admin':
                secret = process.env.ADMIN_TOTP_SECRET; // Assuming you have a different secret for admin
                break;
            case 'basic':
                secret = process.env.BASIC_TOTP_SECRET; // For the basic user
                break;
            // Add more cases as needed for different user types
            default:
                throw new Error('User type not recognized for TOTP generation');
        }

        let totp = new TOTP({
            secret: secret,
            algorithm: 'SHA1',
            digits: 6,
            period: 30
        });

        let token = totp.generate();
        await this.enterAuthCode(token);
    }

    async enterAuthCode(authCode) {
        await this.authcode_input.fill(authCode);
        await this.verify_button.click();

        //if error is visible, wait 10 seconds, refresh and input authcode again.

    } }
