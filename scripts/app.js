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
  
    if(numericPattern.test(duration)){
        console.log('that duration is valid!', duration)
    } else {
        console.log('that duration is NOT valid!', duration)
    }

    if(datePattern.test(start)){
        console.log('that date is valid!', start)
    } else {
        console.log('that date is NOT valid!', start)
    }

    if(domainPattern.test(domain)){
        console.log('that domain is valid!', domain)
    } else {
        console.log('that domain is NOT valid!', domain)
    }

    if(textPattern.test(customer)){
        console.log('that domain is valid!', customer)
    } else {
        console.log('that domain is NOT valid!', customer)
    }

    if(textPattern.test(product)){
        console.log('that domain is valid!', product)
    } else {
        console.log('that domain is NOT valid!', product)
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