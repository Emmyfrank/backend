import app from "../app";
import request from 'supertest';
import {describe, expect, test} from '@jest/globals';


test('Test home route', async () => {
const res = await request(app).get('/');
expect(res.statusCode).toBe(200);
})