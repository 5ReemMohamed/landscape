window.addEventListener('load', function () {
    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: false,
            });
        }

        document.body.classList.add('loaded');
        window.scrollTo(0, 0);
    }, 100);
});

document.addEventListener('DOMContentLoaded', function () {

    // =========================
    // Image slide auto-rotation
    // =========================
    const imgSlides = document.querySelectorAll('.img-slide');
    let currentImg = 0;

    if (imgSlides.length > 0) {
        setInterval(() => {
            imgSlides[currentImg].classList.remove('active');
            currentImg = (currentImg + 1) % imgSlides.length;
            imgSlides[currentImg].classList.add('active');
        }, 3000);
    }

    // =========================
    // Bootstrap ScrollSpy
    // =========================
    if (typeof bootstrap !== 'undefined') {
        new bootstrap.ScrollSpy(document.body, {
            target: '#navbarNav',
            offset: 100
        });
    }

    // =========================
    // Navbar collapse on link click
    // =========================
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
        });
    });

    // =========================
    // Hero Swiper
    // =========================
    const navNumbers = document.querySelectorAll('.nav-number');
    const heroSwiperEl = document.querySelector('.hero-swiper');

    let heroSwiper;
    if (heroSwiperEl && typeof Swiper !== 'undefined') {
        heroSwiper = new Swiper(heroSwiperEl, {
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            loop: true,
            speed: 800,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                }
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true
            },
            on: {
                slideChange: function () {
                    updateCustomNavigation(this.realIndex);
                },
                init: function () {
                    updateCustomNavigation(0);
                }
            }
        });

        navNumbers.forEach((navNumber, index) => {
            navNumber.addEventListener('click', function () {
                heroSwiper.autoplay.stop();
                heroSwiper.slideToLoop(index);
                updateCustomNavigation(index);
                setTimeout(() => heroSwiper.autoplay.start(), 3000);
            });
        });
    }

    function updateCustomNavigation(activeIndex) {
        navNumbers.forEach((navNumber, index) => {
            navNumber.classList.toggle('active', index === activeIndex);
        });
    }

    // =========================
    // Hero section hover & swipe
    // =========================
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && heroSwiper) {
        heroSection.addEventListener('mouseenter', () => heroSwiper.autoplay.stop());
        heroSection.addEventListener('mouseleave', () => heroSwiper.autoplay.start());

        let touchStartX = 0;
        let touchEndX = 0;

        heroSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        heroSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) heroSwiper.slideNext();
                else heroSwiper.slidePrev();
            }
        });

        window.addEventListener('resize', () => heroSwiper.update());
    }

    // =========================
    // Swiper slide background fade-in
    // =========================
    const swiperSlides = document.querySelectorAll('.swiper-slide');
    if (swiperSlides.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const slideBg = entry.target.querySelector('.slide-bg');
                    if (slideBg && slideBg.style.backgroundImage) {
                        slideBg.style.opacity = '1';
                    }
                    observer.unobserve(entry.target);
                }
            });
        });

        swiperSlides.forEach(slide => imageObserver.observe(slide));
    }

    // =========================
    // Counter animation
    // =========================
    const counterSection = document.querySelector('.counter-section');
    const counters = document.querySelectorAll('.counter-number');
    let counterAnimated = false;

    if (counterSection && counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counterAnimated) {
                    counterAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(counterSection);
    }

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count')) || 0;
            const increment = target / 100;
            let current = 0;

            counter.classList.add('animate');

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 20);
        });
    }

    // =========================
    // Keyboard navigation for Swiper
    // =========================
    document.addEventListener('keydown', function (e) {
        if (!heroSwiper) return;
        switch (e.key) {
            case 'ArrowLeft': heroSwiper.slidePrev(); break;
            case 'ArrowRight': heroSwiper.slideNext(); break;
            case '1': heroSwiper.slideToLoop(0); break;
            case '2': heroSwiper.slideToLoop(1); break;
            case '3': heroSwiper.slideToLoop(2); break;
        }
    });

});
  document.querySelectorAll(".gallery-card img").forEach(img => {
            img.addEventListener("click", () => {
                const modalImg = document.getElementById("modalImage");
                modalImg.src = img.src;
                const modal = new bootstrap.Modal(document.getElementById("imageModal"));
                modal.show();
            });
        });

//   const form = document.getElementById('whatsappForm');
//   const inputs = form.querySelectorAll('input, textarea, select');

//   const regexPatterns = {
//     name: /^[\u0600-\u06FFa-zA-Z\s]{3,}$/,
//     email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//     phone: /^\+?\d{8,15}$/,
//     message: /[\s\S]{10,}/
//   };

//   const errorMessages = {
//     name: "الاسم مطلوب (3 أحرف على الأقل)",
//     email: "يرجى إدخال بريد إلكتروني صحيح",
//     phone: "يرجى إدخال رقم هاتف صحيح",
//     message: "يرجى كتابة رسالة تحتوي على 10 أحرف على الأقل",
//     select: "يرجى اختيار خدمة"
//   };

//   function showError(input, message) {
//     input.classList.add('is-invalid');
//     let error = input.parentElement.querySelector('.error-msg');
//     if (!error) {
//       error = document.createElement('small');
//       error.className = 'error-msg text-danger mt-1 d-block';
//       input.parentElement.appendChild(error);
//     }
//     error.textContent = message;
//   }

//   function removeError(input) {
//     input.classList.remove('is-invalid');
//     const error = input.parentElement.querySelector('.error-msg');
//     if (error) error.remove();
//   }

//   function validateInput(input) {
//     const value = input.value.trim();

//     if (input.type === 'text' && input.placeholder.includes("اسم")) {
//       if (!regexPatterns.name.test(value)) return showError(input, errorMessages.name);
//     } else if (input.type === 'email') {
//       if (!regexPatterns.email.test(value)) return showError(input, errorMessages.email);
//     } else if (input.type === 'tel') {
//       if (!regexPatterns.phone.test(value)) return showError(input, errorMessages.phone);
//     } else if (input.tagName === 'TEXTAREA') {
//       if (!regexPatterns.message.test(value)) return showError(input, errorMessages.message);
//     } else if (input.tagName === 'SELECT') {
//       if (value === "") return showError(input, errorMessages.select);
//     }

//     removeError(input);
//   }

//   inputs.forEach(input => {
//     input.addEventListener('input', () => validateInput(input));
//     input.addEventListener('blur', () => validateInput(input));
//   });

//   form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   let valid = true;
//   inputs.forEach(input => {
//     validateInput(input);
//     if (input.classList.contains('is-invalid')) valid = false;
//   });

//   if (!valid) return;
//   const name = form.querySelector('input[type="text"]').value.trim();
//   const email = form.querySelector('input[type="email"]').value.trim();
//   const phone = form.querySelector('input[type="tel"]').value.trim();
//   const service = form.querySelector('select').value.trim();
//   const message = form.querySelector('textarea').value.trim();
//   const whatsappMessage = `مرحبًا، اسمي *${name}*\nالبريد الإلكتروني: *${email}*\nرقم الهاتف: *${phone}*\nالخدمة المطلوبة: *${service}*\n\nالرسالة:\n${message}`;
//   const phoneNumber = '966542629492';
//   const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
//   window.open(whatsappURL, '_blank');
//   form.reset();
//   inputs.forEach(input => removeError(input));
//   showSuccessMessage("تم إرسال الرسالة بنجاح! سيتم التواصل معك قريبًا.");
// });
// function showSuccessMessage(text) {
//   let successMsg = document.querySelector('.success-message');
//   if (!successMsg) {
//     successMsg = document.createElement('div');
//     successMsg.className = 'success-message text-success mt-3 text-center fw-bold';
//     form.appendChild(successMsg);
//   }
//   successMsg.textContent = text;
//   setTimeout(() => {
//     successMsg.remove();
//   }, 5000);
// }

