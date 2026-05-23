const navs = document.querySelectorAll('.nav-list li');
const cube = document.querySelector('.box');
const sections = document.querySelectorAll('.section');

const resumeLists = document.querySelectorAll('.resume-list');
const resumeBoxs = document.querySelectorAll('.resume-box');

const portfolioLists = document.querySelectorAll('.portfolio-list');
const portfolioBoxs = document.querySelectorAll('.portfolio-box');

// navbar actions and all section actions along with cube rotation when navbar is clicked
navs.forEach((nav, idx) => {
    nav.addEventListener('click', () => {
        document.querySelector('.nav-list li.active').classList.remove('active');
        nav.classList.add('active');

        cube.style.transform = `rotateY(${idx * -90}deg)`;

        document.querySelector('.section.active').classList.remove('active');
        sections[idx].classList.add('active');

    // update scroll state for the newly active section (so its active tab can scroll)
    setScrollForSection(sections[idx]);

        const array = Array.from(sections);
        const arrSecs = array.slice(1, -1);
        arrSecs.forEach(arrSec => {
            if (arrSec.classList.contains('active')) {
                sections[4].classList.add('action-contact')
            }
        })
        if (sections[0].classList.contains('active')) {
            sections[4].classList.remove('action-contact')
        }
    });
 })
 

// resume section when clicking tab-list
resumeLists.forEach((list, idx) => {
    list.addEventListener('click', () => {
        document.querySelector('.resume-list.active').classList.remove('active');
        list.classList.add('active');

        document.querySelector('.resume-box.active').classList.remove('active');
        resumeBoxs[idx].classList.add('active');
        // after switching resume tabs, update scroll state so only the active grid scrolls
        setScrollForSection(document.querySelector('.section.resume'));
    });
 })

// portfolio section when clicking tab-list
portfolioLists.forEach((list, idx) => {
    list.addEventListener('click', () => {
        document.querySelector('.portfolio-list.active').classList.remove('active');
        list.classList.add('active');

        document.querySelector('.portfolio-box.active').classList.remove('active');
        portfolioBoxs[idx].classList.add('active');
        // update scroll state so only the active portfolio grid scrolls
        setScrollForSection(document.querySelector('.section.portfolio'));
    });
 })

// function to set scroll behavior for the active section's active tab/grid
function setScrollForSection(sectionEl){
    if(!sectionEl) return;
    // remove scroll classes from all wrappers and grids first
    document.querySelectorAll('.tab-wrapper.scrollable-wrapper').forEach(w=> w.classList.remove('scrollable-wrapper'));
    document.querySelectorAll('.tab-grid.active-scroll').forEach(g=> g.classList.remove('active-scroll'));

    const wrapper = sectionEl.querySelector('.tab-wrapper');
    if(!wrapper) return;
    const activeGrid = wrapper.querySelector('.tab-grid.active');
    if(!activeGrid) return;

    // enable scrolling on this wrapper and let the active grid be in normal flow
    wrapper.classList.add('scrollable-wrapper');
    activeGrid.classList.add('active-scroll');
}

// run on initial load to set correct scroll state for the visible section/tab
document.addEventListener('DOMContentLoaded', ()=>{
    const activeSection = document.querySelector('.section.active') || document.querySelector('.section');
    setScrollForSection(activeSection);
});

//  visibility for contact section when reLoading ( cube reLoading animations)
setTimeout(() => {
    sections[4].classList.remove('active');
},1500);



