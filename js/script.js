/*==========================================
PORTFOLIO JAVASCRIPT
Author: Indronil Dey
==========================================*/

// ==========================
// PRELOADER
// ==========================

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    preloader.style.opacity = "0";

    setTimeout(() => {

        preloader.style.display = "none";

    }, 500);

});

// ==========================
// SCROLL PROGRESS BAR
// ==========================

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / pageHeight) * 100;

    progressBar.style.width = progress + "%";

});

// ==========================
// STICKY HEADER
// ==========================

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.classList.add("active");

    } else {

        header.classList.remove("active");

    }

});

// ==========================
// MOBILE MENU
// ==========================

const menuBtn = document.getElementById("menu-btn");

const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

});

// Close menu after clicking link

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});

// ==========================
// SMOOTH SCROLL
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// ==========================
// COUNTER ANIMATION
// ==========================

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function runCounter(){

    counters.forEach(counter=>{

        const target = +counter.dataset.target;

        let count = 0;

        const speed = target / 120;

        function update(){

            count += speed;

            if(count < target){

                counter.innerText = Math.floor(count);

                requestAnimationFrame(update);

            }else{

                counter.innerText = target;

            }

        }

        update();

    });

}

window.addEventListener("scroll",()=>{

    const stats = document.querySelector(".stats");

    if(!stats) return;

    const top = stats.getBoundingClientRect().top;

    if(top < window.innerHeight - 100 && !counterStarted){

        counterStarted = true;

        runCounter();

    }

});

// ==========================
// ACTIVE NAV LINK
// ==========================

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top = section.offsetTop-120;

        const height = section.offsetHeight;

        if(window.scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});
/*==========================================
THEME TOGGLE
==========================================*/

const themeBtn = document.getElementById("theme-toggle");

let darkMode = true;

themeBtn.addEventListener("click", () => {

    if (darkMode) {

        document.documentElement.style.setProperty("--bg", "#f5f5f5");
        document.documentElement.style.setProperty("--card", "#ffffff");
        document.documentElement.style.setProperty("--text", "#555555");
        document.documentElement.style.setProperty("--white", "#111111");

        document.body.style.background = "#f5f5f5";
        document.body.style.color = "#111111";

        themeBtn.innerHTML = '<i class="ri-sun-line"></i>';

    } else {

        document.documentElement.style.setProperty("--bg", "#090909");
        document.documentElement.style.setProperty("--card", "#131313");
        document.documentElement.style.setProperty("--text", "#d8d8d8");
        document.documentElement.style.setProperty("--white", "#ffffff");

        document.body.style.background = "#090909";
        document.body.style.color = "#ffffff";

        themeBtn.innerHTML = '<i class="ri-moon-line"></i>';

    }

    darkMode = !darkMode;

});

/*==========================================
SCROLL REVEAL
==========================================*/

const revealItems = document.querySelectorAll(
".section,.stat-card,.project-card,.service-card,.skill-card,.testimonial-card,.timeline-item"
);

const revealObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";
revealObserver.unobserve(entry.target);

}

});

},

{

threshold:.15

}

);

revealItems.forEach(item=>{

item.style.opacity="0";
item.style.transform="translateY(50px)";
item.style.transition=".8s ease";

revealObserver.observe(item);

});

/*==========================================
BACK TO TOP BUTTON
==========================================*/

const topBtn=document.createElement("button");

topBtn.innerHTML='<i class="ri-arrow-up-line"></i>';

topBtn.id="topBtn";

document.body.appendChild(topBtn);

Object.assign(topBtn.style,{

position:"fixed",

right:"30px",

bottom:"30px",

width:"55px",

height:"55px",

borderRadius:"50%",

border:"none",

background:"#ffb400",

color:"#111",

fontSize:"24px",

cursor:"pointer",

display:"none",

zIndex:"999",

boxShadow:"0 15px 30px rgba(0,0,0,.3)",

transition:".3s"

});

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/*==========================================
TYPEWRITER EFFECT
==========================================*/

const subtitle=document.querySelector(".hero-left h2");

const words=[

"Full Stack Developer",

"React Developer",

"Node.js Developer",

"MERN Stack Developer",

"UI/UX Enthusiast"

];

let wordIndex=0;

let charIndex=0;

let deleting=false;

function typeWriter(){

const currentWord=words[wordIndex];

if(!deleting){

subtitle.textContent=currentWord.substring(0,charIndex++);

if(charIndex>currentWord.length){

deleting=true;

setTimeout(typeWriter,1500);

return;

}

}else{

subtitle.textContent=currentWord.substring(0,charIndex--);

if(charIndex===0){

deleting=false;

wordIndex=(wordIndex+1)%words.length;

}

}

setTimeout(typeWriter,deleting?50:120);

}

typeWriter();

/*==========================================
CONTACT FORM
==========================================*/

/*=========================
    EMAILJS CONTACT FORM
==========================*/

// Initialize EmailJS
emailjs.init({
    publicKey: "9xP8c-X--BmlpXqsT"
});

const contactForm = document.getElementById("contactForm");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

if(contactForm){

    contactForm.addEventListener("submit", function(e){

    e.preventDefault();

    console.log("Form submitted");

        const btn = contactForm.querySelector(".contact-btn");

        btn.disabled = true;
        btn.innerHTML = `
            <i class="ri-loader-4-line ri-spin"></i>
            Sending...
        `;
        console.log("Sending...");

        emailjs.sendForm(
            "service_7y633lh",
            "template_523n5jm",
            contactForm
        )

        .then(() => {

            toastMessage.innerText = "Message Sent Successfully!";
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            },3000);

            contactForm.reset();

        })

        .catch((error) => {

            console.error(error);

            toastMessage.innerText = "Failed to send message!";
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            },3000);

        })

        .finally(() => {

            btn.disabled = false;

            btn.innerHTML = `
                <span>Send Message</span>
                <i class="ri-send-plane-fill"></i>
            `;

        });

    });

}
/*==========================================
CURRENT YEAR
==========================================*/

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}

/*==========================================
CONSOLE MESSAGE
==========================================*/

console.log("%cWelcome to Indronil Dey Portfolio",
"color:#ffb400;font-size:22px;font-weight:bold;");

console.log("%cDesigned & Developed by Indronil Dey",
"color:#ffffff;font-size:14px;");

