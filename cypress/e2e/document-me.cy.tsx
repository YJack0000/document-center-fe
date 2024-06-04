describe("Component Test", ()=> {
    beforeEach(() =>{
        cy.intercept(
            "GET",
            "/api/documents/public/all?page=1&limit=10",
            (req) => {
                req.reply({fixture: "empty-mock.json"})
            }
        )		
    })
    
    it("Visit /documents/me if not user.", () => {
        cy.visit("/documents/me/", {failOnStatusCode: false})
        // cy.url().should("eq", "https://document-center.cerana.tech/login")
    })

}) 