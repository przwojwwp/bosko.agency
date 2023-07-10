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

// Blokowanie ekranu dla animacji reelsa w video

var isScrolling = false;
var accumulatedScroll = 0; // Zmienna przechowująca sumę przewinięć

window.addEventListener('wheel', function (event)
{
    event.preventDefault();

    if (!isScrolling && window.innerWidth >= 768)
    {
        var deltaY = event.deltaY;
        var scrollAmount = Math.abs(deltaY) > 1 ? Math.abs(deltaY) : 1; // Dostosowanie prędkości przewijania

        if (window.pageYOffset === 0)
        {
            isScrolling = true;

            // Przesuń stronę
            window.scrollBy({
                top: deltaY > 0 ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });

            // Zablokuj używanie scrolla na krótki okres czasu
            setTimeout(function ()
            {
                isScrolling = false;
            }, 1100);

            accumulatedScroll = 0; // Zresetuj wartość sumy przewinięć
        } else
        {
            if ((deltaY > 0 && accumulatedScroll < 0) || (deltaY < 0 && accumulatedScroll > 0))
            {
                // Jeśli scroll jest w przeciwnym kierunku, zresetuj accumulatedScroll do 0
                accumulatedScroll = 0;
            }

            // Dodaj wartość poprzedniego przewinięcia do nowego przewinięcia
            accumulatedScroll += deltaY > 0 ? 100 : -100;

            // Przewiń stronę o sumę przewinięć + 100 pikseli
            window.scrollBy({
                top: accumulatedScroll + (deltaY > 0 ? 100 : -100),
                behavior: 'smooth'
            });
        }
    }
}, { passive: false });

//Przesuniecie ekranu o 1px dla Animacji Reelsa w video

const section1 = document.querySelector('.section-1');
const smallerWidth = '60vw';
const smallerHeight = '62.5vh';
const largerWidth = '100vw';
const largerHeight = '95vh';

let isSectionSmaller = false;
let isContentLoaded = false;
let isScrollInProgress = false;
let isMouseScrollUsed = false;

function scrollToPosition(positionY)
{
    const startY = window.scrollY;
    const distance = positionY - startY;
    const duration = 1000; // Czas trwania animacji w milisekundach
    const startTime = performance.now();

    function scrollAnimation(currentTime)
    {
        const elapsedTime = currentTime - startTime;
        const scrollProgress = Math.min(elapsedTime / duration, 1);
        const scrollValue = startY + distance * scrollProgress;
        window.scrollTo(0, scrollValue);

        if (scrollProgress < 1)
        {
            requestAnimationFrame(scrollAnimation);
        } else
        {
            isScrollInProgress = false;
        }
    }

    requestAnimationFrame(scrollAnimation);
}

//Animacja Reels w video

function handleScroll(event)
{
    const scrollY = window.scrollY;

    if (window.matchMedia('(min-width: 768px)').matches)
    {
        // Wykonuj kod tylko dla ekranów o szerokości większej lub równej medium

        if (scrollY > 0)
        {
            if (!isSectionSmaller && isMouseScrollUsed)
            {
                section1.classList.remove('section-1-larger');
                section1.classList.add('section-1-smaller');
                section1.style.width = smallerWidth;
                section1.style.height = smallerHeight;
                isSectionSmaller = true;

                const titleInnerElement = section1.querySelector('.title-inner');
                if (titleInnerElement)
                {
                    titleInnerElement.style.display = 'none';
                }

                const section1OffsetTop = section1.offsetTop;
                const scrollPosition = section1OffsetTop + 5; // Ustal pozycję Y, do której ma być przewinięta strona (dodajemy 5 pikseli dla lepszego wyglądu)

                isScrollInProgress = true;
                scrollToPosition(scrollPosition);

                setTimeout(() =>
                {
                    section1.innerHTML = `
            <div class="video-container">
              <video src="video/BOSKO_REEL_v4.mp4" controls></video>
            </div>
          `;

                    isContentLoaded = true;
                }, 1000);
            }
        } else
        {
            if (isSectionSmaller)
            {
                section1.classList.remove('section-1-smaller');
                section1.classList.add('section-1-larger');
                section1.style.width = largerWidth;
                section1.style.height = largerHeight;
                isSectionSmaller = false;

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
            }
        }
    }
}

function handleMouseScroll()
{
    isMouseScrollUsed = true;
    window.removeEventListener('wheel', handleMouseScroll);
}

if (window.matchMedia('(min-width: 768px)').matches)
{
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleMouseScroll);
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

window.addEventListener('scroll', function ()
{
    var images = document.querySelectorAll('#natalia-image, #mateusz-image, #bartosz-image');
    var windowHeight = window.innerHeight;

    for (var i = 0; i < images.length; i++)
    {
        var image = images[i];
        var rect = image.getBoundingClientRect();

        if (rect.bottom >= 0 && rect.bottom <= windowHeight)
        {
            if (i % 2 === 0)
            {
                image.classList.add('expanded');
                image.style.animationName = 'slideInLeft';
            } else
            {
                image.classList.add('expanded');
                image.style.animationName = 'slideInRight';
            }
        } else
        {
            image.classList.remove('expanded');
            image.style.animationName = '';
        }
    }
});

// Button to Top

let mybutton = document.getElementById("scroll-to-top-btn");
var scrollThreshold = 0.95 * (document.documentElement.scrollHeight - window.innerHeight);

function updateScrollThreshold()
{
    scrollThreshold = 0.95 * (document.documentElement.scrollHeight - window.innerHeight);
}

window.addEventListener("scroll", function ()
{
    if (window.scrollY > scrollThreshold)
    {
        mybutton.style.display = "block";
    } else
    {
        mybutton.style.display = "none";
    }
});

window.addEventListener("resize", function ()
{
    updateScrollThreshold();
});

mybutton.addEventListener("click", function ()
{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
