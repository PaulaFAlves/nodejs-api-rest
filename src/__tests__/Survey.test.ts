import { response } from 'express';
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
    
    it ("should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys")
        .send({
            title: "title example",
            description: "example description"
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
    })

    it ("should be able to get all surveys", async () => {
        await request(app).post("/surveys")
        .send({
            title: "title example",
            description: "example description"
        })
        const response = await request(app).get("/surveys")

        expect(response.body.length).toBe(2)
    })
})