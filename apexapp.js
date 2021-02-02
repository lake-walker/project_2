// d3.csv('country_data.csv').then(function(countryData) {
//     console.log(countryData);
//     countryData.forEach(function(data) {
//         data.happiness_score_2015 = +data.happiness_score_2015;
//         data.sui_per_100k_2015 = +data.sui_per_100k_2015;
//         data.economy_gdp_per_capita_2015 = +data.economy_gdp_per_capita_2015;
//         data.human_development_index = +data.human_development_index;
//       });
//     var chart = c3.generate({
//         data: {
//             data: {
//                 url: 'country_data.csv',
//                 type: 'bar'
//             },
//             // columns: [
//             //     ['GDP', countryData.economy_gdp_per_capita_2015],
//             //     ['HDI', countryData.human_development_index]
//             // ],
//             // type: 'bar'
//         },
//         bar: {
//             width: {
//                 ratio: 0.5 // this makes bar width 50% of length between ticks
//             }
//             // or
//             //width: 100 // this makes bar width 100px
//         }
//     });

//     setTimeout(function () {
//         chart.load({
//             columns: [
//                 ['Suicides per 100k', countryData.sui_per_100k_2015]
//             ]
//         });
//     }, 1000);

// });

// var chart = c3.generate({
//     data: {
//         data: {
//             url: 'country_data.csv', 
//             labels: true,
//             filter: function (t) {
//                 return 
//             }
//             type: 'bar',
//         },
        
        
//     },
//     bar: {
//         width: {
//             ratio: 0.5 // this makes bar width 50% of length between ticks
//         }
//         // or
//         //width: 100 // this makes bar width 100px
//     }
// });

// setTimeout(function () {
//     chart.load({
//         columns: [
//             ['Suicides per 100k', sui_per_100k_2015]
//         ]
//     });
// }, 1000);


// This worked but with ALL the data

var chart = c3.generate({
    data: {
        url: 'region_data.csv',
        type: 'bar',
        x: 'region',
        columns: [
            ['region', 'Australia and New Zealand','Central and Eastern Europe','Eastern Asia','Latin America and Caribbean','Middle East and Northern Africa','North America','Southeastern Asia','Southern Asia','Sub-Saharan Africa','Western Europe']
        ]
    },
    axis: {
        x: {
            type: 'category',
            categories: ['Australia and New Zealand','Central and Eastern Europe','Eastern Asia','Latin America and Caribbean','Middle East and Northern Africa','North America','Southeastern Asia','Southern Asia','Sub-Saharan Africa','Western Europe'],
            // tick: {
            //     fit: true,
            //     values: ['Australia and New Zealand','Central and Eastern Europe','Eastern Asia','Latin America and Caribbean','Middle East and Northern Africa','North America','Southeastern Asia','Southern Asia','Sub-Saharan Africa','Western Europe']
            // }
        }
    }
});