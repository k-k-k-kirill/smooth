import { Model } from 'objection'

export default class Project extends Model {
    static get tableName() {
        return 'project'
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
        }
    }

    static get relationMappings() {
        const Phase = require('./Phase')
        const Task = require('./Task')

        return {
            phases: {
                relation: Model.ManyToManyRelation,
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
                relation: Model.HasManyRelation,
                modelClass: Task,
                join: {
                  from: 'project.id',
                  to: 'task.project_id'
                }
            }
        }
    }
}