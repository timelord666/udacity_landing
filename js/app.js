/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

document.addEventListener('DOMContentLoaded', () => {



















/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


const section = document.querySelectorAll('section[data-nav]');
const nav = document.querySelector('#navbar__list'),
        fragment = document.createDocumentFragment();

        section.forEach(e => {
            const li = document.createElement('li'),
            a = document.createElement('a');


            a.href = '#' + e.id;
            a.classList.add('menu__link');
            a.textContent = e.getAttribute('data-nav');

            li.appendChild(a);
            fragment.appendChild(li);


        });
        

        nav.appendChild(fragment);





});