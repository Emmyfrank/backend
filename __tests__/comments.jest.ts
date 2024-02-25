//create message testing

import app from "../app";
import request from 'supertest';
import {describe,jest, expect, test,afterEach} from '@jest/globals';
import "dotenv/config"
import { Comment } from "../model/commentModel";
import { createdComment } from "./mocks/comments";

afterEach(()=>{
    jest.clearAllMocks();

})

describe('Test create comment', () => {
test("test success", async()=> {
    jest.spyOn(Comment.prototype, "save").mockResolvedValueOnce(createdComment);
    const comment = await request(app).post("/api/v1/messages").send({
        name:"name",
        comment:"hello test"
})
    expect(comment.status).toBe(201);
})
})