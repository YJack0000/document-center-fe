describe("Component Test", ()=> {
    beforeEach(() =>{
        cy.visit("/")
        cy.intercept(
            "GET",
            "/api/documents/public/all?page=1&limit=10",
            {fixture: "public-documents.json"}
        )
    })
    
    it("Visit root", () => {
        cy.location("pathname").should("eq", "/")
    })

    it("Public Document Table", () => {
        cy.get("table").find("thead tr th").eq(0).should("contain.text", "標題")
        cy.get("table").find("thead tr th").eq(1).should("contain.text", "擁有者")
    })

    // it("Public Document Table Pagination", () => {

}) 