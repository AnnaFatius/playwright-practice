import axios from 'axios';
import { test, expect } from '@playwright/test';

const BASE_URL_JsPlaceholder = 'https://jsonplaceholder.typicode.com';

test.describe('Api testing', async () => {

    test('GET [/posts] - should return 100 posts', async () => {
        const response = await axios.get(`${BASE_URL_JsPlaceholder}/posts`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(100);
    });
      
    test('GET [/posts/2] - verify userId, id, title', async () => {
        const response = await axios.get(`${BASE_URL_JsPlaceholder}/posts/2`);
        expect(response.status).toBe(200);
        expect(response.data.userId).toBe(1);
        expect(response.data.id).toBe(2);
        expect(response.data.title).toBe('qui est esse');
    });

    test('GET [/posts/3] - verify userId, id, title', async () => {
        const response = await axios.get(`${BASE_URL_JsPlaceholder}/posts/3`);
        expect(response.status).toBe(200);
        expect(response.data.userId).toBe(1);
        expect(response.data.id).toBe(3);
        expect(response.data.title).toBe('ea molestias quasi exercitationem repellat qui ipsa sit aut');
    });
      
    test('GET [/posts/5] - should contain id 5', async () => {
        const response = await axios.get(`${BASE_URL_JsPlaceholder}/posts/5`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id', 5);
    });

    test('GET [/posts/8] - should contain id 8', async () => {
        const response = await axios.get(`${BASE_URL_JsPlaceholder}/posts/8`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id', 8);
    });

    test('POST [/posts] - create new post', async () => {
        const newPost = {
            title: 'New title',
            body: 'random text for body',
            userId: 1,
        };
        const response = await axios.post(`${BASE_URL_JsPlaceholder}/posts`, newPost);
        expect(response.status).toBe(201);
        expect(response.data.id).toBe(101);
        expect(response.data).toMatchObject(newPost);
    });

    test('POST [/posts] - create new post with title and userId', async () => {
        const newPost = {
            title: 'My test post',
            userId: 1
        };
      
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
        
        expect(response.status).toBe(201);
        expect(response.data).toMatchObject(newPost);
        expect(response.data).toHaveProperty('id', 101);
    });

    test('POST [/posts] - create new post with body and userId', async () => {
        const newPost = {
            body: 'random text for body in fake post',
            userId: 1
        };
      
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
        
        expect(response.status).toBe(201);
        expect(response.data).toMatchObject(newPost);
        expect(response.data).toHaveProperty('id', 101);
    });

    test('POST [/posts] - create new post with body and title', async () => {
        const newPost = {
            title: 'It is my new title for this home task',
            body: 'new random text for this fake post))',
        };
        const response = await axios.post(`${BASE_URL_JsPlaceholder}/posts`, newPost);
        expect(response.status).toBe(201);
        expect(response.data.id).toBe(101);
        expect(response.data).toMatchObject(newPost);
    });

    test('POST [/users] - create new user', async () => {
        const newUser = {
            name: 'Maria Qauhbciw',
            username: 'mariaqa',
            email: 'maria@qa.com',
        };
        const response = await axios.post(`${BASE_URL_JsPlaceholder}/users`, newUser);
        expect(response.status).toBe(201);
        expect(response.data).toMatchObject(newUser);
        expect(response.data).toHaveProperty('id');
    });
   
});