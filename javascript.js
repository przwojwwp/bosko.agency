//Animacja Reelsa w video

const section1 = document.querySelector('.section-1');
const smallerWidth = '60vw';
const smallerHeight = '62.5vh';
const largerWidth = '100vw';
const largerHeight = '95vh';

let isSectionSmaller = false;
let isContentLoaded = false;
let isScrollInProgress = false;

function scrollToPosition(positionY)
{
  const startY = window.scrollY;
  const distance = positionY - startY;
  const duration = 500; // Czas trwania animacji w milisekundach
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

function handleScroll(event)
{
  const scrollY = window.scrollY;

  if (isScrollInProgress)
  {
    event.preventDefault();
    return;
  }

  if (!isContentLoaded)
  {
    // Blokowanie przemieszczania się strony w dół, jeśli zawartość nie jest jeszcze załadowana
    if (scrollY > window.innerHeight)
    {
      window.scrollTo(0, window.innerHeight);
    }
  }

  if (window.matchMedia('(min-width: 768px)').matches)
  {
    // Wykonuj kod tylko dla ekranów o szerokości większej lub równej medium

    if (scrollY > 0)
    {
      if (!isSectionSmaller)
      {
        section1.classList.remove('section-1-larger');
        section1.classList.add('section-1-smaller');
        section1.style.width = smallerWidth;
        section1.style.height = smallerHeight;
        isSectionSmaller = true;

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
          <div class="section-1">
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
          </div>
        `;
      }
    }
  }
}

window.addEventListener('scroll', handleScroll);


// Superpowers Image Animation for Small Screens

window.addEventListener('scroll', function ()
{
  var mediaQuerySmall = window.matchMedia('(max-width: 767.99px)');

  if (mediaQuerySmall.matches)
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
  }
});

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