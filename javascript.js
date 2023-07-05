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