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


    let sections = document.querySelectorAll('section[data-nav]');

    let currentSection = sections[0];
    let currentLink = null;
    let timeOut;
    
    
    

    const nav = document.querySelector('#navbar__list'),
            fragment = document.createDocumentFragment(),
            up = document.querySelector('.up__btn'),
            main = document.querySelector('main');
            
            



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
    function updateNav() {
        sections = document.querySelectorAll('section[data-nav]');
        nav.innerHTML = '';
        sections.forEach(e => {
            const li = document.createElement('li'),
                a = document.createElement('a');


            a.href = '#' + e.id;
            a.classList.add('menu__link');
            a.textContent = e.getAttribute('data-nav');

            li.appendChild(a);
            fragment.appendChild(li);


        });

        nav.appendChild(fragment);

    }


    function checkView(e) {

        const scroll = window.scrollY || window.pageYOffset,
                boundsTop = e.getBoundingClientRect().top + scroll;


        const viewport = {
            top: scroll,
            bottom: scroll + window.innerHeight,
        }

        const bounds = {
            top: boundsTop,
            bottom: boundsTop + e.clientHeight,
        }


        return (bounds.top + 300) < viewport.top;

    }

    
    
    function scrollHandler() {
        nav.classList.remove('hidden');
        clearInterval(timeOut);
        let start = 0,
            end = sections.length;
            
            
        
        
        
        
        while (start != end) {
            let mid = start + Math.floor((end - start) / 2);
            
            
            if (checkView(sections[mid])) {
                start = mid + 1;

            } else {
                end = mid;
            }
        }

        
        
        
        
        if (currentSection != sections[end]) {
            currentSection.classList.remove('current');
            currentSection = sections[end];
            currentSection.classList.add('current');
            currentLink.classList.remove('current__link')
            currentLink = document.querySelector(`a[href = '#${currentSection.id}']`);
            currentLink.classList.add('current__link');
            
        }


        timeOut = setTimeout(() => {
            nav.classList.add('hidden');
        }, 3000);


        if (currentSection === sections[sections.length - 1]) {
            up.classList.remove('hidden');
        } else {
            up.classList.add('hidden');
        }
            

    }



/**
 * End Helper Functions

 * 
*/










// Build menu 

    updateNav();
    currentLink = document.querySelector(`a[href = '#${currentSection.id}']`);
    
        
  

// Scroll to section on link click

    nav.addEventListener('click', e => {

        e.preventDefault();


        document.querySelector(e.target.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });




    });

    up.addEventListener('click', e => {
        e.preventDefault();

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    });

// Set sections as active

    scrollHandler();

    window.addEventListener('scroll', scrollHandler);



    main.addEventListener('click', e => {
        if (e.target.nodeName === 'I') {
            e.target.classList.toggle('up');
            e.target.classList.toggle('down');
            
            e.target.nextElementSibling.classList.toggle('hidden');
        }
        
    });
  

        
        

        






});
