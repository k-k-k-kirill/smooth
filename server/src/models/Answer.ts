import { Model } from 'objection'

export default class Answer extends Model {
    static get tableName() {
        return 'answer'
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
                title: { type: 'string', minLength: 1, maxLength: 255 }
            }
        }
    }

    static get relationMappings() {
        const TaskTemplate = require('./TaskTemplate')

        return {
            task_templates: {
                relation: Model.HasManyRelation,
                modelClass: TaskTemplate,
                join: {
                  from: 'answer.id',
                  to: 'task_template.phase_id'
                }
            }
        }
    }
}