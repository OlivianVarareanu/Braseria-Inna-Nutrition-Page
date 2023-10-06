

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

async function cautaPreparat() {
    var inputText = document.getElementById("search-input").value.toLowerCase();
    if(inputText === "")
    {
    alert('Introduceți felul de mâncare în căsuța de căutare')
    return;
    }
    // Verificați fiecare preparat pentru a găsi o potrivire
    var preparate = document.querySelectorAll("td");
    for (var i = 0; i < preparate.length; i++) {
        var preparat = preparate[i];
        if ( preparat.id === "dont-include") 
        preparat=preparate[i+1];
        var textPreparat = preparat.textContent.toLowerCase();
        if (textPreparat.includes(inputText)) {
            // Așteptați să se finalizeze scrolling-ul înainte de a continua
            await waitForScrollToFinish(preparat);

            // Adăugați clasa de evidențiere
            preparat.classList.add("highlighted");

            // Utilizați setTimeout pentru a elimina clasa de evidențiere și a reveni la culoarea inițială după 2 secunde
            setTimeout(function() {
                preparat.classList.remove("highlighted");
            }, 800);

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
