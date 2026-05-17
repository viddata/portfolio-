document.addEventListener('DOMContentLoaded', () => {
    
    // --- Properties Database & LocalStorage Initialization ---
    const defaultProperties = [
        {
            id: 1,
            title: "Modern Hillside Villa",
            location: "Beverly Hills, CA",
            price: 45000000, // ₹4.5 Crore in Rupees (4,50,00,000)
            priceDisplay: "₹4.5 Cr",
            type: "villa",
            action: "buy",
            beds: 5,
            baths: 6,
            size: "8,500 sqft",
            image: "file:///C:/Users/Lenovo/.gemini/antigravity/brain/c138949b-e438-4219-856e-e52e96559c38/villa_exterior_1779000935762.png",
            badge: "Featured",
            badgeClass: ""
        },
        {
            id: 2,
            title: "Luxury Skyline Penthouse",
            location: "Manhattan, NY",
            price: 21000000, // ₹2.1 Crore (2,10,00,000)
            priceDisplay: "₹2.1 Cr",
            type: "apartment",
            action: "buy",
            beds: 3,
            baths: 3.5,
            size: "3,200 sqft",
            image: "file:///C:/Users/Lenovo/.gemini/antigravity/brain/c138949b-e438-4219-856e-e52e96559c38/apartment_interior_1779000953911.png",
            badge: "New Release",
            badgeClass: ""
        },
        {
            id: 3,
            title: "Glass Edge Mansion",
            location: "Miami Beach, FL",
            price: 150000, // ₹1.5 Lakh / month (1,50,000)
            priceDisplay: "₹1,50,000",
            type: "villa",
            action: "rent",
            beds: 4,
            baths: 5,
            size: "5,100 sqft",
            image: "file:///C:/Users/Lenovo/.gemini/antigravity/brain/c138949b-e438-4219-856e-e52e96559c38/hero_real_estate_1779000919464.png",
            badge: "For Rent",
            badgeClass: "rent"
        },
        {
            id: 4,
            title: "Premium Residential Plot",
            location: "Balita Road, Kota",
            price: 1500000, // ₹15 Lakh (15,00,000)
            priceDisplay: "₹15 Lakh",
            type: "plot",
            action: "buy",
            beds: 0,
            baths: 0,
            size: "1,200 sqft",
            image: "file:///C:/Users/Lenovo/.gemini/antigravity/brain/c138949b-e438-4219-856e-e52e96559c38/hero_real_estate_1779000919464.png",
            badge: "New Launch",
            badgeClass: ""
        },
        {
            id: 5,
            title: "Commercial Shop Space",
            location: "Kunhari, Kota",
            price: 3500000, // ₹35 Lakh (35,00,000)
            priceDisplay: "₹35 Lakh",
            type: "apartment", 
            action: "buy",
            beds: 0,
            baths: 1,
            size: "450 sqft",
            image: "file:///C:/Users/Lenovo/.gemini/antigravity/brain/c138949b-e438-4219-856e-e52e96559c38/hero_real_estate_1779000919464.png",
            badge: "Hot Deal",
            badgeClass: ""
        }
    ];

    // Initialize localStorage if properties don't exist
    if (!localStorage.getItem('my_properties')) {
        localStorage.setItem('my_properties', JSON.stringify(defaultProperties));
    }

    function getProperties() {
        return JSON.parse(localStorage.getItem('my_properties')) || defaultProperties;
    }

    // --- Dynamic Property Rendering ---
    const propertiesGrid = document.getElementById('properties-grid');
    
    function renderProperties(propertiesToRender) {
        if (!propertiesGrid) return;
        
        propertiesGrid.innerHTML = '';
        
        if (propertiesToRender.length === 0) {
            propertiesGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 5rem 2rem; color: var(--text-muted);">
                    <i class="fa-solid fa-circle-exclamation" style="font-size: 3.5rem; color: var(--accent-gold); margin-bottom: 1.5rem;"></i>
                    <h3 style="font-size: 1.5rem; color: var(--text-main); margin-bottom: 0.5rem;">No Properties Found</h3>
                    <p>Try adjusting your search query, property type, or budget filters.</p>
                </div>
            `;
            return;
        }

        propertiesToRender.forEach((prop, index) => {
            const delayClass = index % 3 === 0 ? '' : (index % 3 === 1 ? 'delay-1' : 'delay-2');
            
            const card = document.createElement('div');
            card.className = `property-card reveal ${delayClass} active`;
            
            // Format output for beds/baths/size
            let amenitiesHTML = '';
            if (prop.beds > 0) amenitiesHTML += `<span><i class="fa-solid fa-bed"></i> ${prop.beds} Beds</span>`;
            if (prop.baths > 0) amenitiesHTML += `<span><i class="fa-solid fa-bath"></i> ${prop.baths} Baths</span>`;
            amenitiesHTML += `<span><i class="fa-solid fa-vector-square"></i> ${prop.size}</span>`;

            card.innerHTML = `
                <div class="card-img" style="background-image: url('${prop.image}');">
                    <span class="badge ${prop.badgeClass || ''}">${prop.badge || 'New'}</span>
                </div>
                <div class="card-content">
                    <div class="price">${prop.priceDisplay}${prop.action === 'rent' ? '<span>/mo</span>' : ''}</div>
                    <h3>${prop.title}</h3>
                    <p class="location"><i class="fa-solid fa-location-dot"></i> ${prop.location}</p>
                    <div class="amenities">
                        ${amenitiesHTML}
                    </div>
                </div>
                <div class="card-footer">
                    <span class="agent">Listed by Advisor</span>
                    <button class="btn btn-icon open-modal-btn"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            `;
            
            propertiesGrid.appendChild(card);
        });

        // Re-attach modal trigger to newly rendered buttons
        const newOpenBtns = propertiesGrid.querySelectorAll('.open-modal-btn');
        if (modal) {
            newOpenBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    modal.classList.add('show');
                    initChat();
                });
            });
        }
    }

    // --- Interactive Chatbox Widget Logic ---
    const modal = document.getElementById('inquiry-modal');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.querySelector('.close-modal');
    
    const chatMessages = document.getElementById('chatbox-messages');
    const chatChips = document.getElementById('chatbox-chips');
    const chatForm = document.getElementById('chatbox-input-form');
    const chatInput = document.getElementById('chatbox-user-input');

    let chatStep = 0;
    let leadData = {
        name: '',
        phone: '',
        email: '',
        type: '',
        requirements: ''
    };

    function appendMessage(sender, text, isHtml = false) {
        if (!chatMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        if (isHtml) {
            msgDiv.innerHTML = text;
        } else {
            msgDiv.textContent = text;
        }
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showBotTyping(callback, delay = 800) {
        setTimeout(callback, delay);
    }

    function initChat() {
        if (!chatMessages) return;
        chatMessages.innerHTML = '';
        if (chatChips) chatChips.innerHTML = '';
        if (chatInput) {
            chatInput.value = '';
            chatInput.disabled = false;
            chatInput.placeholder = "Type your message here...";
        }
        chatStep = 0;
        leadData = { name: '', phone: '', email: '', type: '', requirements: '' };

        appendMessage('bot', 'Namaste! 🙏 Welcome to My Property Review.');
        
        showBotTyping(() => {
            appendMessage('bot', "I'm Pradeep Kumar, your Property Assistant. How can I help you find your dream plot, commercial shop, or gated township today? Let's start with your Full Name.");
        }, 1000);
    }

    if (modal) {
        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('show');
                initChat(); // Initialize chat every time it opens!
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    // Handle Quick Reply Chips
    function renderChips(options) {
        if (!chatChips) return;
        chatChips.innerHTML = '';
        options.forEach(opt => {
            const chip = document.createElement('div');
            chip.className = 'chat-chip';
            chip.textContent = opt;
            chip.addEventListener('click', () => {
                submitUserResponse(opt);
            });
            chatChips.appendChild(chip);
        });
    }

    function submitUserResponse(userInputText) {
        if (!userInputText.trim()) return;
        
        // Append user response
        appendMessage('user', userInputText);
        
        if (chatInput) chatInput.value = '';

        // Process chatbot steps
        if (chatStep === 0) {
            leadData.name = userInputText;
            chatStep = 1;
            showBotTyping(() => {
                appendMessage('bot', `Nice to meet you, ${leadData.name}! What is your Phone Number? (Our expert advisor will connect with you on this number).`);
            });
        }
        else if (chatStep === 1) {
            leadData.phone = userInputText;
            chatStep = 2;
            showBotTyping(() => {
                appendMessage('bot', "Perfect! What Property Type are you looking for today?");
                renderChips(['Plots', 'Shops', 'Commercial Plots', 'Gated Township', 'Other']);
            });
        }
        else if (chatStep === 2) {
            leadData.type = userInputText;
            if (chatChips) chatChips.innerHTML = ''; // Hide chips
            chatStep = 3;
            showBotTyping(() => {
                appendMessage('bot', "Great choice! Lastly, tell me a bit about your specific requirements or budget? (e.g. Near highway, 15 Lakh budget, 1000 sqft, etc.)");
            });
        }
        else if (chatStep === 3) {
            leadData.requirements = userInputText;
            chatStep = 4;
            
            if (chatInput) {
                chatInput.disabled = true;
                chatInput.placeholder = "Chat compiled! Click below...";
            }

            showBotTyping(() => {
                appendMessage('bot', `Thank you, ${leadData.name}! I have compiled your inquiry request successfully.`);
                
                showBotTyping(() => {
                    // Format WhatsApp Message
                    const whatsappNumber = "917737748056";
                    const message = `*New Property Chat Inquiry*\n\n` +
                                    `*Name:* ${leadData.name}\n` +
                                    `*Phone:* ${leadData.phone}\n` +
                                    `*Property Type:* ${leadData.type}\n` +
                                    `*Requirements:* ${leadData.requirements}`;
                    
                    const encodedMessage = encodeURIComponent(message);
                    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                    
                    const ctaButtonHTML = `
                        <div>
                            <p style="margin-bottom: 8px;">Click the button below to instantly connect with me on WhatsApp and start chatting live! 💬🚀</p>
                            <a href="${whatsappUrl}" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none; padding: 0.6rem 1.2rem; font-size: 0.95rem; font-weight: 600; border-radius: 30px; margin-top: 5px;">
                                <i class="fa-brands fa-whatsapp" style="font-size: 1.2rem;"></i> Chat Live on WhatsApp
                            </a>
                        </div>
                    `;
                    appendMessage('bot', ctaButtonHTML, true);
                }, 600);
            });
        }
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (chatInput) {
                submitUserResponse(chatInput.value);
            }
        });
    }

    // Render initially on homepage load
    if (propertiesGrid) {
        renderProperties(getProperties());
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
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
    }

    // --- Search Tabs Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // --- Live Filter Search Logic ---
    const filterBtn = document.getElementById('filter-search-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            const activeTab = document.querySelector('.tab-btn.active');
            let actionType = 'buy';
            if (activeTab) {
                const target = activeTab.getAttribute('data-target');
                if (target === 'rent') actionType = 'rent';
                else if (target === 'commercial') actionType = 'commercial';
            }

            const searchLocation = document.getElementById('search-location').value.toLowerCase().trim();
            const searchType = document.getElementById('search-type').value;
            const searchBudget = document.getElementById('search-budget').value;

            const allProperties = getProperties();

            const filtered = allProperties.filter(prop => {
                // 1. Filter by Tab Action
                if (actionType === 'commercial') {
                    const isCommercialType = prop.type === 'plot' || prop.title.toLowerCase().includes('commercial') || prop.type.toLowerCase().includes('shop');
                    if (!isCommercialType) return false;
                } else {
                    if (prop.action !== actionType) return false;
                }

                // 2. Filter by Location Search
                if (searchLocation && !prop.location.toLowerCase().includes(searchLocation) && !prop.title.toLowerCase().includes(searchLocation)) {
                    return false;
                }

                // 3. Filter by Property Type Dropdown
                if (searchType && prop.type !== searchType) {
                    return false;
                }

                // 4. Filter by Budget Range Dropdown
                if (searchBudget) {
                    const price = prop.price;
                    if (searchBudget === '1') { // Under ₹10 Lakh
                        if (price >= 1000000) return false;
                    } else if (searchBudget === '2') { // ₹10 - 20 Lakh
                        if (price < 1000000 || price > 2000000) return false;
                    } else if (searchBudget === '3') { // ₹20 - 40 Lakh
                        if (price < 2000000 || price > 4000000) return false;
                    } else if (searchBudget === '4') { // ₹40 - 75 Lakh
                        if (price < 4000000 || price > 7500000) return false;
                    } else if (searchBudget === '5') { // ₹75 Lakh+
                        if (price < 7500000) return false;
                    }
                }

                return true;
            });

            renderProperties(filtered);
            
            // Smooth scroll down to property results
            const propSection = document.getElementById('properties');
            if (propSection) {
                const headerOffset = 80;
                const elementPosition = propSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
                
                // If it's a stats counter, trigger it
                if(reveal.classList.contains('stat-item') && !reveal.classList.contains('counted')) {
                    const counter = reveal.querySelector('.counter');
                    if(counter) animateCounter(counter);
                    reveal.classList.add('counted');
                }
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run initially on load

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
                if (navLinks) navLinks.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }

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

    // --- Property Listing Form Submission ---
    const listingForm = document.getElementById('submit-listing-form');
    if(listingForm) {
        listingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userType = document.getElementById('list-user-type').value;
            const actionType = document.getElementById('list-action-type').value;
            const propType = document.getElementById('list-prop-type').value;
            const price = document.getElementById('list-price').value;
            const location = document.getElementById('list-location').value;
            const description = document.getElementById('list-description').value;
            const name = document.getElementById('list-name').value;
            const phone = document.getElementById('list-phone').value;
            const email = document.getElementById('list-email').value;
            
            // 1. Process and save listing details dynamically in localStorage property database
            const currentProperties = getProperties();
            
            // Extract numeric price from input
            const numericPrice = parseFloat(price.replace(/,/g, '')) || 0;
            let displayPrice = `₹${price}`;
            
            // Format nice label for price display
            if (numericPrice >= 10000000) {
                displayPrice = `₹${(numericPrice / 10000000).toFixed(1)} Cr`;
            } else if (numericPrice >= 100000) {
                displayPrice = `₹${(numericPrice / 100000).toFixed(1)} Lakh`;
            }

            let typeLower = propType.toLowerCase();
            if (typeLower.includes('plot')) typeLower = 'plot';
            else if (typeLower.includes('villa') || typeLower.includes('house')) typeLower = 'villa';
            else typeLower = 'apartment';

            const newProperty = {
                id: Date.now(),
                title: `${propType} by ${name}`,
                location: location,
                price: numericPrice,
                priceDisplay: displayPrice,
                type: typeLower,
                action: actionType.toLowerCase() === 'sell' ? 'buy' : 'rent', // sell maps to buy
                beds: typeLower === 'plot' ? 0 : 3,
                baths: typeLower === 'plot' ? 0 : 3,
                size: '1,200 sqft',
                image: 'file:///C:/Users/Lenovo/.gemini/antigravity/brain/c138949b-e438-4219-856e-e52e96559c38/hero_real_estate_1779000919464.png',
                badge: 'New Request',
                badgeClass: actionType.toLowerCase() === 'rent' ? 'rent' : ''
            };

            currentProperties.unshift(newProperty); // Put newest listing on top!
            localStorage.setItem('my_properties', JSON.stringify(currentProperties));

            // 2. Format WhatsApp Message
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
            
            // 3. Open WhatsApp redirect
            window.open(whatsappUrl, '_blank');
            listingForm.reset();
        });
    }
});
