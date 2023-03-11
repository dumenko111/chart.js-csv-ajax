const ctx = document.querySelector('.js-chart').getContext("2d");//отримуємо ссилку на тег <canvas>
const GLOBAL_MEAN_TEMPERATURE = 14;

fetchData().then(parseData).then(getLabelsAndData).then(({years, temps, northHem, southHem}) => drawChart(years, temps, northHem, southHem))

function fetchData() {
  return fetch("./ZonAnn.Ts+dSST.csv")//локальний запит на файл csv
    .then(r => r.text())
}

function parseData(data) {
  return Papa.parse(data, { header: true }).data;//papaparse парсить в масив об'єктів
}

function getLabelsAndData(data) {
  return data.reduce((acc, entry) => {//редюсом повертаємо:
    // console.log(data)
    acc.years.push(entry.Year);//повертаємо роки
    acc.temps.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE)//повертаємо середню температуру по всій планеті
    acc.northHem.push(Number(entry.NHem) + GLOBAL_MEAN_TEMPERATURE)
    acc.southHem.push(Number(entry.SHem) + GLOBAL_MEAN_TEMPERATURE)
    
        return acc;
      }, {years: [], temps: [], northHem: [], southHem: []})//значення акумулятора 
}

function drawChart(labels, data, northHem, southHem) {
  //будуємо графік за допомогою chart.js
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,//(коротка в-сть) дані які відображаються по осі "x"
      datasets: [
        {
          label: '# Global everage temparature',
          data: data,//дані які відображаються по осі "y"
          borderWidth: 1,
          fill: false,
          backgroundColor: "green",
          pointHoverBackgroundColor: "red"
        },
        {
          label: '# Average temperature of the northern hemisphere',
          data: northHem,//дані які відображаються по осі "y"
          borderWidth: 1,
          fill: false,
          backgroundColor: "blue",
          pointHoverBackgroundColor: "red"
        },
        {
          label: '# Average temperature of the southern hemisphere',
          data: southHem,//дані які відображаються по осі "y"
          borderWidth: 1,
          fill: false,
          backgroundColor: "red",
          pointHoverBackgroundColor: "red"
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                return value + '°';
              }
            },
          },
        ],
      }
    },
  }) 
};
  


      
      







  


