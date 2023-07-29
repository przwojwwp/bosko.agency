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

// Function to adjust the font size based on the current width and height
function adjustFontSize(width, height)
{
    const textContent = document.querySelector(".section-1-text-content");
    const maxWidth = 96; // Maximum width at which the font size remains 7vw
    const maxHeight = 96; // Maximum height at which the font size remains 7vw
    const maxFontSize = 7; // The maximum font size in vw

    // Calculate the font size for width and height separately
    const widthFontSize = (width / maxWidth) * maxFontSize;
    const heightFontSize = (height / maxHeight) * maxFontSize;

    // Use the smaller font size to maintain the aspect ratio of the text
    const fontSize = Math.min(widthFontSize, heightFontSize);

    // Apply the font size to the text content
    textContent.style.fontSize = fontSize + "vw";
}

// Function to adjust the position of the text content
function adjustTextPosition()
{
    const textContent = document.querySelector(".section-1-text-content");
    const section1 = document.querySelector(".section-1");
    const initialTop = 48; // Initial top position in percentage (50%)
    const finalTop = 30; // Final top position in percentage (32%)

    // Calculate the interpolation factor based on the width and height
    const interpolationFactor = (initialWidth - width) / (initialWidth - 64);
    const topPosition = initialTop - interpolationFactor * (initialTop - finalTop);

    // Apply the new top position using CSS top property
    textContent.style.top = topPosition + "%";
}

// Function to adjust the font size and update the width and height
function updateSize()
{
    section1.style.width = width + "vw";
    section1.style.height = height + "vh";
    adjustFontSize(width, height);
    adjustTextPosition();
}

// Global variable to track content section change
let isContentSectionChanged = false;

//Reels animation

const containerFluid = document.querySelector(".container-fluid");
const section1 = document.querySelector(".section-1");
const initialWidth = 100;
const initialHeight = 96;
let width = initialWidth;
let height = initialHeight;
let pageHolder = true;
let timeoutId;
let sectionResize = true;
let isSectionChanged = false;

// Function to toggle the "overflow: hidden" class on the body based on pageHolder value
function toggleBodyOverflow()
{
    document.body.style.overflow = pageHolder ? "hidden" : "auto";
}

// Function to set pageHolder and toggle body overflow
function setPageHolder(value, delay)
{
    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any

    timeoutId = setTimeout(function ()
    {
        pageHolder = value;
        toggleBodyOverflow(); // Toggle body overflow based on the new pageHolder value
    }, delay);
}

// Function to adjust the font size and update the width and height
function updateSize()
{
    section1.style.width = width + "vw";
    section1.style.height = height + "vh";
    adjustFontSize(width, height);
    adjustTextPosition();
}

// Obsługa zdarzenia scroll na przycisku myszy
containerFluid.addEventListener("wheel", function (event)
{
    if (event.deltaY < 0)
    {
        // Scroll w górę
        if (scrollY === 0 && width < initialWidth && height < initialHeight)
        {
            width += 1;
            height += 1;
        }
    } else
    {
        // Scroll w dół
        if (width > 64 && height > 60)
        {
            width -= 1;
            height -= 1;
        }
    }

    // Check if the text content should change
    if (width <= 64 && height <= 60 && !isSectionChanged)
    {
        section1.innerHTML = `
        <div class="video-container">
          <video src="video/BOSKO_REEL_v4.mp4" controls poster="img/poster.png"></video>
        </div>
      `;
        isSectionChanged = true;
        setPageHolder(false, 300); // Set pageHolder to false after a 1-second delay
    }

    if (width >= 96 && height >= 96 && sectionResize && isSectionChanged)
    {
        section1.innerHTML = `
        <div class="section-1-video-wrapper">
          <div class="section-1-curtain"></div>
          <video src="video/BOSKO_REEL_v4.mp4" autoplay muted loop></video>
        </div>
        <div class="section-1-text-content">
          <div class="title">
            <div class="title-inner">
              <div class="bosko">
                <div class="bosko-inner">
                  <span class="word" style="--delay: 0">We </span>
                  <span class="word" style="--delay: 1">connect</span>
                  <br />
                  <span class="word" style="--delay: 2">brands </span>
                  <span class="word" style="--delay: 3">+ </span>
                  <span class="word" style="--delay: 4">culture</span>
                  <br />
                  <span class="word" style="--delay: 5">to </span>
                  <span class="word" style="--delay: 6">create </span>
                  <span class="word" style="--delay: 7">campaigns</span>
                  <br />
                  <span class="word" style="--delay: 8">people </span>
                  <span class="word" style="--delay: 9">love</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
        setPageHolder(true, 1); // Set pageHolder to true after a 0.001-second delay
        isSectionChanged = false;
    }

    // Update the size and font size
    updateSize();
});

// Call the updateSize function initially to set the initial size and position
updateSize();

// Superpowers Image Animation for Small Screens

if (window.matchMedia('(max-width: 767.99px)').matches)
{
    window.addEventListener('scroll', function ()
    {
        var images = document.querySelectorAll('.brand-experience, .brand-partnership, .branded-content, .creative-medium');
        var windowHeight = window.innerHeight;

        for (var i = 0; i < images.length; i++)
        {
            var image = images[i];
            var rect = image.getBoundingClientRect();

            if (rect.bottom <= windowHeight / 2 && rect.bottom >= windowHeight * 0.15)
            {
                image.classList.add('expanded');
                image.style.transform = 'scale(1.1)';
            } else
            {
                image.classList.remove('expanded');
                image.style.transform = 'scale(1)';
            }
        }
    });
}

// Superpowers Image Animation for Small Screens

if (window.matchMedia('(max-width: 767.99px)').matches)
{
    window.addEventListener('scroll', function ()
    {
        var images = document.querySelectorAll('.brand-experience, .brand-partnership, .branded-content, .creative-medium');
        var windowHeight = window.innerHeight;

        for (var i = 0; i < images.length; i++)
        {
            var image = images[i];
            var rect = image.getBoundingClientRect();

            if (rect.bottom <= windowHeight / 2 && rect.bottom >= windowHeight * 0.15)
            {
                image.classList.add('expanded');
                image.style.transform = 'scale(1.1)';
            } else
            {
                image.classList.remove('expanded');
                image.style.transform = 'scale(1)';
            }
        }
    });
}

// Superpowers Image Animation for Medium and Larger Screens

var mediumImages = document.querySelectorAll('.brand-experience, .brand-partnership, .branded-content, .creative-medium');

for (var i = 0; i < mediumImages.length; i++)
{
    var image = mediumImages[i];

    image.addEventListener('mouseenter', function ()
    {
        this.classList.add('expanded');
        this.style.transform = 'scale(1.1)';
    });

    image.addEventListener('mouseleave', function ()
    {
        this.classList.remove('expanded');
        this.style.transform = 'scale(1)';
    });
}

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
