function formatNumber(number) {
    return number.toFixed(1).replace('.', ',');
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function showLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('show')
    loader.classList.remove('hidden');
}


function hideLoader() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        loader.classList.remove('show');
    }, 1000);
}


function showTab(tabName) {
    hideAllTabs();
    showTabById(tabName);
    deactivateAllTabButtons();
    activateTabButtonById(tabName);
}


function hideAllTabs() {
    const tabIds = ['about', 'stats', 'evolution'];
    for (let i = 0; i < tabIds.length; i++) {
        const id = tabIds[i];
        const tab = document.getElementById(`tab-${id}`);
        if (tab) {
            tab.classList.remove('show');
            tab.classList.add('hidden');
        }
    }
}


function showTabById(tabName) {
    const tab = document.getElementById(`tab-${tabName}`);
    if (tab) {
        tab.classList.remove('hidden');
        tab.classList.add('show');
    }
}


function deactivateAllTabButtons() {
    const buttonIds = ['about-btn', 'stats-btn', 'evolution-btn'];
    for (let i = 0; i < buttonIds.length; i++) {
        const id = buttonIds[i];
        const button = document.getElementById(id);
        if (button) {
            button.classList.remove('active');
        }
    }
}


function activateTabButtonById(tabName) {
    const button = document.getElementById(`${tabName}-btn`);
    if (button) {
        button.classList.add('active');
    }
}


function getPokemonTypeColor(type) {
    const typeColors = {
        bug: '#92bc2c',
        dark: '#595761',
        dragon: '#0c69c8',
        electric: '#f2d94e',
        fairy: '#ee90e6',
        fighting: '#d3425f',
        flying: '#a1bbec',
        fire: '#fba54c',
        ghost: '#5f6dbc',
        grass: '#5fbd58',
        ground: '#da7c4d',
        ice: '#75d0c1',
        normal: '#a0a29f',
        poison: '#b763cf',
        psychic: '#fa8581',
        rock: '#c9bb8a',
        steel: '#5695a3',
        water: '#539ddf'
    };
    return typeColors[type];
}
