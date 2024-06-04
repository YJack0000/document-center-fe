describe("Component Test", ()=> {
    beforeEach(() =>{
        cy.intercept(
            "GET",
            "/api/documents/public/all?page=1&limit=10",
            {fixture: "public-documents.json"}
        )
        cy.intercept(
            "GET",
            "/api/documents/D1",
            {fixture: "document-D1.json"}
        )
    })
    
    it("Visit D1 document", () => {
        cy.visit("/")
        cy.get("table").find("tbody tr").eq(0).find("td").eq(0).find("div").click()
        cy.location("pathname").should("eq", "/public/documents/D1")
    })

}) 