
describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Frank',
            username: 'frank',
            password: '123456'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in to the application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username-input').type('frank')
            cy.get('#password-input').type('123456')
            cy.contains('login').click()
            cy.contains('Frank logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username-input').type('frank')
            cy.get('#password-input').type('wrongPWD')
            cy.contains('login').click()
            cy.get('.error').should('contain', 'Wrong credentials')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('.error').should('have.css', 'border-style', 'solid')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login( { username : 'frank', password : '123456' })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title-input').type('testing title')
            cy.get('#author-input').type('testing author')
            cy.get('#url-input').type('testing url')
            cy.get('#create-button').click()
            cy.contains('a new blog testing title by testing author')
            cy.contains('testing title testing author')
        })

        describe('When blog created', function() {

            beforeEach(function() {
                cy.create( { title : 'testing title', author : 'testing author', url: 'testing url' })
            })

            it('A blog can be liked', function() {
                cy.contains('testing title').contains('view').click()
                cy.contains('testing title').contains('like').click()
                cy.contains('likes: 1')
            })

            it('A blog can be deleted', function() {
                cy.contains('testing title').contains('view').click()
                cy.contains('testing title').contains('remove').click()
                cy.get('html').should('not.contain', 'testing title testing author')
            })

        })

        describe('When multiple blog created', function(){
            beforeEach(function() {
                cy.create( { title : 'The title with the second most likes', author : 'testing-author', url: 'testing-url' })
                cy.create( { title : 'The title with the most likes', author : 'testing-author', url: 'testing-url' })
                cy.create( { title : 'The title with the third most likes', author : 'testing-author', url: 'testing-url' })
            })

            it('sort by like', function() {

                cy.contains('The title with the third most likes').contains('view').click()
                cy.contains('The title with the third most likes').contains('like').click()
                cy.wait(500)

                cy.contains('The title with the second most likes').contains('view').click()
                cy.contains('The title with the second most likes').contains('like').click()
                cy.wait(500)
                cy.contains('The title with the second most likes').contains('like').click()
                cy.wait(500)

                //
                cy.contains('The title with the most likes').contains('view').click()
                cy.contains('The title with the most likes').contains('like').click()
                cy.wait(500)
                cy.contains('The title with the most likes').contains('like').click()
                cy.wait(500)
                cy.contains('The title with the most likes').contains('like').click()
                cy.wait(500)

                cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
                cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
                cy.get('.blog').eq(2).should('contain', 'The title with the third most likes')
            })
        })
    })
})