window.onload = () => {
    // Multi Steps SignUp
    const prevBtn = document.querySelectorAll('.btnPrevious')
    const nextBtn = document.querySelectorAll('.btnNext')
    const progress = document.querySelector('#progress')
    const formSteps = document.querySelectorAll('.formStep')
    const proSteps = document.querySelectorAll('.progressStep')

    let formStepNum = 0
    
    nextBtn.forEach(btn =>{
        btn.addEventListener('click', () => {
            formStepNum++
                updateFormSteps()
                updateProgressbar()
        })
    })
    
    prevBtn.forEach(btn =>{
        btn.addEventListener('click', () => {
            formStepNum--
            updateFormSteps()
            updateProgressbar()
        })
    })
    
    function updateFormSteps(){
        formSteps.forEach((formStep = HTMLDivElement) => {
            formStep.classList.contains('formActiveStep') && formStep.classList.remove('formActiveStep')
        })
        if(formSteps[formStepNum])
            formSteps[formStepNum].classList.add('formActiveStep')
    }
    
    function updateProgressbar() {
        proSteps.forEach((proStep, idx) => {
            if(idx < formStepNum + 1){
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