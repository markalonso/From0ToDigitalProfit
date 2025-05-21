document.addEventListener('DOMContentLoaded', function() {
  // Initialize Feather icons
  feather.replace();
  
  // Scroll Progress Bar
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');
  const scrollDots = document.querySelectorAll('.scroll-dot');
  const sections = document.querySelectorAll('section[id]');
  
  // Update scroll progress and active section
  function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / documentHeight) * 100;
    
    scrollProgressBar.style.width = `${progress}%`;
    
    // Update active section in scroll indicator
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    scrollDots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.getAttribute('data-section') === currentSection) {
        dot.classList.add('active');
      }
    });
    
    // Check for elements to animate
    const animateElements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        // Add delay if specified
        const delay = element.getAttribute('data-delay') || 0;
        setTimeout(() => {
          element.classList.add('visible');
        }, delay);
      }
    });
  }
  
  // Initial call and add scroll event listener
  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress);
  
  // Scroll to section when clicking on scroll dots
  scrollDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetSection = document.getElementById(dot.getAttribute('data-section'));
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  
  function showSlide(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonialSlides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }
  
  // Auto-rotate testimonials
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  }, 5000);
  
  // Click on dots to change slide
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });
  
  // FAQ Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      accordionItems.forEach(accItem => {
        accItem.classList.remove('active');
      });
      
      // If the clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  // Sticky CTA
  const stickyCta = document.getElementById('sticky-cta');
  
  // Show sticky CTA after scrolling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  });
  
  // Scroll to form functionality for all CTA buttons
  const scrollToFormButtons = document.querySelectorAll('.scroll-to-form');
  const signupForm = document.getElementById('signup-form');
  
  scrollToFormButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      signupForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
  
  // Form and Thank You Container
  const formContainer = document.getElementById('form-container');
  const thankYouContainer = document.getElementById('thank-you-container');
  const comprehensiveForm = document.getElementById('comprehensive-form');
  
  // Comprehensive form submission with dynamic thank you page
  comprehensiveForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    try {
      // Call the Supabase integration function with the form data
      const result = await submitToSupabase(fullName, email, phone);
      
      if (!result.success) {
        throw new Error(result.message || 'Error submitting form');
      }
      
      console.log('Form submitted successfully to Supabase');
      
      // Hide form and show thank you container with animation
      formContainer.classList.add('hidden');
      
      // Wait for form to fade out before showing thank you
      setTimeout(() => {
        thankYouContainer.classList.remove('hidden');
        
        // Scroll to the thank you container to ensure it's visible
        setTimeout(() => {
          thankYouContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }, 500);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  });
  
  // Preload book cover image for faster display
  const bookCoverImg = new Image();
  bookCoverImg.src = '/assets/images/optimized/book-cover.webp';
  
  // Initialize animations for elements in viewport on page load
  setTimeout(() => {
    updateScrollProgress();
  }, 100);
});
