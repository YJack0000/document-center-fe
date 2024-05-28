describe("Superuser AllDocument Table", ()=> {
    it("successfully loads", ()=> {
        cy.visit('http://localhost:3000/superuser/documents')
    })
}) 