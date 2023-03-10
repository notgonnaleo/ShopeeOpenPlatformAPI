
const express = require('express');
const axios = require("axios");
const https = require('https');
const app = express()
const PORT = 3000;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next()
  });

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
}); 

// Authenticate Shopee API and User information.
app.get('/', async (req, res) => {
    try {
        const host = "https://partner.shopeemobile.com";
        const apiPath = "/api/v2/shop/auth_partner"

        // TODO: Encontrar valor do secret_key, verificar se o partnerKey é a mesma coisa que partner_id, caso não seja corrigir.
        // Favor adicionar todos os parametros necessarios de acordo com a documentação
        // https://open.shopee.com/developer-guide/20
        // https://open.shopee.com/developer-guide/16

        let unixTimestamp = Math.floor(Date.now()/1000);
        const partnerKey = "1008742"
        const shopId = "78299";
        const secret_key = "";
        const redirectUrl = "https://jetcontrol-prod.azurewebsites.net/dashboard/dashboard-analytics"

        let rawSign = partnerKey + apiPath + unixTimestamp
        let sign = await crypto.subtle.digest("SHA-256", rawSign)

        let authenticationEndpoint = host + apiPath + partnerKey + unixTimestamp + sign + redirectUrl

        const response = await axios.get(authenticationEndpoint);
        console.log(response);
        res.send(response)
    } catch (error) {
        console.log(error);
    }
})
  
