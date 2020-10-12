const request = require("supertest");
const server = require("./server.js");
const db = require("../database/dbConfig");
const testUser = { username: "testing", password: "testing" };

describe("server.js", () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe("GET Jokes", () => {
    it("should return a status of 400 when not logged in", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.status).toBe(400);
    });
    it("should return json", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.type).toBe("application/json");
    });
  });
  describe("Adding user to database", () => {
    it("should return a status of 201 with new user", async () => {
      await db("users").truncate();
      const res = await request(server)
        .post("/api/auth/register")
        .send({user: "user3", password: "password"})
        .then(res => {
            expect(res.status).toBe(201);
        })
      
    });
    it("should return a status of 500 with invalid user", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ user: "newnwq", pass: "newnew" });
      expect(res.status).toBe(500);
    });
  });
  describe("Login", () => {
    it("should return a status of 200 with test user", async () => {
      const res = await request(server).post("/api/auth/login").send(testUser);
      expect(res.status).toBe(200);
    });
    it("should return a status of 401 when given a non-valid user", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "rgreg", password: "eewgrgw" });
      expect(res.status).toBe(401);
    });
  });
});