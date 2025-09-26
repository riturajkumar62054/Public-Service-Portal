// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchSuggestions = document.getElementById('search-suggestions');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');

    // Sample search data
    const searchData = [
        { title: "Student Scholarship", category: "education", popularity: 95, date: "2024-01-15" },
        { title: "Senior Citizen Pension", category: "financial", popularity: 88, date: "2024-02-01" },
        { title: "Farmer's Support Scheme", category: "financial", popularity: 75, date: "2024-01-20" },
        { title: "Startup Grant", category: "financial", popularity: 82, date: "2024-02-10" },
        { title: "Health Insurance Registration", category: "healthcare", popularity: 90, date: "2024-01-25" },
        { title: "Passport Application", category: "documents", popularity: 85, date: "2024-01-30" }
    ];

    function showSuggestions(input) {
        if (!input) {
            searchSuggestions.classList.remove('active');
            return;
        }

        const filtered = searchData.filter(item => 
            item.title.toLowerCase().includes(input.toLowerCase())
        );

        if (filtered.length > 0) {
            searchSuggestions.innerHTML = filtered
                .map(item => `<div class="suggestion-item">${item.title}</div>`)
                .join('');
            searchSuggestions.classList.add('active');
        } else {
            searchSuggestions.classList.remove('active');
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        const category = categoryFilter.value;
        const sortBy = sortFilter.value;

        let results = searchData;

        // Filter by search term
        if (searchTerm) {
            results = results.filter(item => 
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (category !== 'all') {
            results = results.filter(item => item.category === category);
        }

        // Sort results
        switch (sortBy) {
            case 'popular':
                results.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'newest':
                results.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            default:
                // Default sorting by relevance (title match)
                results.sort((a, b) => {
                    const aMatch = a.title.toLowerCase().indexOf(searchTerm.toLowerCase());
                    const bMatch = b.title.toLowerCase().indexOf(searchTerm.toLowerCase());
                    return aMatch - bMatch;
                });
        }

        // Display results (you can customize this part)
        console.log('Search Results:', results);
        // Here you would typically update the UI to show the results
    }

    // Event listeners
    searchInput.addEventListener('input', (e) => {
        showSuggestions(e.target.value);
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value) {
            showSuggestions(searchInput.value);
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.classList.remove('active');
        }
    });

    searchSuggestions.addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-item')) {
            searchInput.value = e.target.textContent;
            searchSuggestions.classList.remove('active');
        performSearch();
        }
    });

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    categoryFilter.addEventListener('change', performSearch);
    sortFilter.addEventListener('change', performSearch);

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading state to CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        // Scroll to services section
        const servicesSection = document.getElementById('services');
        servicesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Accessibility: Add ARIA labels
    const searchButtonIcon = document.querySelector('.search-container button i');
    searchButtonIcon.setAttribute('aria-label', 'Search');
    
    const mobileMenuIcon = document.querySelector('.mobile-menu i');
    mobileMenuIcon.setAttribute('aria-label', 'Menu');

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('user-is-tabbing');
    });

    // Gender selection form redirect
    const genderForm = document.getElementById('gender-selection-form');
    if (genderForm) {
        genderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Optionally, you can store the selected gender in localStorage/sessionStorage if needed
            // const selectedGender = genderForm.gender.value;
            window.location.href = 'education-status.html';
        });
    }

    // Chatbot functionality
    const chatbot = document.querySelector('.chatbot-container');
    const closeBtn = document.querySelector('.close-chatbot');
    const chatIcon = document.querySelector('.chat-icon');
    const messagesContainer = document.querySelector('.chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-message');

    // Show chatbot when chat icon is clicked
    chatIcon.addEventListener('click', () => {
        chatbot.classList.add('active');
    });

    // Close chatbot
    closeBtn.addEventListener('click', () => {
        chatbot.classList.remove('active');
    });

    let userProfile = {
        age: null,
        occupation: null,
        income: null
    };

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function processUserInput(input) {
        if (!userProfile.age) {
            const age = parseInt(input);
            if (!isNaN(age) && age > 0 && age < 120) {
                userProfile.age = age;
                addMessage(`Thank you! Your age is ${age}. What is your occupation?`);
            } else {
                addMessage("Please enter a valid age (1-120).");
            }
        } else if (!userProfile.occupation) {
            userProfile.occupation = input.toLowerCase();
            addMessage(`Got it! You're a ${userProfile.occupation}. Would you like to share your income level? (optional)`);
        } else if (!userProfile.income) {
            if (input.toLowerCase() === 'no' || input.toLowerCase() === 'skip') {
                recommendSchemes();
            } else {
                const income = parseInt(input);
                if (!isNaN(income) && income > 0) {
                    userProfile.income = income;
                    recommendSchemes();
                } else {
                    addMessage("Please enter a valid income amount or type 'skip' to continue without income information.");
                }
            }
        }
    }

    function recommendSchemes() {
        const recommendedSchemes = schemes.filter(scheme => {
            const ageMatch = userProfile.age >= scheme.ageRange[0] && userProfile.age <= scheme.ageRange[1];
            const occupationMatch = scheme.occupations.includes(userProfile.occupation);
            return ageMatch && occupationMatch;
        });

        if (recommendedSchemes.length > 0) {
            addMessage("Based on your profile, here are the recommended schemes:");
            recommendedSchemes.forEach(scheme => {
                addMessage(`- ${scheme.name}: ${scheme.description}`);
            });
        } else {
            addMessage("Sorry, we couldn't find any specific schemes matching your profile. You may want to check our general services section.");
        }

        addMessage("\nWould you like to start over with a new search? (yes/no)");
        userProfile = { age: null, occupation: null, income: null };
    }

    function handleSendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            processUserInput(message);
            userInput.value = '';
        }
    }

    sendBtn.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
}); 