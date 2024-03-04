//create message testing

import app from "../app";
import request from "supertest";
import { describe, jest, expect, test } from "@jest/globals";
import { createdMessage } from "./mocks/messages";
import Mess from "../model/messageModel";
import User from "../model/userModel";


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ4YTBhYzQwMzgyMGY1ZDA1Yjg1MDUiLCJpYXQiOjE3MDg4OTMyNDF9.lJ4TNm0l0vvTVyxBBUsoWYeM_ZZMD2Bb435gpgcHQV4";
describe("Test create amessage", () => {
  test("test success", async () => {
    jest.spyOn(Mess.prototype, "save").mockResolvedValueOnce(createdMessage);
    const message = await request(app).post("/api/v1/messages").send({
      name: "name",
      email: "email@gmail.com",
      message: "message",
    });
    expect(message.status).toBe(201);
  });

  test("Test sever error", async () => {
    jest.spyOn(Mess.prototype, "save").mockRejectedValueOnce(new Error("Server error"));
    const message = await request(app).post("/api/v1/messages").send({
      name: "name",
      email: "email@gmail.com",
      message: "message",
    });
    expect(message.status).toBe(500);
  });
});

describe("Test get single message", ()=>{
    test('Test message not found', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(Mess, "findById").mockResolvedValueOnce(undefined);
        const messages = await request(app).get("/api/v1/messages/messageId").set({"Authorization": `Bearer ${token}`});
        expect(messages.status).toBe(404);
    })
    test('Test get message success', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(Mess, "findById").mockResolvedValueOnce(createdMessage);
        const messages = await request(app).get("/api/v1/messages/messageId").set({"Authorization": `Bearer ${token}`});
        expect(messages.status).toBe(200);
    })
    test('Test server error', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(Mess, "findById").mockRejectedValueOnce(new Error("Server error"));
        const messages = await request(app).get("/api/v1/messages/messageId").set({"Authorization": `Bearer ${token}`});
        expect(messages.status).toBe(500);
    })
});

describe("Test get all messages", ()=>{
    test('Test no messages found', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin"});
        jest.spyOn(Mess, "find").mockResolvedValueOnce([]);
        const messages = await request(app).get("/api/v1/messages").set({"Authorization": `Bearer ${token}`});
        expect(messages.status).toBe(404);
    })
    test('Test get messages success', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin"});
        jest.spyOn(Mess, "find").mockResolvedValueOnce([createdMessage]);
        const messages = await request(app).get("/api/v1/messages").set({"Authorization": `Bearer ${token}`});
        expect(messages.status).toBe(200);
    })
    test('Test server error', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin"});
        jest.spyOn(Mess, "find").mockRejectedValueOnce(new Error("Server error"));
        const messages = await request(app).get("/api/v1/messages").set({"Authorization": `Bearer ${token}`});
        expect(messages.status).toBe(500);
    })
});

describe("Test delete message", ()=>{
    test('Test message not found', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(Mess, "findByIdAndDelete").mockResolvedValueOnce(undefined);
        const messages = await request(app).delete("/api/v1/mesaages/messageId").set({"Authorization": `Bearer ${token}`});
        expect(messages.status).toBe(404);
    })
    test.skip('Test delete message success', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(Mess, "findByIdAndDelete").mockResolvedValueOnce(createdMessage);
        const messages = await request(app).delete("/api/v1/mesaages/messageId").set({"Authorization": `Bearer ${token}`});
        expect(messages.status).toBe(200);
    })
    test.skip('Test server error', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(Mess, "findByIdAndDelete").mockRejectedValueOnce(new Error("Server error"));
        const messages = await request(app).delete("/api/v1/mesaages/messageId").set({"Authorization": `Bearer ${token}`});
        expect(messages.status).toBe(500);
     })
})
