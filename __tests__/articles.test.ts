//create message testing

import app from "../app";
import request from "supertest";
import { describe, jest, expect, test } from "@jest/globals";
import User from "../model/userModel";
import Article from "../model/articleModel";
import { createdArticle } from "./mocks/article";


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ4YTBhYzQwMzgyMGY1ZDA1Yjg1MDUiLCJpYXQiOjE3MDg4OTMyNDF9.lJ4TNm0l0vvTVyxBBUsoWYeM_ZZMD2Bb435gpgcHQV4";
describe("Test create article", () => {

  test("Test bad data submitted", async () => {
    jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin" });
    const article = await request(app).post("/api/v1/articles").send({
        name: "name",
        email: "email@gmail.com",
        message: "message",
    }).set({"Authorization": `Bearer ${token}`});
    expect(article.status).toBe(400);
});
test("test success", async () => {
    jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin" });
    jest.spyOn(Article.prototype, "save").mockResolvedValueOnce(createdArticle);
    const article = await request(app).post("/api/v1/articles").send({
      title: "Article title",
      description: "Article description",
      image: "image url",
    }).set({"Authorization": `Bearer ${token}`});
    expect(article.status).toBe(201);
  });

  test("Test sever error", async () => {
    jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin" });
    jest.spyOn(Article.prototype, "save").mockRejectedValueOnce(new Error("Server error"));
    const article = await request(app).post("/api/v1/articles").send({
        title: "Article title",
        description: "Article description",
        image: "image url",
    }).set({"Authorization": `Bearer ${token}`});
    expect(article.status).toBe(500);
  });
});

describe("Test get single article", ()=>{
    test('Test article not found', async () => {
        jest.spyOn(Article, "findById").mockResolvedValueOnce(undefined);
        const articles = await request(app).get("/api/v1/articles/articleId").set({"Authorization": `Bearer ${token}`});
        expect(articles.status).toBe(404);
    })
    test('Test get article success', async () => {
        jest.spyOn(Article, "findById").mockResolvedValueOnce(createdArticle);
        const articles = await request(app).get("/api/v1/articles/articleId").set({"Authorization": `Bearer ${token}`});
        expect(articles.status).toBe(200);
    })
    test('Test server error', async () => {
        jest.spyOn(Article, "findById").mockRejectedValueOnce(new Error("Server error"));
        const articles = await request(app).get("/api/v1/articles/articleId").set({"Authorization": `Bearer ${token}`});
        expect(articles.status).toBe(500);
    })
});

describe("Test get all articles", ()=>{
    test('Test no articles found', async () => {
        jest.spyOn(Article, "find").mockResolvedValueOnce([]);
        const articles = await request(app).get("/api/v1/articles");
        expect(articles.status).toBe(404);
    })
    test('Test get all articles success', async () => {
        jest.spyOn(Article, "find").mockResolvedValueOnce([createdArticle]);
        const articles = await request(app).get("/api/v1/articles").set({"Authorization": `Bearer ${token}`});
        expect(articles.status).toBe(200);
    })
    test('Test server error', async () => {
        jest.spyOn(Article, "find").mockRejectedValueOnce(new Error("Server error"));
        const articles = await request(app).get("/api/v1/articles").set({"Authorization": `Bearer ${token}`});
        expect(articles.status).toBe(500);
    })
});

describe("Test delete an article", ()=>{
    test('Test article not found', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(Article, "findByIdAndDelete").mockResolvedValueOnce(undefined);
        const articles = await request(app).delete("/api/v1/mesaages/articleId").set({"Authorization": `Bearer ${token}`});
        expect(articles.status).toBe(404);
    })
    test.skip('Test delete article success', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(Article, "findByIdAndDelete").mockResolvedValueOnce(createdArticle);
        const articles = await request(app).delete("/api/v1/mesaages/articleId").set({"Authorization": `Bearer ${token}`});
        expect(articles.status).toBe(200);
    })
    test.skip('Test server error', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        jest.spyOn(Article, "findByIdAndDelete").mockRejectedValueOnce(new Error("Server error"));
        const articles = await request(app).delete("/api/v1/mesaages/articleId").set({"Authorization": `Bearer ${token}`});
        expect(articles.status).toBe(500);
     })
})
