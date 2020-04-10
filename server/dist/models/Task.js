"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Task extends objection_1.Model {
    static get tableName() {
        return 'task';
    }
    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title'],
            properties: {
                id: { type: 'integer' },
                title: { type: 'string', minLength: 1, maxLength: 255 },
                status: { type: 'boolean' },
                dur_date: { type: 'datetime' },
                project_id: { type: 'integer' },
                phase_id: { type: 'integer' },
                task_template_id: { type: 'integer' },
                time_worked: { type: 'integer' },
            }
        };
    }
}
exports.default = Task;
