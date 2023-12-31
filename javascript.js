// created by Wojciech Przyłuski
// https://github.com/przwojwwp/

// Detect request animation frame
var scroll =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    // IE Fallback, you can even fallback to onscroll
    function (callback)
    {
        window.setTimeout(callback, 1000 / 60);
    };
var lastPosition = -1;

// my Variables
var lastSection = false;
var replaceItemTop = -1;
var replaceItemBottom = -1;
var replaceItemHeight = -1;

// The Scroll Function
function loop()
{
    var top = window.pageYOffset;
    // my variables

    // my sections to calculate stuff
    var sections = document.querySelectorAll(".section");
    var replaceContainer = document.querySelectorAll(".js-replace");
    var replaceItem = document.querySelectorAll(".js-replace__item");

    if (replaceItem.length > 0)
    {
        // get top position of item from container, because image might not have loaded
        replaceItemTop = parseInt(
            replaceContainer[0].getBoundingClientRect().top
        );
        replaceItemHeight = replaceItem[0].offsetHeight;
        replaceItemBottom = replaceItemTop + replaceItemHeight;
    }

    var sectionTop = -1;
    var sectionBottom = -1;
    var currentSection = -1;

    // Fire when needed
    if (lastPosition == window.pageYOffset)
    {
        scroll(loop);
        return false;
    } else
    {
        lastPosition = window.pageYOffset;

        // Your Function
        Array.prototype.forEach.call(sections, function (el, i)
        {
            sectionTop = parseInt(el.getBoundingClientRect().top);
            sectionBottom = parseInt(el.getBoundingClientRect().bottom);

            // active section
            if (
                sectionTop <= replaceItemBottom &&
                sectionBottom > replaceItemTop
            )
            {
                // check if current section has bg
                currentSection = el.classList.contains("section--bg");

                // switch class depending on background image
                if (currentSection)
                {
                    replaceContainer[0].classList.remove("js-replace--reverse");
                } else
                {
                    replaceContainer[0].classList.add("js-replace--reverse");
                }
            }
            // end active section

            // if active Section hits replace area
            if (replaceItemTop < sectionTop && sectionTop <= replaceItemBottom)
            {
                // animate only, if section background changed
                if (currentSection != lastSection)
                {
                    document.documentElement.style.setProperty(
                        "--replace-offset",
                        (100 / replaceItemHeight) *
                        parseInt(sectionTop - replaceItemTop) +
                        "%"
                    );
                }
            }
            // end active section in replace area

            // if section above replace area
            if (replaceItemTop >= sectionTop)
            {
                // set offset to 0 if you scroll too fast
                document.documentElement.style.setProperty(
                    "--replace-offset",
                    0 + "%"
                );
                // set last section to current section
                lastSection = currentSection;
            }
        });
    }

    // Recall the loop
    scroll(loop);
}

// Call the loop for the first time
loop();

window.onresize = function (event)
{
    loop();
};

// Pobieranie wszystkich obrazów z klasami 'img-fluid' wewnątrz section-3-img-container
const imagesSection3 = document.querySelectorAll('.section-3-img-container .img-fluid');

// Ustawienie początkowego stanu obrazów na niewidoczne
imagesSection3.forEach(image =>
{
    image.style.opacity = '0';
});

// Funkcja do obsługi efektu pojawiania się obrazów w sekcji 3
function fadeInImagesSection3()
{
    // Sprawdzanie, czy obraz jest w widoku przeglądarki
    imagesSection3.forEach((image, index) =>
    {
        const rect = image.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Jeśli obraz jest w widoku przeglądarki
        if (rect.top <= windowHeight)
        {
            // Opóźnienie pojawiania się obrazu o 0.5 sekundy * indeks obrazu
            const delay = 500 * index;

            // Ustawienie animacji na obrazie po opóźnieniu
            setTimeout(() =>
            {
                image.style.animation = 'fadeIn 1s forwards ease';
            }, delay);
        }
    });
}

// Obsługa pojawiania się obrazów przy załadowaniu strony
window.addEventListener('load', fadeInImagesSection3);

// Obsługa pojawiania się obrazów przy przewijaniu strony
window.addEventListener('scroll', fadeInImagesSection3);


// Starring Image Animation
// Pobieranie wszystkich obrazów z klasą 'img-fluid' wewnątrz sekcji-4-img-container
const images = document.querySelectorAll('.section-4-img-container .img-fluid');

// Ustawienie początkowego stanu obrazów na niewidoczne
images.forEach(image =>
{
    image.style.opacity = '0';
});

// Funkcja do obsługi efektu pojawiania się obrazów
function fadeInImages()
{
    // Sprawdzanie, czy obraz jest w widoku przeglądarki
    images.forEach((image, index) =>
    {
        const rect = image.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Jeśli obraz jest w widoku przeglądarki
        if (rect.top <= windowHeight)
        {
            // Opóźnienie pojawiania się obrazu o 0.5 sekundy * indeks obrazu
            const delay = 500 * index;

            // Ustawienie animacji na obrazie po opóźnieniu
            setTimeout(() =>
            {
                image.style.animation = 'fadeIn 1s forwards ease';
            }, delay);
        }
    });
}

// Obsługa pojawiania się obrazów przy załadowaniu strony
window.addEventListener('load', fadeInImages);

// Obsługa pojawiania się obrazów przy przewijaniu strony
window.addEventListener('scroll', fadeInImages);


// Button to Top

function topFunction()
{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
