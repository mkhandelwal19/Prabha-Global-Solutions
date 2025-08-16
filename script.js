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
    if (menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
        menuBtn.textContent = '☰';
        document.body.style.overflow = '';
    }
    
    // Close all dropdowns
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
    } else if (['oracle-cloud', 'cybersecurity', 'peoplesoft', 'ai-data', 'it-staffing', 'managed-services'].includes(pageId)) {
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
    
    if (menu && menuBtn) {
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
}

// Dropdown toggle function
function toggleDropdown(element) {
    // Prevent default behavior
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const navItem = element.closest('.nav-item');
    if (!navItem) return;
    
    const isOpen = navItem.classList.contains('open');
    
    // Close all other dropdowns
    document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
        if (item !== navItem) {
            item.classList.remove('open');
        }
    });
    
    // Toggle current dropdown
    navItem.classList.toggle('open', !isOpen);
}

// Enhanced navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
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
    }
});

// Enhanced EmailJS Contact Form Function with Auto-Reply
async function submitContactFormEmailJS(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Update button state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Get current date for submission tracking
        const submissionDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Prepare data for notification email (to you)
        const notificationParams = {
            from_name: form.from_name.value,
            from_email: form.from_email.value,
            company: form.company.value || 'Not provided',
            service: form.service.value || 'General Inquiry',
            message: form.message.value,
            to_email: 'info@prabhaglobalsolutions.com',
            submission_date: submissionDate
        };
        
        // Prepare data for auto-reply email (to customer)
        const autoReplyParams = {
            to_email: form.from_email.value,          // Send to customer's email
            customer_name: form.from_name.value,      // Customer's name
            service_interest: form.service.value || 'General Inquiry',
            company_name: form.company.value || 'Not provided',
            submission_date: submissionDate
        };
        
        // Send both emails simultaneously
        console.log('Sending notification and auto-reply emails...');
        
        const [notificationResponse, autoReplyResponse] = await Promise.all([
            // Email notification to your company
            emailjs.send(
				'service_wsioiol',     // Replace with your service ID
				'template_8mtklla',
                notificationParams
            ),
            
            // Auto-reply email to customer
            emailjs.send(
                'service_wsioiol',      // Same service ID
                'template_g3j5zxu',  // Your auto-reply template ID
                autoReplyParams
            )
        ]);
        
        console.log('Notification email sent:', notificationResponse);
        console.log('Auto-reply email sent:', autoReplyResponse);
        
        // Show success message
        showSuccessMessage('Thank you for your message! We\'ve sent you a confirmation email and will get back to you within 24 hours.');
        form.reset();
        
    } catch (error) {
        console.error('EmailJS error:', error);
        
        // More specific error handling
        if (error.text && error.text.includes('template')) {
            showErrorMessage('Configuration error. Please contact us directly at info@prabhaglobalsolutions.com');
        } else if (error.text && error.text.includes('service')) {
            showErrorMessage('Service temporarily unavailable. Please try again in a few minutes.');
        } else {
            showErrorMessage('Sorry, there was an error sending your message. Please try again or contact us directly.');
        }
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Enhanced Success Message Function
function showSuccessMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success';
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4);
        z-index: 10000;
        font-weight: 500;
        max-width: 420px;
        font-size: 14px;
        line-height: 1.6;
        animation: slideInRight 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.3);
    `;
    alertDiv.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 12px;">
            <div style="background: rgba(255,255,255,0.2); border-radius: 50%; padding: 8px; flex-shrink: 0; margin-top: 2px;">
                <span style="font-size: 16px; display: block;">✅</span>
            </div>
            <div>
                <div style="font-weight: 600; margin-bottom: 4px; font-size: 15px;">Message Sent Successfully!</div>
                <div style="opacity: 0.95; font-size: 13px;">${message}</div>
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.2); font-size: 12px; opacity: 0.9;">
                    📧 Check your email for a confirmation message
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-dismiss after 8 seconds (longer for auto-reply info)
    setTimeout(() => {
        alertDiv.style.animation = 'slideOutRight 0.4s ease-in';
        setTimeout(() => {
            if (document.body.contains(alertDiv)) {
                document.body.removeChild(alertDiv);
            }
        }, 400);
    }, 8000);
    
    // Add click to dismiss
    alertDiv.addEventListener('click', () => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (document.body.contains(alertDiv)) {
                document.body.removeChild(alertDiv);
            }
        }, 300);
    });
}

// Enhanced Error Message Function
function showErrorMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-error';
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 1.2rem 2rem;
        border-radius: 12px;
        box-shadow: 0 15px 35px rgba(239, 68, 68, 0.4);
        z-index: 10000;
        font-weight: 500;
        max-width: 400px;
        font-size: 14px;
        line-height: 1.5;
        animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    alertDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;">❌</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (document.body.contains(alertDiv)) {
                document.body.removeChild(alertDiv);
            }
        }, 300);
    }, 6000);
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle all navigation clicks
    document.addEventListener('click', function(e) {
        // Handle dropdown menu clicks
        if (e.target.closest('.dropdown-menu a')) {
            e.preventDefault();
            e.stopPropagation();
            const link = e.target.closest('.dropdown-menu a');
            const onclick = link.getAttribute('onclick');
            if (onclick) {
                eval(onclick);
            }
            return;
        }
        
        // Handle main nav clicks
        if (e.target.closest('.nav-menu > li > a')) {
            e.preventDefault();
            e.stopPropagation();
            const link = e.target.closest('.nav-menu > li > a');
            const onclick = link.getAttribute('onclick');
            if (onclick) {
                eval(onclick);
            }
            return;
        }
        
        // Handle logo clicks
        if (e.target.closest('.logo')) {
            e.preventDefault();
            showPage('home');
            return;
        }
        
        // Handle service card clicks
        if (e.target.closest('.service-card')) {
            const card = e.target.closest('.service-card');
            const onclick = card.getAttribute('onclick');
            if (onclick) {
                eval(onclick);
            }
            return;
        }
        
        // Handle industry card clicks
        if (e.target.closest('.industry-card')) {
            const card = e.target.closest('.industry-card');
            const onclick = card.getAttribute('onclick');
            if (onclick) {
                eval(onclick);
            }
            return;
        }
        
        // Handle CTA button clicks
        if (e.target.closest('.cta-primary, .cta-secondary, .case-link')) {
            e.preventDefault();
            const button = e.target.closest('.cta-primary, .cta-secondary, .case-link');
            const onclick = button.getAttribute('onclick');
            if (onclick) {
                eval(onclick);
            }
            return;
        }
        
        // Handle footer link clicks
        if (e.target.closest('.footer-section a')) {
            e.preventDefault();
            const link = e.target.closest('.footer-section a');
            const onclick = link.getAttribute('onclick');
            if (onclick) {
                eval(onclick);
            }
            return;
        }
        
        // Close dropdowns when clicking outside
        if (!e.target.closest('.nav-item')) {
            document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
                item.classList.remove('open');
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
        if (menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuBtn.textContent = '☰';
            document.body.style.overflow = '';
        }
        
        // Close all dropdowns
        document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
            item.classList.remove('open');
        });
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const menu = document.querySelector('.nav-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth > 768 && menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
        menuBtn.textContent = '☰';
        document.body.style.overflow = '';
        
        // Close all mobile dropdowns
        document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
            item.classList.remove('open');
        });
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