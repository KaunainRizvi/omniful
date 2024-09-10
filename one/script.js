document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const resultsContainer = document.getElementById('results');
    const loader = document.getElementById('loader');

    let debounceTimer;
    const debounceDelay = 500;

  
    const simulateAPICall = (query) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = ['apple', 'apricot', 'application', 'banana', 'berry', 'cherry', 'date', 'fig', 'grape'];
                const filteredData = data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
                if (filteredData.length > 0) {
                    resolve(filteredData);
                } else {
                    reject('No results found');
                }
            }, 1000);
        });
    };

    
    const handleInputChange = (event) => {
        clearTimeout(debounceTimer);
        const query = event.target.value;

        if (query.trim()) {
            debounceTimer = setTimeout(() => {
                showLoader();
                simulateAPICall(query).then(results => {
                    hideLoader();
                    displayResults(results);
                }).catch(error => {
                    hideLoader();
                    displayError(error);
                });
            }, debounceDelay);
        } else {
            clearResults();
        }
    };

 
    const displayResults = (results) => {
        clearResults();
        results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result;
            resultsContainer.appendChild(li);
        });
    };

    
    const clearResults = () => {
        resultsContainer.innerHTML = '';
    };

    
    const displayError = (message) => {
        clearResults();
        const errorMsg = document.createElement('li');
        errorMsg.textContent = message;
        errorMsg.classList.add('error');
        resultsContainer.appendChild(errorMsg);
    };

   
    const showLoader = () => {
        loader.style.display = 'block';
    };

    
    const hideLoader = () => {
        loader.style.display = 'none';
    };

  
    searchInput.addEventListener('input', handleInputChange);
});
