const axios = require('axios');
const cheerio = require('cheerio');

const url = "https://www.americanexpress.com/us/credit-cards/card/platinum/?eep=25330&linknav=US-Acq-Shop-Consumer-VAC-Prospect-ViewCardDetail-Platinum&intlink=US-Acq-Shop-Consumer-VAC-Top3Tile-Prospect-ViewCardDetail-Platinum";

axios.get(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const creditCardList = $('.credit-card'); 

    const creditCards = [];

    creditCardList.each(function () {
        const name = $(this).find('.card-name').text(); 
        const rewards = $(this).find('.card-rewards').text(); 
        const annualFee = $(this).find('.annual-fee').text(); 

        creditCards.push({
            name,
            rewards,
            annualFee
        });
    });

    console.log(creditCards);
}).catch(console.error);



