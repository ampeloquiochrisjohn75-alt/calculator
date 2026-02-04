document.addEventListener('DOMContentLoaded', ()=>{
  const display = document.getElementById('display');
  const keys = document.querySelector('.keys');
  let expression = '';

  function updateDisplay(){
    display.textContent = expression || '0';
  }

  keys.addEventListener('click', e=>{
    const btn = e.target.closest('button');
    if(!btn) return;
    const action = btn.dataset.action;
    if(action==='clear'){
      expression = '';
      updateDisplay();
      return;
    }
    if(action==='delete'){
      expression = expression.slice(0,-1);
      updateDisplay();
      return;
    }
    if(action==='equals'){
      calculate();
      return;
    }
    const val = btn.dataset.value;
    expression += val;
    updateDisplay();
  });

  function calculate(){
    // sanitize input: allow digits, operators, parentheses, dots and spaces
    const safe = expression.replace(/[^0-9+\-*/(). ×÷−\s]/g,'');
    const normalized = safe.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');
    try{
      const result = Function('"use strict"; return ('+normalized+')')();
      expression = String(result);
      updateDisplay();
    }catch(e){
      display.textContent = 'Error';
      expression = '';
    }
  }

  document.addEventListener('keydown', e=>{
    const key = e.key;
    if((key>='0' && key<='9') || ['+','-','*','/','.','(',')'].includes(key)){
      expression += key;
      updateDisplay();
      return;
    }
    if(key==='Enter'){
      e.preventDefault();
      calculate();
      return;
    }
    if(key==='Backspace'){
      expression = expression.slice(0,-1);
      updateDisplay();
      return;
    }
    if(key==='Escape'){
      expression = '';
      updateDisplay();
      return;
    }
  });
});
