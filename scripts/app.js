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
        flagUnique++;
    }

    if(datePattern.test(start)){
        flagUnique++;
    }

    if(domainPattern.test(domain)){
        flagUnique++;
    }

    if(textPattern.test(customer)){
        flagCreate++;
    }

    if(textPattern.test(product)){
        flagCreate++;
    }

    if (e.submitter.value === "Create"){
        // create the product
        if (flagUnique === 3 && flagCreate == 2){
            console.log("all good to create!");
            const myproduct = new Product(customer, product, domain, start, duration);
            console.log(myproduct);
        } else {
            console.log("missing fields");
        }
    } else {
        // delete the product
        if (flagUnique === 3){
            console.log("all good to delete!");
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

form.product.addEventListener('keyup', e => {
    textPattern.test(e.target.value) ? form.product.setAttribute('class', 'success') : form.product.setAttribute('class', 'error');
});

