function getHeaderTemplate() {
    return `
        <div class="header-inner">
            <a href="./index.html" class="main-logo">
                <img class="header-logo" src="./assets/img/pokeball.svg" alt="Logo">
                <span class="logo-txt">Pokédex</span>
            </a>
            <div class="menu-btns">
                <button class="btn btn-ghost" aria-label="search-btn" onclick="showSearchInput()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                    <span>Search</span>
                </button>
                <button class="btn btn-ghost" aria-label="theme-btn" onclick="changeTheme()">
                    <svg id="dark-icon" class="theme-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256">
                        <path
                            d="M240,96a8,8,0,0,1-8,8H216v16a8,8,0,0,1-16,0V104H184a8,8,0,0,1,0-16h16V72a8,8,0,0,1,16,0V88h16A8,8,0,0,1,240,96ZM144,56h8v8a8,8,0,0,0,16,0V56h8a8,8,0,0,0,0-16h-8V32a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16Zm72.77,97a8,8,0,0,1,1.43,8A96,96,0,1,1,95.07,37.8a8,8,0,0,1,10.6,9.06A88.07,88.07,0,0,0,209.14,150.33,8,8,0,0,1,216.77,153Zm-19.39,14.88c-1.79.09-3.59.14-5.38.14A104.11,104.11,0,0,1,88,64c0-1.79,0-3.59.14-5.38A80,80,0,1,0,197.38,167.86Z">
                        </path>
                    </svg>
                    <svg id="light-icon" class="theme-icon hidden" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                        <path
                            d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z">
                        </path>
                    </svg>
                    <span id="theme-name">Dark</span>
                </button>
            </div>
        </div>
    `;
}


function getFooterTemplate() {
    return `
        <div class="footer-inner">
            <div class="footer-main">
                <div class="footer-logo-wrapper">
                    <img class="footer-logo" src="./assets/img/pokeball.svg" alt="Logo">
                    <span class="logo-txt">Pokédex</span>
                </div>
                <figcaption>Gotta Catch 'Em All.</figcaption>
            </div>
            <figcaption class="made-with-section">
                <span>made with</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                    <path
                        d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z">
                    </path>
                </svg>
                <span>R.G.</span>
            </figcaption>
        </div>
    `;
}


function getPokemonCardTemplate(pokemon, index) {
    const typesHTML = getPokemonTypesTemplate(pokemon.types);
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default;
    const typeClass = getPokemonTypeClass(pokemon.types);
    return `
        <div class="card" onclick="showPokemonDetails(${index})">
            <div class="card-body ${typeClass}">
                <div class="card-header">
                    <span class="pokemon-id">#${pokemon.id}</span>
                </div>
                <div class="card-inner">
                    <div class="pokemon-types">${typesHTML}</div>
                    <img class="pokemon-img" src="${imageUrl}" height="128px" width="128px" alt="${pokemon.name}">
                </div>
            </div>
            <div class="card-footer">
                <h3 class="pokemon-name">${pokemon.name}</h3>
            </div>
        </div>
    `;
}


function getPokemonTypesTemplate(types) {
    let typesHTML = '';

    for (let i = 0; i < types.length; i++) {
        const typeName = types[i].type.name;
        const iconPath = `./assets/img/icons/${typeName}.svg`;
        typesHTML += `
            <div class="pokemon-type">
                <div class="icon ${typeName}">
                    <img src="${iconPath}" alt="${typeName} icon">
                </div>
                ${typeName}
            </div>
        `;
    }
    return typesHTML;
}


function getPokemonTypeClass(types) {
    return types.length > 0 ? `pokemon-type-${types[0].type.name}` : '';
}


function getPokemonDetailTemplate(pokemon) {
    const typesHTML = getPokemonTypesTemplate(pokemon.types);
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default;
    const typeClass = getPokemonTypeClass(pokemon.types);
    return `
        <div class="detail-card">
            <div class="detail-body ${typeClass}">
                <div class="detail-close">
                    <span class="pokemon-id-modal">#${pokemon.id}</span>
                    <button class="btn btn-glass btn-circle" aria-label="close-details-btn" onclick="closeDetailModal()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                            <path
                                d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
                            </path>
                        </svg>
                    </button>
                </div>
                <div class="detail-header">
                    <img class="pokemon-img-modal" src="${imageUrl}" alt="${pokemon.name}">
                </div>
            </div>
            <div class="detail-inner">
                <div class="modal-navigation">
                    <button class="btn btn-outline btn-circle" aria-label="previous-btn" onclick="previousPokemon()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                            <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                        </svg>
                    </button>
                    <h2 class="pokemon-name">${pokemon.name}</h2>
                    <button class="btn btn-outline btn-circle" aria-label="next-btn" onclick="nextPokemon()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256">
                            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                        </svg>
                    </button>
                </div>
                <div class="pokemon-types-detail">${typesHTML}</div>
            </div>
            <div class="specification-wrapper">
                <div class="detail-tabs">
                    <a id="about-btn" class="tab-btn active" onclick="showTab('about')">About</a>
                    <a id="stats-btn" class="tab-btn" onclick="showTab('stats')">Stats</a>
                    <a id="evolution-btn" class="tab-btn" onclick="showTab('evolution')">Evolution</a>
                </div>
                <div class="tab-content">
                    <div id="tab-about" class="tab-pane tab-about show"></div>
                    <div id="tab-stats" class="tab-pane tap-stats hidden"></div>
                    <div id="tab-evolution" class="tab-pane hidden"></div>
                </div>
            </div>
        </div>
    `;
}


function getAboutPokemonTemplate(pokemonDetails) {
    return `
        <div class="pokemon-properties">
            <div class="pokemon-property">
                <div class="property-description">
                    <p>Species</p>
                </div>
                <p>${pokemonDetails.genus}</p>
            </div>
            <div class="pokemon-property">
                <div class="property-description">
                    <p>Height</p>
                </div>
                <p class="pokemon-height">${formatNumber(pokemonDetails.height / 10)} m</p>
            </div>
            <div class="pokemon-property">
                <div class="property-description">
                    <p>Weight</p>
                </div>
                <p class="pokemon-weight">${formatNumber(pokemonDetails.weight / 10)} kg</p>
            </div>
            <div class="pokemon-property">
                <div class="property-description">
                    <p>Habitat</p>
                </div>
                <p>${pokemonDetails.habitat}</p>
            </div>
            <div class="pokemon-property">
                <div class="property-description">
                    <p>Egg Groups</p>
                </div>
                <p>${pokemonDetails.eggGroups}</p>
            </div>
            <div class="pokemon-property">
                <div class="property-description">
                    <p>Gender</p>
                </div>
                <div class="gender-rate">${pokemonDetails.genderRate}</div>
            </div>
        </div>
    `;
}


function getStatsTemplate(stats, types) {
    const toPercentage = value => ((value / 255) * 100).toFixed(1);
    const getTypeClass = (types) => {
        return types && types.length > 0 ? types[0] : 'normal';
    };

    const typeClass = getTypeClass(types);

    return `
        <div class="progress-bar">
            <div class="progress-description">
                <label for="hp-progress">HP:</label>
                <span>${stats[0].base_stat}</span>
            </div>
            <div class="progress">
                <div class="progress-bar-fill ${typeClass}" id="hp-progress" style="width: ${toPercentage(stats[0].base_stat)}%"></div>
            </div>
            <span>255</span>
        </div>
        <div class="progress-bar">
            <div class="progress-description">
                <label for="attack-progress">ATK:</label>
                <span>${stats[1].base_stat}</span>
            </div>
            <div class="progress">
                <div class="progress-bar-fill ${typeClass}" id="attack-progress" style="width: ${toPercentage(stats[1].base_stat)}%"></div>
            </div>
            <span>255</span>
        </div>
        <div class="progress-bar">
            <div class="progress-description">
                <label for="defense-progress">DEF:</label>
                <span>${stats[2].base_stat}</span>
            </div>
            <div class="progress">
                <div class="progress-bar-fill ${typeClass}" id="defense-progress" style="width: ${toPercentage(stats[2].base_stat)}%"></div>
            </div>
            <span>255</span>
        </div>
        <div class="progress-bar">
            <div class="progress-description">
                <label for="special-attack-progress">SATK:</label>
                <span>${stats[3].base_stat}</span>
            </div>
            <div class="progress">
                <div class="progress-bar-fill ${typeClass}" id="special-attack-progress" style="width: ${toPercentage(stats[3].base_stat)}%"></div>
            </div>
            <span>255</span>
        </div>
        <div class="progress-bar">
            <div class="progress-description">
                <label for="special-defense-progress">SDEF:</label>
                <span>${stats[4].base_stat}</span>
            </div>
            <div class="progress">
                <div class="progress-bar-fill ${typeClass}" id="special-defense-progress" style="width: ${toPercentage(stats[4].base_stat)}%"></div>
            </div>
            <span>255</span>
        </div>
        <div class="progress-bar">
            <div class="progress-description">
                <label for="speed-progress">SPD:</label>
                <span>${stats[5].base_stat}</span>
            </div>
            <div class="progress">
                <div class="progress-bar-fill ${typeClass}" id="speed-progress" style="width: ${toPercentage(stats[5].base_stat)}%"></div>
            </div>
            <span>255</span>
        </div>
    `;
}


function getEvolutionChainTemplate(evolutionData) {
    if (!evolutionData || !evolutionData.chain) {
        return `<p>No evolution data available.</p>`;
    }

    return `
        <div class="evolution-chain">
            ${renderEvolutionStage(evolutionData.chain)}
        </div>
    `;
}


function renderEvolutionStage(chain) {
    let evolutionHTML = '';
    let currentChain = chain;

    while (currentChain) {
        evolutionHTML += createEvolutionCard(currentChain);

        if (currentChain.evolves_to.length > 0) {
            currentChain = currentChain.evolves_to[0];
        } else {
            break;
        }
    }

    return evolutionHTML;
}


function createEvolutionCard(chain) {
    const pokemonName = chain.species.name;
    const pokemonId = chain.species.url.split('/').filter(Boolean).pop();
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

    return `
        <div class="evolution-card">
            <div class="evolution-stage">
                <img src="${pokemonImageUrl}" alt="${pokemonName}" class="evolution-img">
                <p>${capitalizeFirstLetter(pokemonName)}</p>
            </div>
            <p>${renderEvolutionDetails(chain)}</p>
        </div>
    `;
}


function renderEvolutionDetails(chain) {
    if (!chain.evolution_details || chain.evolution_details.length === 0) {
        return 'LV 0';
    }

    const details = chain.evolution_details[0];

    if (details.min_level) {
        return `LV ${details.min_level}`;
    }
    if (details.min_happiness) {
        return `HP ${details.min_happiness}`;
    }
    if (details.time_of_day) {
        return `Time of day: ${capitalizeFirstLetter(details.time_of_day)}`;
    }
    if (details.item) {
        return capitalizeFirstLetter(details.item.name);
    }

    return `Unknown`;
}