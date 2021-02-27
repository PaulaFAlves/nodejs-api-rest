import request from 'supertest'
import { getConnection } from 'typeorm'
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

    afterAll(async () => {
        const connection = getConnection()
        await connection.dropDatabase()
        await connection.close()
    })

    it("should be able to create a new user", async () => {
        const response = await request(app).post("/users")
            .send({
                email: "user2@example.com",
                name: "example2"
            })
        expect(response.status).toBe(201)
    })

    it("shoul not be able to create a user with exists email", async () => {
        const response = await request(app).post("/users")
            .send({
                email: "user2@example.com",
                name: "example2"
            })
        expect(response.status).toBe(400)
    })
})
