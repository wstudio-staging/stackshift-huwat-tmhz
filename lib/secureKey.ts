const CryptoJS = require('crypto-js')

export const decryptKey = (cipherText, encryptionKey) => {
    let bytes = CryptoJS.AES.decrypt(cipherText, encryptionKey)
    return bytes.toString(CryptoJS.enc.Utf8)
}