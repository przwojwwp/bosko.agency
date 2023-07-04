function logoSwitch()
{
    $('.section-2-logo').each(function ()
    {
        $(this).css('top', $('.section-1-logo').offset().top - $(this).closest('.row').offset().top);
    });
}

function logo2Switch()
{
    $('.section-3-logo').each(function ()
    {
        $(this).css('top', $('.section-2-logo').offset().top - $(this).closest('.row').offset().top);
        $(this).css('color', $('.section-1-logo').css('color'));
    });
}

function logo3Switch()
{
    $('.section-4-logo').each(function ()
    {
        $(this).css('top', $('.section-3-logo').offset().top - $(this).closest('.row').offset().top);
        $(this).css('color', $('.section-2-logo').css('color'));
    });
}

function logo4Switch()
{
    $('.section-5-logo').each(function ()
    {
        $(this).css('top', $('.section-4-logo').offset().top - $(this).closest('.row').offset().top);
        $(this).css('color', $('.section-1-logo').css('color'));
    });
}

$(document).scroll(function ()
{
    logoSwitch();
    logo2Switch();
    logo3Switch();
});

logoSwitch();
logo2Switch();
logo3Switch();
logo4Switch();