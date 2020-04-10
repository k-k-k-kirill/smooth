"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Project extends objection_1.Model {
    static get tableName() {
        return 'project';
    }
    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title', 'user_id'],
            properties: {
                id: { type: 'integer' },
                title: { type: 'string', minLength: 1, maxLength: 255 },
                user_id: { type: 'integer' },
                template_id: { type: 'integer' },
                budget_time: { type: 'integer' },
            }
        };
    }
    static get relationMappings() {
        const Phase = require('./Phase');
        const Task = require('./Task');
        return {
            phases: {
                relation: objection_1.Model.ManyToManyRelation,
                modelClass: Phase,
                join: {
                    from: 'project.id',
                    through: {
                        // phase_project is the join table.
                        from: 'phase_project.phase_id',
                        to: 'phase_project.project_id'
                    },
                    to: 'phase.id'
                }
            },
            tasks: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Task,
                join: {
                    from: 'project.id',
                    to: 'task.project_id'
                }
            }
        };
    }
}
exports.default = Project;
