// Elementos DOM
const stateSelect = document.getElementById('state');
const yearSelect = document.getElementById('year');

// Meses
const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

// Estados e anos
const states = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
                "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE"];
const years = ["2023","2024"];

// Dados simulados
const dengueData = {};
states.forEach(uf=>{
  dengueData[uf]={};
  years.forEach(y=>{
    dengueData[uf][y] = Array.from({length:12}, ()=>Math.floor(Math.random()*1000)+100);
  });
});

// Popula selects
states.forEach(uf=>{
  const opt = document.createElement('option');
  opt.value=uf; opt.textContent=uf;
  stateSelect.appendChild(opt);
});
years.forEach(y=>{
  const opt = document.createElement('option');
  opt.value=y; opt.textContent=y;
  yearSelect.appendChild(opt);
});

// -------- GRÁFICO PRINCIPAL --------
const ctx = document.getElementById('casesChart').getContext('2d');
let chart = new Chart(ctx,{
  type:'line',
  data:{
    labels:months,
    datasets:[{
      label:`Casos de Dengue - ${states[0]} ${years[0]}`,
      data:dengueData[states[0]][years[0]],
      borderColor:'rgba(0,200,83,1)',
      backgroundColor:'rgba(0,200,83,0.2)',
      fill:true,
      tension:0.4
    }]
  },
  options:{
    responsive:true,
    plugins:{legend:{display:true}, title:{display:true,text:'Casos de Dengue por Mês'}},
    scales:{y:{beginAtZero:true}}
  }
});

// Atualiza gráfico
function updateChart(){
  const state = stateSelect.value;
  const year = yearSelect.value;

  chart.data.datasets[0].data = dengueData[state][year];
  chart.data.datasets[0].label = `Casos de Dengue - ${state} ${year}`;
  chart.update();
}

// Painel toggle
const infoPanel = document.getElementById('info-panel');
document.getElementById('toggle-button').addEventListener('click', ()=>{
  infoPanel.style.display = infoPanel.style.display==='none'?'block':'none';
});

// Eventos selects
stateSelect.addEventListener('change', updateChart);
yearSelect.addEventListener('change', updateChart);

// Inicialização
stateSelect.value = states[0];
yearSelect.value = years[0];
updateChart();
