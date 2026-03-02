async function searchCountry(countryName) {

    const spinner = document.getElementById('loading-spinner');
    const countryInfo = document.getElementById('country-info');
    const bordersSection = document.getElementById('bordering-countries');
    const errorMessage = document.getElementById('error-message');

    countryInfo.innerHTML = '';
    bordersSection.innerHTML = '';
    errorMessage.textContent = '';

    try {
        // Show loading spinner
        spinner.style.display = 'block';

        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const data = await response.json();
        const country = data[0];

        if (!response.ok) {
            throw new Error("Country not found");
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
        if (country.borders && country.borders.length > 0) {

            const borderCodes = country.borders.join(',');
            const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`);
            const borderData = await borderResponse.json();
    
            const borderHTML = borderData.map(border => `
                <div class="border-item" style="display: inline-block; margin: 10px; text-align: center;">
                    <img src="${border.flags.svg}" alt="${border.name.common} flag" style="width: 50px; display: block; margin: 0 auto;">
                    <span>${border.name.common}</span>
            </div>
    `       ).join('');

        document.getElementById('bordering-countries').innerHTML = `<h3>Borders:</h3>${borderHTML}`;
    } else {
        document.getElementById('bordering-countries').innerHTML = `<p><strong>Borders:</strong> None (Island nation)</p>`;
    }

    } catch (error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = "Sorry, the country you entered does not exist.";
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
