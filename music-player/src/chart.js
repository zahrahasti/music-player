/**
 * 
 */
import musics from "../data/music.json" assert {type:"json"};
const dates=musics.map(music=>formatDate(music.creation))
const likes=musics.map(music=>music.likes)
console.log(likes);
function formatDate(creation){
 const date = new Date(creation); // Replace this with your date
const options = { month: 'short', day: 'numeric' };
const formattedDate = date.toLocaleDateString(undefined, options);
 return formattedDate;
}
 

import Highcharts from "highcharts"
export function createChart(){
    Highcharts.chart('chart', {
        chart: {
            zooming:100,
            plotBackgroundColor: 'rgba(0,0,0,.1)',
            backgroundColor:"transparent",
            borderRadius:10,
            type: 'line',

             
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: dates,
            gridLineWidth: 1,
            tickWidth:0,
            lineWidth:0,
            gridLineColor: '#e0e0e015',
            offset: 50,
            labels: {
                
                style: {
                    color:"rgba(255,255,255,.5)",
                    fontSize: '13px' // Adjust the font size as needed
                }
            }
        },
        yAxis: {
            min: 0,
            max: +Math.max(...likes) + 100, 
            gridLineWidth: 1,
            gridLineColor: '#e0e0e015',
            labels: {
                style: {
                    color:"rgba(255,255,255,.5)",
                    fontSize: '13px' // Adjust the font size as needed
                }
            }
        },
        plotOptions: {
            series: {
                borderRadius: 10,
                label: {
                    connectorAllowed: true
                },
                // pointStart: Date.UTC(2023, 0, 1), // Start date (e.g., January 1, 2023)
                //  pointInterval: 7 * 24 * 3600 * 1000, // 7 days (1 week) interval in milliseconds
                color: '#FF9655',
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: '#FF9655'
                }
            },
            line:{

                size:1000
            }
        },
        tooltip: {
            backgroundColor: '#0007',
            width: 250,
            height: 200,
            formatter: function () {
                var formattedDate = Highcharts.dateFormat('%b, %e', this.x); // Display day and month
                return '<div style="color: white;width:500px;height:200px;font-size:16px;padding:40px;text-align:left;">' + this.y + ' <br/> <p style="color:rgba(255,255,255,.5);"> ' + this.x + ' <p> </div>';
            }
        },
        series: [{
            
            data:likes,
            
            color: 'gray',
            marker: {
                fillColor: '#FACD66',
                lineWidth:1,
                height:2,
                lineColor: '#FACD66'
            }
        }],
       

    });
}