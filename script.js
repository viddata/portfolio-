document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // --- Search Tabs Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');
            
            // In a real app, this would change the form fields based on data-target
            // const target = btn.getAttribute('data-target');
        });
    });

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
                
                // If it's a counter, trigger it
                if(reveal.classList.contains('stat-item') && !reveal.classList.contains('counted')) {
                    const counter = reveal.querySelector('.counter');
                    if(counter) animateCounter(counter);
                    reveal.classList.add('counted');
                }
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // --- Counter Animation ---
    function animateCounter(counterElement) {
        const target = +counterElement.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counterElement.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.innerText = target;
            }
        };
        updateCounter();
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Modal Logic ---
    const modal = document.getElementById('inquiry-modal');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.querySelector('.close-modal');

    if (modal) {
        // Open modal
        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('show');
            });
        });

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        // Close when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    // --- Inquiry Form Submission ---
    const inquiryForm = document.getElementById('property-inquiry-form');
    if(inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('inquiry-name').value;
            const phone = document.getElementById('inquiry-phone').value;
            const email = document.getElementById('inquiry-email').value;
            const type = document.getElementById('inquiry-type').value;
            const requirements = document.getElementById('inquiry-requirements').value;
            
            // Format WhatsApp Message
            const whatsappNumber = "917737748056";
            const message = `*New Property Inquiry*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Property Type:* ${type}\n*Requirements:* ${requirements}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            inquiryForm.reset();
            
            // Close modal
            if(modal) {
                modal.classList.remove('show');
            }
        });
    }

    // --- Property Listing Form Submission ---
    const listingForm = document.getElementById('submit-listing-form');
    if(listingForm) {
        listingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const userType = document.getElementById('list-user-type').value;
            const actionType = document.getElementById('list-action-type').value;
            const propType = document.getElementById('list-prop-type').value;
            const price = document.getElementById('list-price').value;
            const location = document.getElementById('list-location').value;
            const description = document.getElementById('list-description').value;
            const name = document.getElementById('list-name').value;
            const phone = document.getElementById('list-phone').value;
            const email = document.getElementById('list-email').value;
            
            // Format WhatsApp Message
            const whatsappNumber = "917737748056";
            const message = `*New Property Listing Request*\n\n` +
                            `*Listing Party:* ${userType}\n` +
                            `*Purpose:* For ${actionType}\n` +
                            `*Property Type:* ${propType}\n` +
                            `*Expected Price/Rent:* ₹${price}\n` +
                            `*Location:* ${location}\n` +
                            `*Description:* ${description}\n\n` +
                            `*Contact Details:*\n` +
                            `- Name: ${name}\n` +
                            `- Phone: ${phone}\n` +
                            `- Email: ${email}`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            listingForm.reset();
        });
    }
});
