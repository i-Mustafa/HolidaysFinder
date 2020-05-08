#!/usr/bin/env node

const { getCode, getName } = require('country-list');
// const prompt = require ('prompt');
const axios = require ('axios')
const chalk = require('chalk');
var figlet = require('figlet');
const ora = require('ora');



// prompt.get(['test'],function (result, error) {
//     if (error) {
//         console.log(error);
//     }
//     console.log(result.test);
// } )


var country = 'belgium'; 
console.log(chalk.blue (getName('be')));
console.log(chalk.blue (getCode(country)));

var date = new Date();
var Year = date.getFullYear();
var CountryCode = (getCode(country));
 
figlet('Here is the ' + CountryCode +' Holidays for ' + Year, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});


const spinner = ora('Loading Holidays').start();
setTimeout(() => {
    spinner.color = 'blue';
    spinner.text = 'Loading ' + CountryCode + ' Holidays';
}, 1000);

axios.get('https://date.nager.at/Api/v2/PublicHolidays/' + Year + '/' + CountryCode).then(response => {
    console.log(response.data);
})
.catch(console.error)


 
