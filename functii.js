

function waitForScrollToFinish(element) {
    return new Promise(function(resolve) {
        element.scrollIntoView({ behavior: "smooth" });

        // Add a scroll event listener to detect when scrolling is complete
        window.addEventListener("scroll", function scrollHandler() {
            // Check if the scrolling has reached the desired element
            if (isElementInView(element)) {
                // Remove the event listener
                window.removeEventListener("scroll", scrollHandler);

                // Resolve the promise to indicate that scrolling is complete
                resolve();
            }
        });
    });
}

function isElementInView(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function removeDiacritics(text) {
    // Define a mapping of diacritic characters to their non-diacritic equivalents
    var diacriticMap = {
        'ă': 'a',
        'â': 'a',
        'ș': 's',
        'ț': 't',
        'î': 'i',
        'Ă': 'A',
        'Â': 'A',
        'Ș': 'S',
        'Ț': 'T',
        'Î': 'I'
        // Add more mappings as needed
    };

    // Use the `replace` method with a regular expression to perform replacements
    return text.replace(/[ăâșțîĂÂȘȚÎ]/g, function(match) {
        return diacriticMap[match] || match;
    });
}



async function cautaPreparat() {
   
    var inputText = document.getElementById("search-input").value.toLowerCase();
    if (inputText === "") {
        alert('Introduceți felul de mâncare în căsuța de căutare');
        return;
    }
    
    // Verificați fiecare preparat pentru a găsi o potrivire
    
    var preparate = document.querySelectorAll("h2");
    
    

    for (var i = 0; i < preparate.length; i++) {
        var preparat = preparate[i];
        var textPreparat = preparat.textContent.toLowerCase();

       

        if (removeDiacritics(textPreparat).includes(inputText) || textPreparat.includes(inputText)) {
            // Așteptați să se finalizeze scrolling-ul înainte de a continua
            await waitForScrollToFinish(preparat);

            // Adăugați clasa de evidențiere
            preparat.classList.add("highlighted");

            // Utilizați setTimeout pentru a elimina clasa de evidențiere și a reveni la culoarea inițială după 2 secunde
            setTimeout(function () {
                preparat.classList.remove("highlighted");
            }, 1200);

            // Opriți căutarea după ce ați găsit o potrivire
            break;
        }
    }
}


window.addEventListener('scroll', function() {
    var scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Function to scroll to the top of the page smoothly when the button is clicked
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


// Functie pentru afisarea unui drop down menu

// Elementele HTML
const inputElement = document.getElementById('search-input');
const suggestionsElement = document.getElementById('suggestions');
const h2Elements = document.querySelectorAll('h2'); // Selectează toate elementele <h2>

// Funcție pentru afișarea sugestiilor în timp real
function afiseazaSugestii() {
    const textCautat = inputElement.value.toLowerCase();
    
    // Golește sugestiile anterioare
    suggestionsElement.innerHTML = '';
    
    // Verifică dacă lungimea textului introdus este mai mare sau egală cu 3 caractere
    if (textCautat.length >= 3) {
        h2Elements.forEach(h2 => {
            const textH2 = h2.textContent.toLowerCase();
            if (textH2.includes(textCautat)) {
                const sugestieElement = document.createElement('div');
                sugestieElement.textContent = h2.textContent;
               
                sugestieElement.classList.add('suggestions'); // Adaugă clasa "suggestions"
                
                // Îngroașă textul care se potrivește cu căutarea
                sugestieElement.innerHTML = sugestieElement.innerHTML.replace(
                    new RegExp(textCautat, 'gi'), 
                    match => `<strong>${match}</strong>`
                );

                // Adaugă eveniment de click la sugestie
                sugestieElement.addEventListener('click', function() {
                    inputElement.value = h2.textContent; // Autocompletează input-ul cu textul sugestiei
                    suggestionsElement.innerHTML = ''; // Golește sugestiile după selectare
                });
                
                suggestionsElement.appendChild(sugestieElement);
            }
        });
    }
}



// Ascultă evenimentul de tastare în input
inputElement.addEventListener('input', afiseazaSugestii);

