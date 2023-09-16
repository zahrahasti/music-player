const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['2021-12-01', '2021-12-02', '2021-12-03', '2021-12-04'],
    datasets: [
        {
            label: 'Line 1',
            data: [1,2,3],
            borderColor: 'rgba(255,255,255,.2)', // Change color for Line 1
            borderWidth: 1,
            pointBackgroundColor: '#FACD66',
            pointBorderColor: 'none',   // Change point border color for Line 1
            pointRadius: 5, 
          } ]
  },
  options: {
    
    }
  }
);

function createDate(date){
   const formater= new Intl.DateTimeFormat("en", {
          month:"short",
          day:"2-digit"
        });
        return formater.format(date)
}