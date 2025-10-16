document.addEventListener('DOMContentLoaded', () => {

    // LÓGICA DO MENU RESPONSIVO 
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('is-open');
        });
    }

  
    const projectsContainer = document.getElementById('projects-container');
    const favoritesContainer = document.getElementById('favorites-container');
    const sortSelect = document.getElementById('sort-by');


    if (projectsContainer && favoritesContainer && sortSelect) {

        const projectsData = [
            { id: 1, title: "Educação para Todos", raised: 7500, image: "/assets/images/criancas-estudando.jpg", description: "Levando educação de qualidade para comunidades carentes." },
            { id: 2, title: "Sopa Solidária", raised: 9800, image: "/assets/images/distribuindo-alimentos.jpg", description: "Distribuição de alimentos para pessoas em situação de rua." },
            { id: 3, title: "Cuidando do Planeta", raised: 5200, image: "/assets/images/plantando-arvore.jpg", description: "Projetos de reciclagem e limpeza de áreas verdes." },
        ];

        let favoriteProjectIds = JSON.parse(localStorage.getItem('favoriteProjects')) || [];

        const saveFavorites = () => {
            localStorage.setItem('favoriteProjects', JSON.stringify(favoriteProjectIds));
        };

        const createProjectCardHTML = (project) => {
            const isFavorited = favoriteProjectIds.includes(project.id);
            return `
                <div class="card">
                    <img src="${project.image}" alt="Imagem do projeto ${project.title}" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">${project.title}</h3>
                        <p>${project.description.substring(0, 100)}...</p>
                        <div class="card-footer">
                            <button class="btn btn-primary btn-saibamais" data-project-id="${project.id}">Saiba Mais</button>
                            <button 
                                class="btn btn-favorite ${isFavorited ? 'active' : ''}" 
                                data-project-id="${project.id}" 
                                aria-pressed="${isFavorited}"
                                aria-label="${isFavorited ? 'Desfavoritar projeto' : 'Favoritar projeto'}">
                                &#9733;
                            </button>
                        </div>
                    </div>
                </div>
            `;
        };

        const renderFavorites = () => {
            favoritesContainer.innerHTML = '';
            const favoriteProjects = projectsData.filter(project => favoriteProjectIds.includes(project.id));
            if (favoriteProjects.length === 0) {
                favoritesContainer.innerHTML = '<p class="empty-favorites">Você ainda não favoritou nenhum projeto.</p>';
            } else {
                favoriteProjects.forEach(project => {
                    const cardHTML = createProjectCardHTML(project);
                    favoritesContainer.insertAdjacentHTML('beforeend', cardHTML);
                });
            }
        };

        const renderAllProjects = (projectsToRender) => {
            projectsContainer.innerHTML = '';
            projectsToRender.forEach(project => {
                const cardHTML = createProjectCardHTML(project);
                projectsContainer.insertAdjacentHTML('beforeend', cardHTML);
            });
        };

        const updateProjectDisplay = () => {
            const sortBy = sortSelect.value;
            let sortedProjects = [...projectsData];

            if (sortBy === 'name-asc') {
                sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortBy === 'raised-desc') {
                sortedProjects.sort((a, b) => b.raised - a.raised);
            }

            renderAllProjects(sortedProjects);
        };

        sortSelect.addEventListener('change', updateProjectDisplay);

        updateProjectDisplay();
        renderFavorites();
    }


    // LÓGICA DO MODAL
    const formInscricao = document.getElementById('form-inscricao-projeto');
    if (formInscricao) {

        document.body.addEventListener('click', (event) => {
            const favoriteButton = event.target.closest('.btn-favorite');
            if (favoriteButton) {
            }

            const saibaMaisBtn = event.target.closest('.btn-saibamais');
            if (saibaMaisBtn) {

            }
        });
        
        formInscricao.addEventListener('submit', (event) => {

        });
    }

});