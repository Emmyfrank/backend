//create message testing

import app from "../app";
import request from 'supertest';
import {describe,jest, expect, test } from '@jest/globals';
import "dotenv/config"
import { Comment } from "../model/commentModel";
import { createdComment } from "./mocks/comments";
import User from "../model/userModel";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ4YTBhYzQwMzgyMGY1ZDA1Yjg1MDUiLCJpYXQiOjE3MDg4OTMyNDF9.lJ4TNm0l0vvTVyxBBUsoWYeM_ZZMD2Bb435gpgcHQV4";

describe.skip('Test create comment', () => {
test("test success", async()=> {
    jest.spyOn(Comment.prototype, "save").mockResolvedValueOnce(createdComment);
    const comment = await request(app).post("/api/v1/comments").send({
        name:"name",
        comment:"hello test"
})
    expect(comment.status).toBe(201);
});

test("test 500 internal error", async()=> {
    jest.spyOn(Comment.prototype, "save").mockRejectedValueOnce(new Error('Server error'));
    const comment = await request(app).post("/api/v1/comments").send({
        name:"name",
        comment:"hello test"
})
    expect(comment.status).toBe(500);
});
});

describe("Test get all comments", ()=>{
    test('Test no comments found', async () => {
        jest.spyOn(Comment, "find").mockResolvedValueOnce([]);
        const comments = await request(app).get("/api/v1/comments");
        expect(comments.status).toBe(404);
    })
    test('Test success get comments', async () => {
        jest.spyOn(Comment, "find").mockResolvedValueOnce([createdComment]);
        const comments = await request(app).get("/api/v1/comments");
        expect(comments.status).toBe(200);
    })
    test('Test server error', async () => {
        jest.spyOn(Comment, "find").mockRejectedValueOnce(new Error("Server error"));
        const comments = await request(app).get("/api/v1/comments");
        expect(comments.status).toBe(500);
    })
});

describe("Test get single comment", ()=>{
    test('Test no comments found', async () => {
        jest.spyOn(Comment, "findById").mockResolvedValueOnce(undefined);
        const comment = await request(app).get("/api/v1/comments/commentId");
        expect(comment.status).toBe(404);
    })
    test('Test success single comment', async () => {
        jest.spyOn(Comment, "findById").mockResolvedValueOnce(createdComment);
        const comment = await request(app).get("/api/v1/comments/commentId");
        expect(comment.status).toBe(200);
    })
    test('Test server error', async () => {
        jest.spyOn(Comment, "findById").mockRejectedValueOnce(new Error("Server error"));
        const comment = await request(app).get("/api/v1/comments/commentId");
        expect(comment.status).toBe(500);
    })
});

describe("Test delete comment", ()=>{
    test('Test comment not found', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(Comment, "findByIdAndDelete").mockResolvedValueOnce(undefined);
        const comment = await request(app).delete("/api/v1/comments/commentId").set({"Authorization": `Bearer ${token}`});
        expect(comment.status).toBe(404);
    })
    test('Test delete message success', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(Comment, "findByIdAndDelete").mockResolvedValueOnce(createdComment);
        const comment = await request(app).delete("/api/v1/comments/commentId").set({"Authorization": `Bearer ${token}`});
        expect(comment.status).toBe(200);
    })
    test('Test server error', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(Comment, "findByIdAndDelete").mockRejectedValueOnce(new Error("Server error"));
        const comment = await request(app).delete("/api/v1/comments/commentId").set({"Authorization": `Bearer ${token}`});
        expect(comment.status).toBe(500);
     })
})