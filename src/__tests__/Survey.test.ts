import { response } from 'express';
import { getConnection } from 'typeorm'
import request from 'supertest'
import { app } from '../app'

import createConnection from '../database'

describe("Surveys", () => {
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

    it("should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys")
            .send({
                title: "title example",
                description: "example description"
            })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
    })

    it("should be able to get all surveys", async () => {
        await request(app).post("/surveys")
            .send({
                title: "title example",
                description: "example description"
            })
        const response = await request(app).get("/surveys")

        expect(response.body.length).toBe(2)
    })
})
