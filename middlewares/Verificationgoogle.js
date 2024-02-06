const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.CLIENT_ID);

async function Verificationgoogle(token) {
    const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
});


const { name, email, picture } = ticket.getPayload();
console.log("Google Verify Result", { name, email, picture});

return {
    nombre: name,
    correo: email,
    img: picture,
  };
}


module.exports = { Verificationgoogle };