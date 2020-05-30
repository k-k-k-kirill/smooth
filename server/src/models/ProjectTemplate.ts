import { Model } from "objection";

export default class ProjectTemplate extends Model {
  static get tableName() {
    return "project_template";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "user_id"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        user_id: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const Project = require("./Project");
    const Question = require("./Question");
    const Phase = require("./Question");

    return {
      projects: {
        relation: Model.HasManyRelation,
        modelClass: Project,
        join: {
          from: "project_template.id",
          to: "project.template_id",
        },
      },
      questions: {
        relation: Model.ManyToManyRelation,
        modelClass: Question,
        join: {
          from: "project_template.id",
          through: {
            // project_template_question is the join table.
            from: "project_template_question.project_template_id",
            to: "project_template_question.question_id",
          },
          to: "question.id",
        },
      },
      phases: {
        relation: Model.ManyToManyRelation,
        modelClass: Phase,
        join: {
          from: "project_template.id",
          through: {
            // project_template_question is the join table.
            from: "phase_project_template.project_template_id",
            to: "phase_project_template.phase_id",
          },
          to: "phase.id",
        },
      },
    };
  }
}
