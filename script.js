
        document.addEventListener('DOMContentLoaded', function() {
            // Render lucide icons
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }

            // --- Selectors ---
            const allNavLinks = document.querySelectorAll('a.nav-link, a.mobile-nav-link, a.page-switcher');
            const sections = document.querySelectorAll('.page-section');
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            // --- Page Switching Logic ---
            const showPageFromHash = () => {
                const hash = window.location.hash || '#home';
                
                sections.forEach(section => {
                    section.classList.remove('active');
                });

                const activeSection = document.querySelector(hash);
                if (activeSection) {
                    activeSection.classList.add('active');
                } else {
                    document.getElementById('home').classList.add('active');
                }
                
                const activeLinkSelector = `a[href="${hash}"]`;
                document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelectorAll(activeLinkSelector).forEach(link => {
                    link.classList.add('active');
                });

                window.scrollTo(0, 0);
            };

            // --- Event Listeners ---
            allNavLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    const targetHash = this.getAttribute('href');
                    if (!targetHash || !targetHash.startsWith('#')) return;
                    
                    event.preventDefault();

                    if (window.location.hash !== targetHash) {
                        window.location.hash = targetHash;
                    } else {
                        showPageFromHash();
                    }

                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                    }
                });
            });

            // Mobile menu toggle
            mobileMenuButton.addEventListener('click', () => {
                const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
                mobileMenu.classList.toggle('hidden');
                mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            });

            // FAQ Accordion
            const faqButtons = document.querySelectorAll('#faq button');
            faqButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const content = button.nextElementSibling;
                    const icon = button.querySelector('[data-lucide="chevron-down"]');
                    const isOpening = content.classList.contains('hidden');

                    faqButtons.forEach(otherButton => {
                        if (otherButton !== button) {
                            otherButton.nextElementSibling.classList.add('hidden');
                            otherButton.querySelector('[data-lucide="chevron-down"]').classList.remove('rotate-180');
                            otherButton.setAttribute('aria-expanded', 'false');
                        }
                    });

                    content.classList.toggle('hidden');
                    icon.classList.toggle('rotate-180');
                    button.setAttribute('aria-expanded', !isOpening);
                });
            });

            // --- NEW: WhatsApp Button Logic ---
            const sendMessageBtn = document.getElementById('send-message-btn');
            if (sendMessageBtn) {
                sendMessageBtn.addEventListener('click', function() {
                    // 1. Get form values
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const message = document.getElementById('message').value;

                    // 2. Basic validation
                    if (!name.trim() || !message.trim()) {
                        alert('দয়া করে আপনার নাম এবং বার্তা লিখুন।'); // Please enter your name and message.
                        return;
                    }

                    // 3. Format the message for WhatsApp
                    const fullMessage = `Assalamualaikum,\n\nআমার নাম: ${name}\nআমার ইমেইল: ${email}\n\nবার্তা:\n${message}`;

                    // 4. URL-encode the message
                    const encodedMessage = encodeURIComponent(fullMessage);

                    // 5. IMPORTANT: Replace with your actual WhatsApp number (country code without '+')
                    const whatsappNumber = '+8801946347744';// Example: '1234567890' for USA number +1 234-567-890

                    // 6. Construct the URL
                    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

                    // 7. Open the URL in a new tab
                    window.open(whatsappURL, '_blank');
                });
            }


            // Handle browser back/forward navigation
            window.addEventListener('hashchange', showPageFromHash);

            // Initial page load
            showPageFromHash();
        });