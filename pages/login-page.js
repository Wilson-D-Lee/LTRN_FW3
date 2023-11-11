exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.username_input = page.getByPlaceholder('Email Address');
        this.password_input = page.getByPlaceholder('Password');
        this.signin_button = page.getByRole('button', { name: 'Sign in' });
    }

    async basic_user_login(email, password) {
        await this.username_input.fill(email);
        await this.password_input.fill(password);
        await this.signin_button.click();
    }

    async admin_user_login(email, password) {
        await this.username_input.fill(email);
        await this.password_input.fill(password);
        await this.signin_button.click();
    }

    async company_user_login(email, password) {
        await this.username_input.fill(email);
        await this.password_input.fill(password);
        await this.signin_button.click();
    }
}
