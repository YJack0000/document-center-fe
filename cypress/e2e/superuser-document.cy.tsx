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
    
    it("Visit /superuser/documents if not privilege user. Should redirect to login", () => {
        cy.visit("/documents/me")
        cy.location("pathname").should("eq", "/login")
    })
})