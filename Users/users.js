// users.js

module.exports = {
    basicUser: 'wilson@lantern.ai',
    adminUser: 'wilson+admin@lantern.ai',
    companyUser: 'wilson+company@lantern.ai',
    sec2pword: process.env.USER_PASSWORD, // Password from environment variable
    authCode: process.env.USER_AUTHCODE
};
