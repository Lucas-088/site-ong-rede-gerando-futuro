document.addEventListener("DOMContentLoaded",()=>{const p=document.getElementById("hamburger-btn"),u=document.getElementById("nav-menu");p&&u&&p.addEventListener("click",()=>{u.classList.toggle("is-open")});const d=document.getElementById("projects-container"),i=document.getElementById("favorites-container"),c=document.getElementById("sort-by"),l=document.getElementById("form-inscricao-projeto");if(d&&i&&c){const r=[{id:1,title:"Educação para Todos",raised:7500,image:"public/assets/images/criancas-estudando.jpg",description:"Levando educação de qualidade para comunidades carentes."},{id:2,title:"Sopa Solidária",raised:9800,image:"public/assets/images/distribuindo-alimentos.jpg",description:"Distribuição de alimentos para pessoas em situação de rua."},{id:3,title:"Cuidando do Planeta",raised:5200,image:"public/assets/images/plantando-arvore.jpg",description:"Projetos de reciclagem e limpeza de áreas verdes."}];let s=JSON.parse(localStorage.getItem("favoriteProjects"))||[];const j=()=>{localStorage.setItem("favoriteProjects",JSON.stringify(s))},g=e=>{const t=s.includes(e.id);return`
                <div class="card">
                    <img src="${e.image}" alt="Imagem do projeto ${e.title}" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">${e.title}</h3>
                        <p>${e.description.substring(0,100)}...</p>
                        <div class="card-footer">
                            <button class="btn btn-primary btn-saibamais" data-project-id="${e.id}">Saiba Mais</button>
                            <button 
                                class="btn btn-favorite ${t?"active":""}" 
                                data-project-id="${e.id}" 
                                aria-pressed="${t}"
                                aria-label="${t?"Desfavoritar projeto":"Favoritar projeto"}">
                                &#9733;
                            </button>
                        </div>
                    </div>
                </div>
            `},v=()=>{i.innerHTML="";const e=r.filter(t=>s.includes(t.id));e.length===0?i.innerHTML='<p class="empty-favorites">Você ainda não favoritou nenhum projeto.</p>':e.forEach(t=>{const o=g(t);i.insertAdjacentHTML("beforeend",o)})},f=e=>{d.innerHTML="",e.forEach(t=>{const o=g(t);d.insertAdjacentHTML("beforeend",o)})},m=()=>{const e=c.value;let t=[...r];e==="name-asc"?t.sort((o,a)=>o.title.localeCompare(a.title)):e==="raised-desc"&&t.sort((o,a)=>a.raised-o.raised),f(t)};c.addEventListener("change",m),document.body.addEventListener("click",e=>{const t=e.target.closest(".btn-favorite");if(t){const a=parseInt(t.dataset.projectId,10);s.includes(a)?s=s.filter(n=>n!==a):s.push(a),j(),m(),v();return}const o=e.target.closest(".btn-saibamais");if(o){const a=parseInt(o.dataset.projectId,10),n=r.find(y=>y.id===a),b=document.getElementById("modal-title"),I=document.getElementById("modal-description"),E=document.getElementById("project-id-input");b.textContent=n.title,I.textContent=n.description,E.value=n.id,new bootstrap.Modal(document.getElementById("project-details-modal")).show()}}),l&&l.addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("project-id-input").value,o=r.find(n=>n.id==t).title;alert(`Inscrição para o projeto "${o}" enviada com sucesso! Obrigado por se candidatar.`),bootstrap.Modal.getInstance(document.getElementById("project-details-modal")).hide(),l.reset()}),m(),v()}});
