import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/revealOnScroll';

new RevealOnScroll(document.querySelectorAll('.feature-item'), 60)
new RevealOnScroll(document.querySelectorAll('.testimonial'), 75)

let mobileMenu = new MobileMenu()

if(module.hot) {
 module.hot.accept()
}

