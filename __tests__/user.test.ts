import app from "../app";
import request from "supertest";
import { describe, expect, jest, test } from "@jest/globals";
import User from "../model/userModel";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ4YTBhYzQwMzgyMGY1ZDA1Yjg1MDUiLCJpYXQiOjE3MDg4OTMyNDF9.lJ4TNm0l0vvTVyxBBUsoWYeM_ZZMD2Bb435gpgcHQV4";
test("Test home route", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
});

test("Test non exist route", async () => {
  const res = await request(app).get("/dfghjjgfgd");
  expect(res.status).toBe(404);
});

describe("Test user registration", () => {
  test("Test user exist", async () => {
    jest
      .spyOn(User, "findOne")
      .mockResolvedValueOnce({ name: "test", email: "test@example.com" });
    const user = await request(app).post("/api/v1/users/register").send({
      name: "test",
      email: "test@example.com",
      password: "testpassword",
      username: "testuser",
    });
    expect(user.status).toBe(409);
  });
  test("Test success", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce(undefined);
    jest
      .spyOn(User.prototype, "save")
      .mockResolvedValueOnce({ name: "test", email: "test@example.com" });
    const user = await request(app).post("/api/v1/users/register").send({
      name: "test",
      email: "test@example.com",
      password: "testpassword",
      username: "testuser",
    });
    expect(user.status).toBe(201);
  });
  test("test 500 internal error", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce(undefined);
    jest
      .spyOn(User.prototype, "save")
      .mockRejectedValueOnce(new Error("Server error"));
    const comment = await request(app).post("/api/v1/users/register").send({
      name: "test",
      email: "test@example.com",
      password: "testpassword",
      username: "testuser",
    });
    expect(comment.status).toBe(500);
  });
});

describe("Test user login", () => {
  test("Test user does not exist", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce(undefined);
    const user = await request(app).post("/api/v1/users/login").send({
      email: "test@example.com",
      password: "testpassword",
    });
    expect(user.status).toBe(404);
  });
  test("Test password incorrect password", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpass"});
    const user = await request(app).post("/api/v1/users/login").send({
      email: "test@example.com",
      password: "testpassword",
    });
    expect(user.status).toBe(401);
  });
  test("Test success", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
    const user = await request(app).post("/api/v1/users/login").send({
      email: "test@example.com",
      password: "testpassword",
    });
    expect(user.status).toBe(200);
  });
  test("test 500 internal error", async () => {
    jest.spyOn(User, "findOne").mockRejectedValueOnce(new Error("Server error"));
    const user = await request(app).post("/api/v1/users/login").send({
      email: "test@example.com",
      password: "testpassword",
    });
    expect(user.status).toBe(500);
  });
});

describe("Test get all users", ()=> {
    describe("Test isLoggedIn middleware", ()=> {
        test('Test no token', async () => { 
            const users = await request(app).get("/api/v1/users");
            expect(users.status).toBe(401);
         });

        test('Test invalid token', async () => { 
            const users = await request(app).get("/api/v1/users").set({"Authorization": "Bearer some_token"});
            expect(users.status).toBe(401);
         });

        test('Test token is valid but no user found', async () => {
            jest.spyOn(User, "findById").mockResolvedValueOnce(undefined);
            const users = await request(app).get("/api/v1/users").set({"Authorization": `Bearer ${token}`});
            expect(users.status).toBe(401);
         });

        test.skip('Test server error', async () => {
            jest.spyOn(User, "findById").mockRejectedValueOnce(new Error("Server error"));
            const users = await request(app).get("/api/v1/users").set({"Authorization": `Bearer ${token}`});
            expect(users.status).toBe(500);
         });

         // if everything is ok, it will procced to get all users
    })
    test('Test no users', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(User, "find").mockResolvedValueOnce([]);
        const users = await request(app).get("/api/v1/users").set({"Authorization": `Bearer ${token}`});
        expect(users.status).toBe(404);
     });

    test('Test success get all users', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(User, "find").mockResolvedValueOnce([{ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"}]);
        const users = await request(app).get("/api/v1/users").set({"Authorization": `Bearer ${token}`});
        expect(users.status).toBe(200);
     })

    test('Test server error', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(User, "find").mockRejectedValueOnce(new Error("Server error"));
        const users = await request(app).get("/api/v1/users").set({"Authorization": `Bearer ${token}`});
        expect(users.status).toBe(500);
     })
});

describe("Test get single user", ()=>{
    test('Test user not found', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"}).mockResolvedValueOnce(undefined);
        const users = await request(app).get("/api/v1/users/userId").set({"Authorization": `Bearer ${token}`});
        expect(users.status).toBe(404);
     })
    test('Test get user success', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"}).mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        const users = await request(app).get("/api/v1/users/userId").set({"Authorization": `Bearer ${token}`});
        expect(users.status).toBe(200);
     })
    test('Test server error', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"}).mockRejectedValueOnce(new Error("Server error"));
        const users = await request(app).get("/api/v1/users/userId").set({"Authorization": `Bearer ${token}`});
        expect(users.status).toBe(500);
     })
});

describe("Test delete user", ()=>{
    test('Test user not found', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(User, "findByIdAndDelete").mockResolvedValueOnce(undefined);
        const users = await request(app).delete("/api/v1/users/userId").set({"Authorization": `Bearer ${token}`});
        expect(users.status).toBe(404);
     })
    test('Test delete user success', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(User, "findByIdAndDelete").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        const users = await request(app).delete("/api/v1/users/userId").set({"Authorization": `Bearer ${token}`});
        expect(users.status).toBe(200);
     })
    test('Test server error', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"}).mockRejectedValueOnce(new Error("Server error"));
        const users = await request(app).delete("/api/v1/users/userId").set({"Authorization": `Bearer ${token}`});
        expect(users.status).toBe(500);
     })
})
