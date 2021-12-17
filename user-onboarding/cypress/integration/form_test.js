describe ('Form App', () => {
    beforeEach (() => {
        cy.visit('http://localhost:3000')
    })
const nameInput = () => cy.get('input[name=name]');
const emailInput = () => cy.get('input[name=email]');
const passwordInput = () => cy.get('input[name=password]');
const termsCheckBox = () => cy.get('[type=checkbox]');
const submitBtn = () => cy.get('button[id="submitBtn"]');

it('sanity check to make sure tests work', () => {
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
    expect({}).not.to.equal({});
    expect({}).to.eql({});
  })

  it('proper elements are showing', () => {
    nameInput().should('exist')
    emailInput().should('exist')
    passwordInput().should('exist')
    termsCheckBox().should('exist')
    submitBtn().should('exist')
})
    it('type in inputs', () => {
        nameInput()
        .should('have.value', '')
        .type('Jane')
        .should('have.value', 'Jane')

        emailInput()
        .should('have.value', '')
        .type('somethinghere@gmail.com')
        .should('have.value', 'somethinghere@gmail.com')

        passwordInput()
        .should('have.value', '')
        .type('123456')
        .should('have.value', '123456')
    })

    it('checks the terms', () => {
        termsCheckBox().check().should('be.checked')
    })

    it('submit the form', () => {
        nameInput().type('Jane');
        emailInput().type('somethinghere@gmail.com');
        passwordInput().type('123456')
        termsCheckBox().check();
        submitBtn().click();
    })
})