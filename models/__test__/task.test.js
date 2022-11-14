const {Task} = require('../task_model');
import {describe, expect, test} from '@jest/globals';

describe("Tasks testing",() => {
    test('getAllTasks', async () => {
        const data = await Task.findAll();
        expect(data).not.toBeNull();
    });

    test('getTaskById', async () => {
        const data = await Task.findByPk(17);
        expect(data).not.toBeNull();
    });
});