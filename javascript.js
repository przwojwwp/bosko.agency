function logoSwitch(sectionLogoClass, prevSectionLogoClass, colorClass)
{
    $(sectionLogoClass).each(function ()
    {
        $(this).css('top', $(prevSectionLogoClass).offset().top - $(this).closest('.row').offset().top);
        $(this).css('color', $(colorClass).css('color'));
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