class Product {
    constructor(customer, product, domain, start, duration){
      this.customer = customer;
      this.product = product;
      this.domain = domain;
      this.start = start;
      this.duration = duration;
    }
    login(){
      console.log(`${this.username} just logged in`);
      return this;
    }
    logout(){
      console.log(`${this.username} just logged out`);
      return this;
    }
    incScore(){
      this.score += 1;
      console.log(`${this.username} has a score of ${this.score}`);
      return this;
    }
}