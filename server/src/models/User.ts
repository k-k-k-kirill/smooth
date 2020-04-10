import { Model } from 'objection'
const Password = require('objection-password')()

export default class User extends Password(Model) {
    static get tableName() {
        return 'user'
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['first_name', 'last_name', 'username', 'email', 'password'],
            properties: {
                id: { type: 'integer' },
                first_name: { type: 'string', minLength: 1, maxLength: 255 },
                last_name: { type: 'string', minLength: 1, maxLength: 255 },
                username: { type: 'string',  minLength: 1, maxLength: 255  },
                password: { type: 'string',  minLength: 1, maxLength: 255  },
            }
        }
    }

    static get relationMappings() {
        const ProjectTemplate = require('./ProjectTemplate');
        const Project = require('./Project')

        return {
            project_templates: {
                relation: Model.HasManyRelation,
                modelClass: ProjectTemplate,
                join: {
                  from: 'user.id',
                  to: 'project_template.user_id'
                }
            },
            projects: {
                relation: Model.HasManyRelation,
                modelClass: Project,
                join: {
                  from: 'user.id',
                  to: 'project.user_id'
                }
            }
        }
    }
}