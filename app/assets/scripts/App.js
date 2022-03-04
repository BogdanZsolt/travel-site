import '../styles/styles.css';
import 'lazysizes'
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/revealOnScroll';
import StickyHeader from './modules/StickyHeader';

new StickyHeader()
new RevealOnScroll(document.querySelectorAll('.feature-item'), 60)
new RevealOnScroll(document.querySelectorAll('.testimonial'), 75)
new MobileMenu()
let modal

document.querySelectorAll('.open-modal').forEach(el => {
 el.addEventListener('click', e => {
  e.preventDefault()
  if(typeof modal == 'undefined'){
   import(/* webpackChunkName: 'modal' */"./modules/Modal")
     .then((x) => {
       modal = new x.default();
       setTimeout(()=>modal.openTheModal(), 20)
     })
     .catch(() => console.log("There was a problem."));
  } else {
   modal.openTheModal()
  }
 })
})

if(module.hot) {
 module.hot.accept()
}

