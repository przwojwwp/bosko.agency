// LOGO LOGO LOGO LOGO LOGO

function logoSwitch(sectionLogoClass, prevSectionLogoClass, colorClass)
{
    $(sectionLogoClass).each(function ()
    {
        var prevSectionLogo = $(prevSectionLogoClass);
        var row = $(this).closest('.row');

        // Sprawdzenie, czy poprzednie logo i wiersz są widoczne
        if (prevSectionLogo.is(':visible') && row.is(':visible'))
        {
            var prevSectionLogoTop = prevSectionLogo.offset().top;
            var rowOffsetTop = row.offset().top;
            $(this).css('top', prevSectionLogoTop - rowOffsetTop);

            // Zmiana koloru
            var color = $(colorClass).css('color');
            $(this).css('color', color);
        }
    });
}

$(document).scroll(function ()
{
    logoSwitch('.section-2-logo', '.section-1-logo', '.section-1-logo');
    logoSwitch('.section-3-logo', '.section-2-logo', '.section-1-logo');
    logoSwitch('.section-4-logo', '.section-3-logo', '.section-2-logo');
    logoSwitch('.section-5-logo', '.section-4-logo', '.section-1-logo');
});

logoSwitch('.section-2-logo', '.section-1-logo', '.section-1-logo');
logoSwitch('.section-3-logo', '.section-2-logo', '.section-1-logo');
logoSwitch('.section-4-logo', '.section-3-logo', '.section-2-logo');
logoSwitch('.section-5-logo', '.section-4-logo', '.section-1-logo');

// Superpowers & Starring Image Animation

window.addEventListener('scroll', function ()
{
    var images = document.querySelectorAll('.brand-experience, .brand-partnership, .branded-content, .creative-medium, #natalia-image, #mateusz-image, #bartosz-image');
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