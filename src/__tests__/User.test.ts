import request from 'supertest'
import { app } from '../app'

import createConnection from '../database'

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        try {
            await connection.runMigrations()
        } catch (err) {
            console.log(err)
        }
    })
    
    it ("should be able to create a new user", async () => {
        const response = await request(app).post("/users")
        .send({
            email: "user2@example.com",
            name: "example2"
        })
        expect(response.status).toBe(201)
    })

    it ("shoul not be able to create a user with exists email", async () => {
        const response = await request(app).post("/users")
        .send({
            email: "user2@example.com",
            name: "example2"
        })
        expect(response.status).toBe(400)
    })
})