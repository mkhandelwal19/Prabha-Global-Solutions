// Mobile menu toggle
	function toggleMenu() {
		const menu = document.querySelector('.nav-menu');
		menu.classList.toggle('active');
	}

	// Smooth scrolling for navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
			
			// Close mobile menu if open
			const menu = document.querySelector('.nav-menu');
			menu.classList.remove('active');
		});
	});

	// Navbar background on scroll
	window.addEventListener('scroll', function() {
		const navbar = document.getElementById('navbar');
		if (window.scrollY > 50) {
			navbar.style.background = 'rgba(255, 255, 255, 0.98)';
			navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
		} else {
			navbar.style.background = 'rgba(255, 255, 255, 0.95)';
			navbar.style.boxShadow = 'none';
		}
	});

	// Fade in animation on scroll
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

	// Observe all fade-in elements
	document.querySelectorAll('.fade-in').forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(30px)';
		el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
		observer.observe(el);
	});

	// Form submission
	function submitForm(event) {
		event.preventDefault();
		
		// Get form data
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		
		// Simple validation
		if (!data.name || !data.email || !data.message) {
			alert('Please fill in all required fields.');
			return;
		}
		
		// Simulate form submission
		const submitBtn = event.target.querySelector('.submit-btn');
		const originalText = submitBtn.textContent;
		
		submitBtn.textContent = 'Sending...';
		submitBtn.disabled = true;
		
		setTimeout(() => {
			alert('Thank you for your inquiry! We will contact you within 24 hours to discuss your project.');
			event.target.reset();
			submitBtn.textContent = originalText;
			submitBtn.disabled = false;
		}, 2000);
	}

	// Add loading animation to CTA button
	document.addEventListener('DOMContentLoaded', function() {
		const ctaButton = document.querySelector('.cta-button');
		if (ctaButton) {
			ctaButton.addEventListener('mouseenter', function() {
				this.style.transform = 'translateY(-2px) scale(1.05)';
			});
			
			ctaButton.addEventListener('mouseleave', function() {
				this.style.transform = 'translateY(-2px) scale(1)';
			});
		}
	});