document.addEventListener("DOMContentLoaded", async () => {
    const characterList = document.getElementById('character-list');
    const characterName = document.getElementById('character-name');
    const characterGender = document.getElementById('character-gender');
    const characterHeight = document.getElementById('character-height');
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('https://swapi.dev/api/people/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const characters = data.results;

        characters.forEach(character => {
            try {
                const characterElement = document.createElement('p');
                characterElement.textContent = character.name;
                characterElement.addEventListener('click', () => displayCharacterDetails(character));
                characterList.appendChild(characterElement);
            } catch (error) {
                console.error('Error creating character element:', error);
                errorMessage.textContent = 'Error loading some characters. Please try again later.';
            }
        });
    } catch (error) {
        console.error('Error fetching characters:', error);
        errorMessage.textContent = 'Error loading character. Please try again later.';
    }
    function displayCharacterDetails(character) {
        try {
            characterName.textContent = `Name: ${character.name}`;
            characterGender.textContent = `Gender: ${character.gender}`;
            characterHeight.textContent = `Height: ${character.height}`;
        } catch (error) {
            console.error('Error displaying character details:', error);
            errorMessage.textContent = 'Error displaying character details. Please try again.';
        }
    }
});