import SuperUserAllDocumnetTable from "@/components/superuser/AllDocumentTable"
import { features } from "process"

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
    
    it("Superuser All Document Table", () => {
        cy.visit("/")
    })
}) 