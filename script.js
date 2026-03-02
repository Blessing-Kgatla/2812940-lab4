async function searchCountry(countryName) {

    const spinner = document.getElementById('loading-spinner');
    try {
        // Show loading spinner
        spinner.style.display = 'block';

        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        const country = data[0];

        if (!response.ok) {
            document.getElementById('country-info').innerHTML = "sorry, it doesn't exist";
            return;
        }

        // Update DOM
        document.getElementById('country-info').innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;

        // Fetch bordering countries
        if (country.borders) {
            const borderResponse = await fetch(` https://restcountries.com/v3.1/alpha/{code}`);
            const borderData = await borderResponse.json();
            
            // Update bordering countries section
            const borderNames = borderData.map(border => border.name.common).join(', ');
            document.getElementById('bordering-countries').innerHTML = `<p><strong>Borders:</strong> ${borderNames}</p>`;
        } else {
            document.getElementById('bordering-countries').innerHTML = `<p><strong>Borders:</strong> None</p>`;
        }

    } catch (error) {
       console.error(error.message);
    } finally {
        // Hide loading spinner
        spinner.style.display = 'none';
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});
