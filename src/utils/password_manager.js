const crypto = require('crypto');

function sha512(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);

    hash = hash.digest('hex');

    return hash;
}

function generateSalt() {
    return crypto.randomBytes(Math.ceil(16 / 2))
        .toString('hex')
        .slice(0, 18);
}

async function validatePassword(password, password_salt, password_hash) {
    var passwordAndSalt = sha512(password, password_salt);

    return password_hash = passwordAndSalt;
}

module.exports = { generateSalt, sha512, validatePassword };