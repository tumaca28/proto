const form = document.querySelector('.form');
const numericPattern = /^[0-9]+$/;
const datePattern = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
const domainPattern = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;
const textPattern = /^[A-Za-z0-9]+$/;

// form validation
form.addEventListener('submit', e => {
    e.preventDefault();
    
    const duration = form.duration.value;
    const start = form.start.value;
    const domain = form.domain.value;
    const customer = form.customer.value;
    const product = form.product.value;

    let flagUnique = 0;
    let flagCreate = 0;
  
    if(numericPattern.test(duration)){
        flagCreate++;
    }

    if(datePattern.test(start)){
        flagCreate++;
    }

    if(domainPattern.test(domain)){
        flagUnique++;
    }

    if(textPattern.test(customer)){
        flagUnique++;
    }

    if (e.submitter.value === "Create"){
        // create the product
        if (flagUnique === 2 && flagCreate == 2){
            const myproduct = new Product(customer, product, domain, start, duration);
            localStorage.setItem(customer + product + domain, JSON.stringify(myproduct));
        } else {
            console.log("missing fields");
        }
    } else if (e.submitter.value === "Delete"){
        // delete the product
        if (flagUnique === 2){
            localStorage.removeItem(customer + product + domain);
        } else {
            console.log("missing fields");
        }
    }

  });

// live feedback
form.duration.addEventListener('keyup', e => {
    numericPattern.test(e.target.value) ? form.duration.setAttribute('class', 'success') : form.duration.setAttribute('class', 'error');
});

form.start.addEventListener('keyup', e => {
    datePattern.test(e.target.value) ? form.start.setAttribute('class', 'success') : form.start.setAttribute('class', 'error');
});

form.domain.addEventListener('keyup', e => {
    domainPattern.test(e.target.value) ? form.domain.setAttribute('class', 'success') : form.domain.setAttribute('class', 'error');
});

form.customer.addEventListener('keyup', e => {
    textPattern.test(e.target.value) ? form.customer.setAttribute('class', 'success') : form.customer.setAttribute('class', 'error');
});



for (let i = 0; i < localStorage.length; i++){
    //$('body').append(localStorage.getItem(localStorage.key(i)));
    console.log("completed", i);
}