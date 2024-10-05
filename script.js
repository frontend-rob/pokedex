const allPokemonNumber = 1025;
let limit = 20;
let offset = 0;
let allNamesAndUrl = [];
let loadedPokemon = [];
let searchedPokemon = [];
let isFromSearch = false;
let currentPokemonId;


// ==================== API CALLS ====================


async function fetchAllPokemonNamesAndUrls() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${allPokemonNumber}&offset=0`);
    const data = await response.json();
    allNamesAndUrl = data.results;
}


async function fetchPokemon(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    return await response.json();
}


async function fetchPokemonSpecies(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    return await response.json();
}


async function fetchPokemonEvolutionChain(evolutionChainUrl) {
    const response = await fetch(evolutionChainUrl);
    const data = await response.json();
    return data;
}


async function fetchPokemonDetails(pokemonUrl) {
    const response = await fetch(pokemonUrl);
    const pokemonData = await response.json();
    return pokemonData;
}


// ==================== RENDERING ====================


async function renderPokemonCards(container, isLoadMore = false) {
    showLoader();

    const pokemonList = allNamesAndUrl.slice(offset, offset + limit);
    let cardHTML = '';

    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = await fetchPokemonDetails(pokemonList[i].url);
        const index = loadedPokemon.length;
        cardHTML += getPokemonCardTemplate(pokemon, index);
        loadedPokemon.push(pokemon);
    }

    container.innerHTML = isLoadMore ? container.innerHTML + cardHTML : cardHTML;
    hideLoader();
}


async function loadMorePokemon() {
    const container = document.getElementById('card-content');
    offset += limit;
    await renderPokemonCards(container, true);
}


// ==================== DATA EXTRACTION ====================


async function fetchPokemonData(pokemonId) {
    try {
        const [pokemonData, speciesData] = await Promise.all([
            fetchPokemon(pokemonId),
            fetchPokemonSpecies(pokemonId)
        ]);

        const evolutionData = await fetchPokemonEvolutionChain(speciesData.evolution_chain.url);
        return {
            ...extractPokemonDetails(pokemonData, speciesData),
            evolutions: evolutionData
        };
    } catch (error) {
        console.error('Fehler beim Abrufen der Pokémon-Daten:', error);
        return null;
    }
}


function extractPokemonDetails(pokemonData, speciesData) {
    return {
        id: pokemonData.id,
        genus: getGenus(speciesData),
        height: pokemonData.height,
        weight: pokemonData.weight,
        habitat: getHabitat(speciesData),
        eggGroups: getEggGroups(speciesData),
        growthRate: getGrowthRate(speciesData),
        genderRate: getGenderRate(speciesData),
        types: getTypes(pokemonData),
        stats: getStats(pokemonData),
    };
}


// ==================== DETAIL MODAL ====================


async function showPokemonDetails(index, fromSearch = false) {
    const selectedPokemon = fromSearch ? searchedPokemon[index] : loadedPokemon[index];

    if (!selectedPokemon) {
        console.error('Pokemon nicht gefunden');
        return;
    }

    currentPokemonId = selectedPokemon.id;

    const modal = document.getElementById('pokemonModal');
    showModal(modal);
    updateModalContent(modal, selectedPokemon);

    const typeColor = getPokemonTypeColor(selectedPokemon.types[0].type.name);
    setTypeColor(typeColor);

    try {
        const pokemonDetails = await fetchPokemonData(currentPokemonId);
        await updateAllTabs(modal, pokemonDetails);
    } catch (error) {
        console.error('Fehler beim Abrufen der Pokémon-Beschreibung:', error);
    }
}


// ==================== MODAL CONTROL ====================


function showModal(modal) {
    modal.classList.add('show');
    modal.classList.remove('hidden');
    document.body.classList.add('no-scroll');

    modal.addEventListener('click', handleModalClick);
    document.addEventListener('keydown', handleEscapeKey);
}

function closeDetailModal() {
    const modal = document.getElementById('pokemonModal');
    modal.classList.add('hidden');
    modal.classList.remove('show');
    document.body.classList.remove('no-scroll');

    modal.removeEventListener('click', handleModalClick);
    document.removeEventListener('keydown', handleEscapeKey);
    isFromSearch = false;
}


function handleModalClick(event) {
    if (event.target === event.currentTarget) {
        closeDetailModal();
    }
}


function handleEscapeKey(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
        closeDetailModal();
    }
}


function previousPokemon() {

    if (isFromSearch) {
        return;
    }

    const currentIndex = loadedPokemon.findIndex(pokemon => pokemon.id === currentPokemonId);

    if (currentIndex > 0) {
        showPokemonDetails(currentIndex - 1);
    }
}


async function nextPokemon() {
    
    if (isFromSearch) {
        return;
    }

    const currentIndex = loadedPokemon.findIndex(pokemon => pokemon.id === currentPokemonId);

    if (currentIndex < loadedPokemon.length - 1) {
        showPokemonDetails(currentIndex + 1);
    } else {
        await handleLoadMorePokemon();
    }
}


async function handleLoadMorePokemon() {
    closeDetailModal();
    showLoader();

    await new Promise(resolve => setTimeout(resolve, 1000));
    await loadMorePokemon();
    setTimeout(() => {
        loader.classList.add('hidden');
        loader.classList.remove('show');
    }, 0);

    const newIndex = loadedPokemon.findIndex(pokemon => pokemon.id === currentPokemonId) + 1;
    if (newIndex < loadedPokemon.length) {
        showPokemonDetails(newIndex);
    }
}


// ==================== MODAL CONTENT UPDATES ====================


function updateModalContent(modal, pokemon) {
    modal.innerHTML = getPokemonDetailTemplate(pokemon);
}


function updateAboutTab(modal, pokemonDetails) {
    const aboutTab = modal.querySelector('#tab-about');
    if (aboutTab) {
        aboutTab.innerHTML = getAboutPokemonTemplate(pokemonDetails);
    }
}


function updateStatsTab(modal, pokemonDetails) {
    const statsTab = modal.querySelector('#tab-stats');
    if (statsTab) {
        statsTab.innerHTML = getStatsTemplate(pokemonDetails.stats, pokemonDetails.types);
    }
}


function updateEvolutionTab(modal, evolutionData) {
    const evolutionTab = modal.querySelector('#tab-evolution');
    if (evolutionTab) {
        evolutionTab.innerHTML = getEvolutionChainTemplate(evolutionData);
    }
}


async function updateAllTabs(modal, pokemonDetails) {
    await Promise.all([
        updateAboutTab(modal, pokemonDetails),
        updateStatsTab(modal, pokemonDetails),
        updateEvolutionTab(modal, pokemonDetails.evolutions)
    ]);
}


// ==================== HELPER FUNCTIONS ====================


function getHabitat(speciesData) {
    if (speciesData.habitat) {
        return speciesData.habitat.name;
    }
    return `Unknown`;
}


function getGrowthRate(speciesData) {
    if (speciesData.growth_rate) {
        return speciesData.growth_rate.name;
    }
    return `Unknown`;
}


function getTypes(pokemonData) {
    const types = [];
    for (let i = 0; i < pokemonData.types.length; i++) {
        types.push(pokemonData.types[i].type.name);
    }
    return types;
}


function getGenus(speciesData) {
    for (let i = 0; i < speciesData.genera.length; i++) {
        if (speciesData.genera[i].language.name === 'en') {
            const genus = speciesData.genera[i].genus;
            return genus.replace(' Pokémon', '');
        }
    }
    return `Unknown`;
}


function getGenderRate(speciesData) {
    const rate = speciesData.gender_rate;
    if (rate === -1) return `<p>Unknown</p>`;

    const maleRate = (8 - rate) * 12.5;
    const femaleRate = rate * 12.5;
    const maleIcon = '<svg class="male-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256"><path d="M216,32H168a8,8,0,0,0,0,16h28.69L154.62,90.07a80,80,0,1,0,11.31,11.31L208,59.32V88a8,8,0,0,0,16,0V40A8,8,0,0,0,216,32ZM149.24,197.29a64,64,0,1,1,0-90.53A64.1,64.1,0,0,1,149.24,197.29Z"></path></svg>';
    const femaleIcon = '<svg class="female-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256"><path d="M208,96a80,80,0,1,0-88,79.6V200H88a8,8,0,0,0,0,16h32v24a8,8,0,0,0,16,0V216h32a8,8,0,0,0,0-16H136V175.6A80.11,80.11,0,0,0,208,96ZM64,96a64,64,0,1,1,64,64A64.07,64.07,0,0,1,64,96Z"></path></svg>';

    return `
        <div class="male-gender">
            ${maleIcon} <p>${formatNumber(maleRate)} %</p>
        </div>
        <div class="female-gender">
            ${femaleIcon} <p>${formatNumber(femaleRate)} %</p>
        </div>
    `;
}


function getEggGroups(speciesData) {
    const eggGroups = [];
    for (let i = 0; i < speciesData.egg_groups.length; i++) {
        eggGroups.push(speciesData.egg_groups[i].name);
    }
    return eggGroups.join(', ');
}


function getStats(pokemonData) {
    return pokemonData.stats;
}


function setTypeColor(color) {
    document.documentElement.style.setProperty('--tab-indicator-color', color);
}


// ==================== INITIALIZE ====================


async function init() {
    showLoader();
    const components = getComponents();
    loadTemplates(components);
    initializeTheme();
    await fetchAllPokemonNamesAndUrls();
    await renderPokemonCards(components.pokemonCard);

}


function getComponents() {
    return {
        header: document.getElementById('header-content'),
        footer: document.getElementById('footer-content'),
        pokemonCard: document.getElementById('card-content')
    };
}


function loadTemplates(components) {
    components.header.innerHTML = getHeaderTemplate();
    components.footer.innerHTML = getFooterTemplate();
}