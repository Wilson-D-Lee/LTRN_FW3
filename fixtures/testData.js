// testData.js

module.exports = {
    basicUser: 'wilson@lantern.ai',
    adminUser: 'wilson+admin@lantern.ai',
    companyUser: 'wilson+company@lantern.ai',
    sec2pword: process.env.USER_PASSWORD, // Password from environment variable
    authCode: process.env.USER_AUTHCODE,
    loginUrl: 'https://lanternuat.b2clogin.com/lanternuat.onmicrosoft.com/b2c_1a_signin_tou_totp/oauth2/v2.0/authorize?client_id=3023ca59-c04d-415c-ac95-a4f5b4d44d48&scope=openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Fapp.uat.app.lantern.ai&client-request-id=5eef5b90-20e7-4bff-b8c9-58d6f77d23c2&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=2.37.0&client_info=1&code_challenge=KJVciOgr72A8oSY4Dq8rKQfiwupOilbbmJ_zf7ifGr0&code_challenge_method=S256&nonce=ceb1e8f6-a9b2-435b-9012-e8f997e5bcf3&state=eyJpZCI6IjY0MWYwMmJlLTZkNmQtNDFkMi04ZWEyLWI2OTlhNzg4NmFiMyIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D'
};