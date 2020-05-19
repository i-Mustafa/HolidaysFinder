#!/usr/bin/env node

const { getCode, getName } = require('country-list');
// const prompt = require ('prompt');
const axios = require ('axios')
const chalk = require('chalk');
var figlet = require('figlet');
const ora = require('ora');
const boxen = require('boxen');


var arg = process.argv.slice(2);
let country = arg[0];


var date = new Date();
var Year = date.getFullYear();
const NEWLINE = "\n";

if (getCode(country)) {
    var CountryCode = (getCode(country));
    figlet('Here is the ' + CountryCode +' Holidays for ' + Year, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });

    axios.get('https://date.nager.at/Api/v2/PublicHolidays/' + Year + '/' + CountryCode).then(response => {
        ;

        for (let j = 0; j < response.data.length; j++) {
            console.log(chalk.red(response.data[j].countryCode + " " +response.data[j].date + " " + response.data[j].name));
        }
        

        })
    .catch(console.error)

} else {

    console.log(
        chalk.green(
            boxen(
                [ "Tips how to use HolidayFinder:",
                "* Start HolidayFinder by typing: npm start +nameOfTheCountry",
                chalk.red("* If you see this message please check your spelling if it's correct that's mean the country is not supported."),
                
                ].join(NEWLINE),
                {
                    padding: 1,
                    margin: 1,
                    borderStyle: "round",
                },
            ),
        ),
    );
}
