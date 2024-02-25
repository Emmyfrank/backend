//create message testing

import app from "../app";
import request from 'supertest';
import {describe,jest, expect, test} from '@jest/globals';
import { createdMessage } from "./mocks/messages";
import Mess from "../model/messageModel";


describe('Test create amessage', () => {
test("test success", async()=> {
    jest.spyOn(Mess.prototype, "save").mockResolvedValueOnce(createdMessage);
    const message = await request(app).post("/api/v1/messages").send({
        name:"name",
        emai:"email@gmail.com",
        message:"message"
})
    expect(message.status).toBe(201);
})
})