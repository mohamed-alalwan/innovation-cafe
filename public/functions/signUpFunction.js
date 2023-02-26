window.onload = () => {

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
                console.log('test')
            // if(validateForm(formSteps[formStepNum])){
                
            // }
        })
    })

    // function validateForm(formID){
    //     const form = document.getElementById(formID)
    //     if(formID == 'account'){
    //         form.children.forEach(child => {
            
    //         });
    //     }
    // }
    
    prevBtn.forEach(btn =>{
        btn.addEventListener('click', () => {
            formStepNum--
            updateFormSteps()
            updateProgressbar()
            console.log('test')
        })
    })
    
    function updateFormSteps(){
        formSteps.forEach((formStep = HTMLDivElement) => {
            formStep.classList.contains('formActiveStep') && formStep.classList.remove('formActiveStep')
        })
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
    console.log(proSteps);
    }
    
}