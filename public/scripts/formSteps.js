window.onload = () => {
    // Multi Steps SignUp
    const prevBtn = document.querySelectorAll('.btnPrevious')
    const nextBtn = document.querySelectorAll('.btnNext')
    const progress = document.querySelector('#progress')
    const formSteps = document.querySelectorAll('.formStep')
    const proSteps = document.querySelectorAll('.progressStep')

    let formStepNum = 0

    function validateStep() {
        const message = document.getElementById('message');
        console.log(formStepNum)
        if (formSteps[formStepNum].id === 'account') {
            const email = document.getElementsByName('email')[0].value;
            const password = document.getElementsByName('password')[0].value;
            const confirmPassword = document.getElementsByName('confirmPassword')[0].value;
            if (email === '' || password === '' || confirmPassword === '') {
                message.innerHTML = '&#9432; All fields are required';
                return false;
            }
            else if (password !== confirmPassword) {
                message.innerHTML = '&#9432; Passwords do not match';
                return false;
            }
        } else if (formSteps[formStepNum].id === 'personal') {
            const firstName = document.getElementsByName('firstName')[0].value;
            const lastName = document.getElementsByName('lastName')[0].value;
            const phoneNumber = document.getElementsByName('phoneNumber')[0].value;
            if (firstName === '' || lastName === '' || phoneNumber === '') {
                message.innerHTML = '&#9432; All fields are required';
                return false;
            }
        }
        message.innerHTML = ''
        return true
    }

    nextBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep()) {
                formStepNum++
                updateFormSteps()
                updateProgressbar()
            }
        })
    })

    prevBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            formStepNum--
            updateFormSteps()
            updateProgressbar()
        })
    })

    function updateFormSteps() {
        formSteps.forEach((formStep = HTMLDivElement) => {
            formStep.classList.contains('formActiveStep') && formStep.classList.remove('formActiveStep')
        })
        if (formSteps[formStepNum])
            formSteps[formStepNum].classList.add('formActiveStep')
    }

    function updateProgressbar() {
        proSteps.forEach((proStep, idx) => {
            if (idx < formStepNum + 1) {
                proStep.classList.add('progressStepActive')
            } else {
                proStep.classList.remove('progressStepActive')
            }
        })
        const progressActive = document.querySelectorAll('.progressStepActive')
        progress.style.width = ((progressActive.length - 1) / (proSteps.length - 1)) * 100 + "%"
    }

    // Menu Filter Button
    const menuBtns = document.querySelectorAll('.menuBtn')
    const items = document.querySelectorAll('.items')

}