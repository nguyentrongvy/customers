const axios = require('axios');
const Customer = require('../models/Customer');
const { dataCSV } = require('../constants');

exports.saveDataCSV = async () => {
    const url = 'https://shopify/admin/api/2022-10/customers.json?ids=207119551,1073339464&since_id=207119551';
    let result;
    try {
        result = await axios.get(url);
    } catch (error) {
        console.log(error);
        result = dataCSV;
    }

    let promises = [];
    for (const cus of result) {
        const customer = new Customer();
        customer.customer_id = cus.customer_id;

        promises.push(customer.save());

        if (promises.length === 100) {
            await Promise.all(promises);
            promises = [];
        }
    }

    if (promises.length === 0) return;
    
    return Promise.all(promises);
};