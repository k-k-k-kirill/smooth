"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Phase extends objection_1.Model {
    static get tableName() {
        return 'phase';
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
            }
        };
    }
    static get relationMappings() {
        const Question = require('./Question');
        const Task = require('./Task');
        const TaskTemplate = require('./TaskTemplate');
        return {
            tasks: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Task,
                join: {
                    from: 'phase.id',
                    to: 'task.phase_id'
                }
            },
            questions: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Question,
                join: {
                    from: 'phase.id',
                    to: 'question.phase_id'
                }
            },
            task_templates: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: TaskTemplate,
                join: {
                    from: 'phase.id',
                    to: 'task_template.phase_id'
                }
            }
        };
    }
}
exports.default = Phase;
