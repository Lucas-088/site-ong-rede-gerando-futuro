document.addEventListener('DOMContentLoaded', () => {

    // LÓGICA DO MENU RESPONSIVO
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('is-open');
        });
    }

    // DADOS E VARIÁVEIS GLOBAIS DO PROJETO
    const projectsData = [
        { id: 1, title: "Educação para Todos", raised: 7500, image: "assets/images/criancas-estudando.jpg", description: "Levando educação de qualidade para comunidades carentes." },
        { id: 2, title: "Sopa Solidária", raised: 9800, image: "assets/images/distribuindo-alimentos.jpg", description: "Distribuição de alimentos para pessoas em situação de rua." },
        { id: 3, title: "Cuidando do Planeta", raised: 5200, image: "assets/images/plantando-arvore.jpg", description: "Projetos de reciclagem e limpeza de áreas verdes." },
    ];

    const projectsContainer = document.getElementById('projects-container');
    const favoritesContainer = document.getElementById('favorites-container');
    const sortSelect = document.getElementById('sort-by');

    let favoriteProjectIds = JSON.parse(localStorage.getItem('favoriteProjects')) || [];


    // FUNÇÕES

    /**
     * Salva a lista atual de IDs de projetos favoritos no localStorage do navegador
     */
    const saveFavorites = () => {
        localStorage.setItem('favoriteProjects', JSON.stringify(favoriteProjectIds));
    };

    /**
     * Cria a string de HTML para um único card de projeto.
     * @param {object} project - O objeto do projeto que contém dados como id, title, image
     * @returns {string} Uma string de texto contendo o HTML completo do card
     */
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

    /**
     * Renderiza os cards dos projetos favoritados na sua respetiva secção.
     * Se não houver favoritos, exibe uma mensagem.
     */
    const renderFavorites = () => {
        if (!favoritesContainer) return;
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

    /** Renderiza uma lista de projetos na secção principal de "Projetos em Destaque".
     * @param {Array<object>} projectsToRender 
     */
    const renderAllProjects = (projectsToRender) => {
        if (!projectsContainer) return;
        projectsContainer.innerHTML = '';
        projectsToRender.forEach(project => {
            const cardHTML = createProjectCardHTML(project);
            projectsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    };

    // Lê a opção de ordenação selecionada, ordena os projetos
    const updateProjectDisplay = () => {
        if (!sortSelect) return;
        const sortBy = sortSelect.value;
        let sortedProjects = [...projectsData];

        if (sortBy === 'name-asc') {
            sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'raised-desc') {
            sortedProjects.sort((a, b) => b.raised - a.raised);
        }

        renderAllProjects(sortedProjects);
    };

    // MANIPULADORES DE EVENTOS

    // Listener principal para cliques em botões (favoritar e "saiba mais")
    document.body.addEventListener('click', (event) => {
        const favoriteButton = event.target.closest('.btn-favorite');
        if (favoriteButton) {
            const projectId = parseInt(favoriteButton.dataset.projectId, 10);
            if (favoriteProjectIds.includes(projectId)) {
                favoriteProjectIds = favoriteProjectIds.filter(id => id !== projectId);
            } else {
                favoriteProjectIds.push(projectId);
            }
            saveFavorites();
            updateProjectDisplay();
            renderFavorites();
            return;
        }

        const saibaMaisBtn = event.target.closest('.btn-saibamais');
        if (saibaMaisBtn) {
            const projectId = parseInt(saibaMaisBtn.dataset.projectId, 10);
            const project = projectsData.find(p => p.id === projectId);
            
            const modalTitle = document.getElementById('modal-title');
            const modalDescription = document.getElementById('modal-description');
            const projectIdInput = document.getElementById('project-id-input');
            
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            projectIdInput.value = project.id;

            const projectModal = new bootstrap.Modal(document.getElementById('project-details-modal'));
            projectModal.show();
        }
    });

    // Listener para o formulário de inscrição no modal
    const formInscricao = document.getElementById('form-inscricao-projeto');
    if (formInscricao) {
        formInscricao.addEventListener('submit', (event) => {
            event.preventDefault();
            const projectId = document.getElementById('project-id-input').value;
            const projectName = projectsData.find(p => p.id == projectId).title;

            alert(`Inscrição para o projeto "${projectName}" enviada com sucesso! Obrigado por se candidatar.`);

            const projectModal = bootstrap.Modal.getInstance(document.getElementById('project-details-modal'));
            projectModal.hide();
            formInscricao.reset();
        });
    }

    // Listener para o seletor de ordenação
    if (sortSelect) {
        sortSelect.addEventListener('change', updateProjectDisplay);
    }

    // INICIALIZAÇÃO
    // Renderiza o conteúdo inicial da página assim que ela carrega
    if (projectsContainer) {
        updateProjectDisplay();
    }
    if (favoritesContainer) {
        renderFavorites();
    }
});