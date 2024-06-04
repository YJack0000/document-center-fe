import SuperUserAllDocumnetTable from "@/components/superuser/AllDocumentTable"

describe("Component Test", ()=> {
    beforeEach(() =>{
        cy.intercept(
            "GET",
            "/api/documents/public/all?page=1&limit=10",
            (req) => {
                req.reply({"data": [], "page": 1, "limit": 10, "total": 0})
            }
        )
        cy.intercept(
            "GET",
            "/api/documents/all?page=1&limit=10",
            {fixture: "superuser-all-documents-1.json"}
        )
        cy.intercept(
            "GET",
            "/api/documents/all?page=2&limit=10",
            {fixture: "superuser-all-documents-2.json"}
        )
				cy.intercept(
					"GET",
          "/api/reviews/*",
          (req) => {
            const reviewId = req.url.split("/").pop()
            if(reviewId === "D1") {
              req.reply({fixture: "review-history-1.json"})
            }
            else if(reviewId === "D100") {
              req.reply({fixture: "review-history-2.json"})
            }
            else {
              req.reply({fixture: "empty-mock.json"})
            }
          }
				)
				cy.mount(<SuperUserAllDocumnetTable />)
    })
    
    it("Superuser All Document Table", () => {
        cy.get("table").find("thead tr th").eq(1).should("contain.text", "標題")
        cy.get("table").find("thead tr th").eq(2).should("contain.text", "狀態")
        cy.get("table").find("thead tr th").eq(3).should("contain.text", "所有者")
        cy.get("table").find("thead tr th").eq(4).should("contain.text", "近期審核日期")
        cy.get("table").find("thead tr th").eq(5).should("contain.text", "原審核者")
        cy.get("table").find("thead tr th").eq(6).should("contain.text", "指定新審核者")
    })

    it("should display all documents", ()=> {
        // cy.get("table").find("tbody tr").should("have.length", 10)
        cy.get("table").find("tbody tr").eq(0).find("td").eq(1).should("contain.text", "Document 1")
        cy.get("table").find("tbody tr").eq(0).find("td").eq(2).should("contain.text", "通過")
        cy.get("table").find("tbody tr").eq(0).find("td").eq(3).should("contain.text", "Owner 1")
        cy.get("table").find("tbody tr").eq(0).find("td").eq(5).should("contain.text", "Owner 101")
    })
}) 