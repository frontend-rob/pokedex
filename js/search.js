function setVisibility(element, isVisible) {
    element.classList.toggle('show', isVisible);
    element.classList.toggle('hidden', !isVisible);
}


function updateSearchResults(isVisible, message = '') {
    const resultsContainer = document.getElementById('search-results');
    const modalText = document.getElementById('search-modal-text');

    setVisibility(resultsContainer, isVisible);
    setVisibility(modalText, !isVisible);

    if (isVisible && message) {
        resultsContainer.innerHTML = `<p>${message}</p>`;
    } else if (!isVisible) {
        resultsContainer.innerHTML = '';
    }
}


function filterPokemon() {
    const searchText = document.getElementById('search-input').value.toLowerCase().trim();

    if (searchText.length < 3) {
        updateSearchResults(false);
        return;
    }

    const filteredPokemon = allNamesAndUrl.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchText)
    );

    if (filteredPokemon.length === 0) {
        updateSearchResults(true, 'No Pokémon found.');
        return;
    }

    renderSearchResults(filteredPokemon);
    updateSearchResults(true);
}


document.getElementById('search-input').addEventListener('input', filterPokemon);

function renderSearchResults(pokemonList) {
    const searchResultsContainer = document.getElementById('search-results');
    let resultsHTML = '';

    for (let i = 0; i < pokemonList.length; i++) {
        resultsHTML += createPokemonCard(pokemonList[i]);
    }

    searchResultsContainer.innerHTML = resultsHTML;
}


function createPokemonCard(pokemon) {
    const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

    return `
        <div class="result-card" onclick="openSearchedPokemon(${pokemonId})">
            <div class="result-pokemon">
                <img class="search-img" src="${pokemonImageUrl}" alt="${pokemon.name}">
                <p>${capitalizeFirstLetter(pokemon.name)}</p>
            </div>
            <p>#${pokemonId}</p>
        </div>
    `;
}


async function openSearchedPokemon(pokemonId) {
    const pokemonIndex = searchedPokemon.findIndex(pokemon => pokemon.id == pokemonId);

    if (pokemonIndex !== -1) {
        isFromSearch = true;
        showPokemonDetails(pokemonIndex, true);
    } else {
        try {
            const pokemon = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            searchedPokemon.push(pokemon);
            isFromSearch = true;
            showPokemonDetails(searchedPokemon.length - 1, true);
        } catch (error) {
            console.error('Fehler beim Abrufen der Pokémon-Daten:', error);
        }
    }
    closeSearchModal();
}


function showSearchInput() {
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');

    setVisibility(searchContainer, true);
    document.body.classList.add('no-scroll');
    searchInput.focus();

    searchContainer.addEventListener('click', closeOnContainerClick);
    document.addEventListener('keydown', closeOnEscapePress);
}


function closeOnContainerClick(event) {
    const searchContainer = document.getElementById('search-container');
    if (event.target === searchContainer) {
        closeSearchModal();
    }
}


function closeOnEscapePress(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
        closeSearchModal();
    }
}


function closeSearchModal() {
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');

    setVisibility(searchContainer, false);
    document.body.classList.remove('no-scroll');
    searchInput.value = '';
    updateSearchResults(false);
}