// Simple vanilla JS Kanban + local persistence
const projectKey='personal-dashboard-v1';
let state = JSON.parse(localStorage.getItem(projectKey)||'{}');
if(!state.cards) state={cards:{todo:[],doing:[],done:[]},jobs:[],projects:[],recipes:[]};
function save(){localStorage.setItem(projectKey,JSON.stringify(state));}
function render(){['todo','doing','done'].forEach(col=>{
  const el=document.getElementById(col); el.innerHTML=''; state.cards[col].forEach((c,i)=>{const d=document.createElement('div');d.className='card';d.draggable=true;d.textContent=c; d.dataset.index=i; d.addEventListener('dragstart',e=>{e.dataTransfer.setData('text/plain',col+'|'+i)}); el.appendChild(d)});
});
const jobs=document.getElementById('jobs'); jobs.innerHTML=''; state.jobs.forEach((j,i)=>{const li=document.createElement('li'); li.textContent=j; jobs.appendChild(li)});
const projectsList=document.getElementById('projects-list'); projectsList.innerHTML=''; state.projects.forEach(p=>{const li=document.createElement('li'); li.textContent=p; projectsList.appendChild(li)});
const recipes=document.getElementById('recipes-list'); recipes.innerHTML=''; state.recipes.forEach(r=>{const box=document.createElement('div');box.className='recipe'; box.innerHTML=`<strong>${r.title}</strong><div>${r.ingredients.join(', ')}</div><div>${r.steps}</div>`; recipes.appendChild(box)});
}
function addCard(){const v=document.getElementById('new-card').value.trim(); if(!v) return; state.cards.todo.push(v); document.getElementById('new-card').value=''; save(); render();}
function addJob(){state.jobs.push('Placeholder job idea'); save(); render();}
function setupDrag(){document.querySelectorAll('.column .cards').forEach(c=>{c.addEventListener('dragover',e=>e.preventDefault()); c.addEventListener('drop',e=>{e.preventDefault(); const data=e.dataTransfer.getData('text/plain'); if(!data) return; const [from,idx]=data.split('|'); const item=state.cards[from].splice(idx,1)[0]; const to=c.id; state.cards[to].push(item); save(); render();});});}
function detectProjects(){// simple scan via prepopulated list from backend; we'll fetch /api/projects if available
  fetch('/api/projects').then(r=>r.json()).then(d=>{ if(Array.isArray(d.projects)){ state.projects=d.projects; save(); render(); }}).catch(()=>{});
}
document.getElementById('add').addEventListener('click',addCard);
document.getElementById('add-job').addEventListener('click',addJob);
// init sample recipes
if(!state.recipes || state.recipes.length===0){state.recipes=[
  {title:'Tomato & Herb Pasta',ingredients:['pasta','tomato','olive oil','basil'],steps:'Cook pasta. Toss with sautéed tomato, olive oil and basil.'},
  {title:'Chickpea Salad',ingredients:['chickpeas','cucumber','tomato','olive oil','lemon'],steps:'Mix and dress with lemon and olive oil.'},
  {title:'Omelette with Herbs',ingredients:['eggs','milk','butter','cheese','herbs'],steps:'Beat eggs with milk, cook with butter and cheese.'}
]; save();}
render(); setupDrag(); detectProjects();
