const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('input, textarea, select');

const regexPatterns = {
    name: /^[\u0600-\u06FFa-zA-Z\s]{3,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?\d{8,15}$/,
    message: /[\s\S]{10,}/
};

const errorMessages = {
    name: "الاسم مطلوب (3 أحرف على الأقل)",
    email: "يرجى إدخال بريد إلكتروني صحيح",
    phone: "يرجى إدخال رقم هاتف صحيح",
    message: "يرجى كتابة رسالة تحتوي على 10 أحرف على الأقل",
    select: "يرجى اختيار خدمة"
};

function showError(input, message) {
    input.classList.add('is-invalid');
    let error = input.parentElement.querySelector('.error-msg');
    if (!error) {
        error = document.createElement('small');
        error.className = 'error-msg text-danger mt-1 d-block';
        input.parentElement.appendChild(error);
    }
    error.textContent = message;
}

function removeError(input) {
    input.classList.remove('is-invalid');
    const error = input.parentElement.querySelector('.error-msg');
    if (error) error.remove();
}

function validateInput(input) {
    const value = input.value.trim();

    // Check empty first
    if (value === "") {
        if (input.tagName === 'SELECT') {
            return showError(input, errorMessages.select);
        } else if (input.type === 'text') {
            return showError(input, errorMessages.name);
        } else if (input.type === 'email') {
            return showError(input, errorMessages.email);
        } else if (input.type === 'tel') {
            return showError(input, errorMessages.phone);
        } else if (input.tagName === 'TEXTAREA') {
            return showError(input, errorMessages.message);
        }
    }

    // Then validate regex
    if (input.type === 'text' && !regexPatterns.name.test(value)) return showError(input, errorMessages.name);
    if (input.type === 'email' && !regexPatterns.email.test(value)) return showError(input, errorMessages.email);
    if (input.type === 'tel' && !regexPatterns.phone.test(value)) return showError(input, errorMessages.phone);
    if (input.tagName === 'TEXTAREA' && !regexPatterns.message.test(value)) return showError(input, errorMessages.message);
    if (input.tagName === 'SELECT' && value === "") return showError(input, errorMessages.select);

    removeError(input);
}

inputs.forEach(input => {
    input.addEventListener('input', () => validateInput(input));
    input.addEventListener('blur', () => validateInput(input));
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    inputs.forEach(input => {
        validateInput(input);
        if (input.classList.contains('is-invalid')) valid = false;
    });

    if (!valid) return;

    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const phone = form.querySelector('input[type="tel"]').value.trim();
    const service = form.querySelector('select').value.trim();
    const message = form.querySelector('textarea').value.trim();

    const whatsappMessage = `مرحبًا، اسمي *${name}*\nالبريد الإلكتروني: *${email}*\nرقم الهاتف: *${phone}*\nالخدمة المطلوبة: *${service}*\n\nالرسالة:\n${message}`;
    const phoneNumber = '966508109145';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');

    form.reset();
    inputs.forEach(input => removeError(input));
    showSuccessMessage("تم إرسال الرسالة بنجاح! سيتم التواصل معك قريبًا.");
});

function showSuccessMessage(text) {
    let successMsg = document.querySelector('.success-message');
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'success-message text-success mt-3 text-center fw-bold';
        form.appendChild(successMsg);
    }
    successMsg.textContent = text;
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}



