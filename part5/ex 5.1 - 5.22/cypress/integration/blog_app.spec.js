describe("Blog app", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        const user ={
            name: "Phu Pham",
            username: "phupham",
            password: "phu90"
        }
        cy.request("POST", "http://localhost:3003/api/users/", user)
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function() {
        cy.contains("login").click()
    })
    describe("Login",function() {
        it("succeeds with correct credentials", function() {
            cy.get("#username").type("phupham")
            cy.get("#password").type("phu90")
            cy.contains("login").click()
            cy.contains("Phu Pham logged in")
        })

        it("fails with wrong credentials", function() {
            cy.get("#username").type("phupham")
            cy.get("#password").type("wrong")
            cy.contains("login").click()
            cy.contains("wrong username or password")
        })
    })
    describe("When logged in", function() {
        beforeEach(function() {
            cy.login({ username: "phupham", password: "phu90" })
            cy.createBlog({ title: "first blog", author: "first blog author", url:"HTTP//:firstblog.com", likes:5 })
            cy.createBlog({ title: "second blog", author: "second blog author", url:"HTTP//:secondblog.com", likes:2 })
            cy.createBlog({ title: "third blog", author: "third blog author", url:"HTTP//:thirdblog.com", likes:7 })
        })
        describe("A blog", function(){
            it("can be created", function() {
                cy.contains("create new note").click()
                cy.get("#title").type("a blog created by cypresss")
                cy.get("#author").type("cypress")
                cy.get("#url").type("#HTTP:Test.com")
                cy.get("#submitForm").click()
                cy.contains("a blog created by cypresss")
            })

            it("and can be liked", function(){
                cy.contains("second blog").contains("view").click()
                cy.get(".detailView").contains("second blog").contains("like").click()
                cy.contains("Liked the blog second blog")
            })
            it("and can be deleted", function(){
                cy.contains("second blog").contains("view").click()
                cy.get(".detailView").contains("second blog").contains("remove").click()
                cy.get(".blog").should("not.contain", "second blog")
            })
            it("and is ordered highest likes to lowest", function(){
                cy.get(".detailView:first").contains("7")
                cy.get(".detailView").eq(1).contains("5")
                cy.get(".detailView:last").contains("2")
            })
        })

    })
})