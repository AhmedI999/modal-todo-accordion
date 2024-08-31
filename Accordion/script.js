'use-strict';

const accordion = document.querySelector('.accordion');


accordion.addEventListener('click', function (event) {
    const accordionContainer = event.target.closest('.accordion__accordion-container');
    if (!accordionContainer) return;
    const accordionItem = accordionContainer.querySelector('.accordion__accordion-item');
    const accordionIcon = accordionItem.querySelector('.accordion-icon');
    const accordionContent = accordionContainer.querySelector('.accordion__accordion-content');

    accordionIcon.classList.toggle('accordion-icon-active')
    accordionItem.classList.toggle('item-visible');
    accordionContent.classList.toggle('content-visible');

});