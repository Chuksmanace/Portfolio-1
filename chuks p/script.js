document.addEventListener('DOMContentLoaded', function() {

    // Sticky Navbar (already handled by CSS position: sticky, but you can add a class for more effects if needed)
    // const navbar = document.querySelector('.navbar');
    // window.onscroll = () => {
    //     if (window.scrollY > 50) {
    //         navbar.classList.add('scrolled');
    //     } else {
    //         navbar.classList.remove('scrolled');
    //     }
    // };

    // Mobile Menu Toggle
    const menuButton = document.querySelector('.menubutton');
    const navLinks = document.querySelector('.navlinks');

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const isOpen = navLinks.classList.contains('open');
            menuButton.setAttribute('aria-expanded', isOpen);
            if (isOpen) {
                menuButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>`; // Close icon
            } else {
                menuButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>`; // Hamburger icon
            }
        });
    }

    // Update current year in footer
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Active Nav Link highlighting (can be enhanced if not using separate pages, but good for MPA)
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.navlinks ul li a');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            // Remove active class from all
            menuItem.forEach(item => item.classList.remove('active'));
            // Add active class to current page link
            menuItem[i].classList.add('active');
        }
    }
    // Ensure home is active if no specific path (e.g. on domain root)
    if (currentLocation.endsWith('/') || !currentLocation.split('/').pop().includes('.')) {
        const homeLink = document.querySelector('.navlinks ul li a[href="index.html"]');
        if (homeLink) {
            menuItem.forEach(item => item.classList.remove('active'));
            homeLink.classList.add('active');
        }
    }


    // Contact Form Handling (Basic example - for actual sending, you need a backend or a service like Formspree/Netlify Forms)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formstatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Basic validation (can be more extensive)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill in all fields.';
                formStatus.style.color = 'red';
                return;
            }

            // Simulate form submission
            formStatus.textContent = 'Sending message...';
            formStatus.style.color = 'var(--primarycolor)';

            // Replace with your actual form submission logic (e.g., using fetch to a backend API)
            setTimeout(() => {
                // Example: if using Formspree, it would be an AJAX request here
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.style.color = 'green';
                contactForm.reset(); // Clear the form
            }, 2000);

            // Example for Formspree (uncomment and replace YOUR_FORM_ID)
            /*
            const formData = new FormData(contactForm);
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
                    formStatus.style.color = 'green';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.textContent = "Oops! There was a problem sending your message.";
                        }
                        formStatus.style.color = 'red';
                    })
                }
            }).catch(error => {
                formStatus.textContent = "Oops! There was a problem sending your message.";
                formStatus.style.color = 'red';
            });
            */
        });
    }

});
//idk animation
const scrollers = document.querySelectorAll(".scroller");


if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}