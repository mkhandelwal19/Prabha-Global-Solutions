// Page Navigation System
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateActiveNav(pageId);
    }
    
    // Close mobile menu AND dropdowns
    const menu = document.querySelector('.nav-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        menuBtn.textContent = '☰';
        document.body.style.overflow = ''; // Add this line
    }
    
    // Add this block to close all dropdowns
    document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
        item.classList.remove('open');
    });
}

function updateActiveNav(pageId) {
	// Remove active class from all nav items
	document.querySelectorAll('.nav-item').forEach(item => {
		item.classList.remove('active');
	});
	
	// Add active class to relevant nav item based on page
	const navItems = document.querySelectorAll('.nav-item');
	if (pageId === 'home') {
		navItems[0]?.classList.add('active');
	} else if (['about', 'leadership', 'careers', 'partners'].includes(pageId)) {
		navItems[1]?.classList.add('active');
	} else if (['oracle-cloud', 'cybersecurity', 'peoplesoft', 'ai-data', 'it-staffing'].includes(pageId)) {
		navItems[2]?.classList.add('active');
	} else if (['public-sector', 'healthcare', 'financial', 'manufacturing'].includes(pageId)) {
		navItems[3]?.classList.add('active');
	} else if (pageId === 'case-studies') {
		navItems[4]?.classList.add('active');
	} else if (pageId === 'contact') {
		navItems[5]?.classList.add('active');
	}
}

// Mobile menu toggle
function toggleMenu() {
const menu = document.querySelector('.nav-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    menu.classList.toggle('active');
    menuBtn.textContent = menu.classList.contains('active') ? '✕' : '☰';
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    
    // Close all dropdowns when closing menu
    if (!menu.classList.contains('active')) {
        document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
            item.classList.remove('open');
        });
    }
}

// Enhanced navbar scroll effect
window.addEventListener('scroll', function() {
	const navbar = document.getElementById('navbar');
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	
	if (scrollTop > 100) {
		navbar.style.background = 'rgba(255, 255, 255, 0.98)';
		navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
		navbar.style.borderBottom = '1px solid rgba(99, 102, 241, 0.1)';
	} else {
		navbar.style.background = 'rgba(255, 255, 255, 0.95)';
		navbar.style.boxShadow = 'none';
		navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
	}
});

// Contact form submission
function submitContactForm(event) {
	event.preventDefault();
	const form = event.target;
	const submitBtn = form.querySelector('.submit-btn');
	const originalText = submitBtn.textContent;
	
	// Simulate form submission
	submitBtn.textContent = 'Sending...';
	submitBtn.disabled = true;
	
	setTimeout(() => {
		alert('Thank you for your message! We will get back to you within 24 hours.');
		form.reset();
		submitBtn.textContent = originalText;
		submitBtn.disabled = false;
	}, 2000);
}

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
	// Handle dropdown menu clicks
	document.querySelectorAll('.dropdown-menu a').forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			const onclick = this.getAttribute('onclick');
			if (onclick) {
				eval(onclick);
			}
		});
	});

	// Handle service card clicks
	document.querySelectorAll('.service-card').forEach(card => {
		card.addEventListener('click', function() {
			const onclick = this.getAttribute('onclick');
			if (onclick) {
				eval(onclick);
			}
		});
	});

	// Handle industry card clicks
	document.querySelectorAll('.industry-card').forEach(card => {
		card.addEventListener('click', function() {
			const onclick = this.getAttribute('onclick');
			if (onclick) {
				eval(onclick);
			}
		});
	});

	// Handle CTA button clicks
	document.querySelectorAll('.cta-primary, .cta-secondary, .case-link').forEach(button => {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			const onclick = this.getAttribute('onclick');
			if (onclick) {
				eval(onclick);
			}
		});
	});

	// Handle nav menu clicks
	document.querySelectorAll('.nav-menu > li > a').forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const onclick = this.getAttribute('onclick');
			if (onclick) {
				eval(onclick);
			}
		});
	});

	// Handle footer link clicks
	document.querySelectorAll('.footer-section a').forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const onclick = this.getAttribute('onclick');
			if (onclick) {
				eval(onclick);
			}
		});
	});

	// Handle logo clicks
	document.querySelector('.logo').addEventListener('click', function(e) {
		e.preventDefault();
		showPage('home');
	});

	// Close dropdowns when clicking outside
	document.addEventListener('click', function(e) {
		if (!e.target.closest('.nav-item')) {
			document.querySelectorAll('.dropdown-menu').forEach(menu => {
				menu.style.opacity = '0';
				menu.style.visibility = 'hidden';
				menu.style.transform = 'translateY(-10px)';
			});
		}
	});

	// Add intersection observer for animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver(function(entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);

	// Observe elements for animation
	document.querySelectorAll('.service-card, .industry-card, .differentiator-card, .case-study-card, .content-card').forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(30px)';
		el.style.transition = 'all 0.6s ease';
		observer.observe(el);
	});

	// Initialize with home page
	showPage('home');
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape') {
		const menu = document.querySelector('.nav-menu');
		const menuBtn = document.querySelector('.mobile-menu-btn');
		if (menu.classList.contains('active')) {
			menu.classList.remove('active');
			menuBtn.textContent = '☰';
		}
	}
});

// Handle browser back/forward
window.addEventListener('popstate', function() {
	const hash = window.location.hash.slice(1);
	if (hash && document.getElementById(hash)) {
		showPage(hash);
	} else {
		showPage('home');
	}
});

// Set initial page based on URL hash
window.addEventListener('load', function() {
	const hash = window.location.hash.slice(1);
	if (hash && document.getElementById(hash)) {
		showPage(hash);
	} else {
		showPage('home');
	}
});

// Add this new function
function toggleDropdown(element) {
    const navItem = element.closest('.nav-item');
    const isOpen = navItem.classList.contains('open');
    
    // Close all other dropdowns
    document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
        if (item !== navItem) {
            item.classList.remove('open');
        }
    });
    
    // Toggle current dropdown
    navItem.classList.toggle('open', !isOpen);
    
    // For desktop, use CSS hover, but for mobile use the open class
    if (window.innerWidth <= 768) {
        // Mobile behavior - use the 'open' class
        navItem.classList.toggle('open', !isOpen);
    } else {
        // Desktop behavior - let CSS hover handle it, but still toggle for click
        navItem.classList.toggle('open', !isOpen);
        
        // For desktop, also handle with direct style manipulation as fallback
        const dropdown = navItem.querySelector('.dropdown-menu');
        if (dropdown) {
            if (!isOpen) {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
            } else {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
            }
        }
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    const menu = document.querySelector('.nav-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth > 768 && menu.classList.contains('active')) {
        menu.classList.remove('active');
        menuBtn.textContent = '☰';
        document.body.style.overflow = '';
        
        // Close all mobile dropdowns
        document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
            item.classList.remove('open');
        });
    }
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const nav = document.querySelector('nav');
    const menu = document.querySelector('.nav-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!nav.contains(e.target) && menu.classList.contains('active')) {
        menu.classList.remove('active');
        menuBtn.textContent = '☰';
        document.body.style.overflow = '';
        
        // Close all dropdowns
        document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
            item.classList.remove('open');
        });
    }
});