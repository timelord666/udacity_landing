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
 * Start  Functions
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


// check element clsoe enough to window's top    

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

    function showNav() {
        nav.classList.remove('hidden');
        clearInterval(timeOut);
    }

    function hideNav() {
        timeOut = setTimeout(() => {
            nav.classList.add('hidden');
        }, 3000);
    }

    function setUpBtn() {
        if (currentSection === sections[sections.length - 1]) {
            up.classList.remove('hidden');
        } else {
            up.classList.add('hidden');
        }
    }

    function setActiveState(pos) {
        if (currentSection != sections[pos]) {
            currentSection.classList.remove('current');
            currentSection = sections[pos];
            currentSection.classList.add('current');
            currentLink.classList.remove('current__link')
            currentLink = document.querySelector(`a[href = '#${currentSection.id}']`);
            currentLink.classList.add('current__link');

        }
    }

   
    
    function scrollHandler() {
        // nav bar hadling
        showNav();


        //binary search for sections wthin the view
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

        
        
        //Setting active state to section and link
        setActiveState(end);
        

        // nav bar hadling
        hideNav();


        // up btn handling
        setUpBtn();
    }



/**
 * End  Functions

 * 
*/


// Building the Nav, update nav link

    updateNav();
    currentLink = document.querySelector(`a[href = '#${currentSection.id}']`);
    
        
  /* Events start */

// set events for scrolling

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


// set active states
    scrollHandler();

    window.addEventListener('scroll', scrollHandler);

// managing collapse    

    main.addEventListener('click', e => {
        if (e.target.nodeName === 'I') {
            e.target.classList.toggle('up');
            e.target.classList.toggle('down');
            e.target.offsetParent.classList.toggle('collapse');
            
            e.target.nextElementSibling.classList.toggle('hidden');
        }
        
    });

        
/* Events end */

});
