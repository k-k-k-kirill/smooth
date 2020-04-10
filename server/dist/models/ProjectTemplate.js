"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class ProjectTemplate extends objection_1.Model {
    static get tableName() {
        return 'project_template';
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
                user_id: { type: 'integer' }
            }
        };
    }
    static get relationMappings() {
        const Project = require('./Project');
        const Question = require('./Question');
        const Phase = require('./Question');
        return {
            projects: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Project,
                join: {
                    from: 'project_template.id',
                    to: 'project.template_id'
                }
            },
            questions: {
                relation: objection_1.Model.ManyToManyRelation,
                modelClass: Question,
                join: {
                    from: 'project_template.id',
                    through: {
                        // project_template_question is the join table.
                        from: 'project_template_question.project_template_id',
                        to: 'project_template_question.question_id'
                    },
                    to: 'question.id'
                }
            },
            phases: {
                relation: objection_1.Model.ManyToManyRelation,
                modelClass: Phase,
                join: {
                    from: 'project_template.id',
                    through: {
                        // project_template_question is the join table.
                        from: 'phase_project_template.project_template_id',
                        to: 'phase_project_template.phase_id'
                    },
                    to: 'phase.id'
                }
            }
        };
    }
}
exports.default = ProjectTemplate;
