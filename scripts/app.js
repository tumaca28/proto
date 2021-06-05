const form = document.querySelector('.form');
const numericPattern = /^[0-9]+$/;
const datePattern = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
const domainPattern = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;
const textPattern = /^[A-Za-z0-9]+$/;
const list = document.querySelector('body > div.container.card > table > tbody');
const card = document.querySelector('.card');
let report = [];

// refreshUI
const refresh = () => {

    report = [];
    for (let i = 0; i < localStorage.length; i++){
        // iterate over all products to build the report
        reporting(localStorage.key(i));
    }

    if (localStorage.length){
        card.classList.remove('d-none');
    
        // sort the report 
        // due to the date format YYYY-MM-DD I can sort alphabetically
        report.sort((a,b) => (a.emailDate < b.emailDate) ? 1 : ((b.emailDate < a.emailDate) ? -1 : 0))
    
    
        let html ='';
        list.innerHTML = '';
        console.log(report);
    
        // show the report in the UI
        report.forEach(schedEmail =>{
            html = `
            <tr>
                <th scope="row">${schedEmail.customer}</th>
                <td>${schedEmail.product}</td>
                <td>${schedEmail.domain}</td>
                <td>${schedEmail.emailDate}</td>
            </tr> 
            `;

            list.innerHTML += html;
        })

        console.log(list.innerHTML);

        
        
    } else {
        card.classList.add('d-none');
    }
};

// reporting
const reporting = (productKey) => {
    myProduct = JSON.parse(localStorage.getItem(productKey));

    const now = new Date();
    const startDate = new Date(myProduct.start+ 'T00:00:00');
    const expirationDate = new Date( dateFns.addMonths(startDate, 12));

    // I will ingnore all dates in the paste as the schedule will show only future emails to be send
    if (!dateFns.isPast(startDate)){

        switch(myProduct.product){
            case 'domain':
                // Domain sends email 2 days before expiration
                report.push({ "customer": myProduct.customer,
                            "product": myProduct.product,
                            "domain": myProduct.domain,
                            "emailDate": dateFns.format(dateFns.subDays(expirationDate, 2), 'YYYY-MM-DD')
                             });
                break;
            case 'hosting':
                // Hosting sends email 1 day after activation (or startDate)
                report.push({ "customer": myProduct.customer,
                            "product": myProduct.product,
                            "domain": myProduct.domain,
                            "emailDate": dateFns.format(dateFns.addDays(startDate, 1), 'YYYY-MM-DD')
                             });

                // Hosting sends email 3 days before expiration
                report.push({ "customer": myProduct.customer,
                            "product": myProduct.product,
                            "domain": myProduct.domain,
                            "emailDate": dateFns.format(dateFns.subDays(expirationDate, 3), 'YYYY-MM-DD')
                             });
                break;
            case 'pdomain':
                // Protected Domain sends email 9 days before expiration
                report.push({ "customer": myProduct.customer,
                            "product": myProduct.product,
                            "domain": myProduct.domain,
                            "emailDate": dateFns.format(dateFns.subDays(expirationDate, 9), 'YYYY-MM-DD')
                             });

                // Protected Domain sends email 2 days before expiration
                report.push({ "customer": myProduct.customer,
                            "product": myProduct.product,
                            "domain": myProduct.domain,
                            "emailDate": dateFns.format(dateFns.subDays(expirationDate, 2), 'YYYY-MM-DD')
                             });
                break;
        }

    }

};


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
            refresh();
        } else {
            console.log("missing fields");
        }
    } else if (e.submitter.value === "Delete"){
        // delete the product
        if (flagUnique === 2){
            localStorage.removeItem(customer + product + domain);
            refresh();
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

refresh();