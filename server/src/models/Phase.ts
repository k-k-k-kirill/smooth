import { Model } from "objection";

export default class Phase extends Model {
  static get tableName() {
    return "phase";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    const Question = require("./Question");
    const Task = require("./Task");
    const TaskTemplate = require("./TaskTemplate");

    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: "phase.id",
          to: "task.phase_id",
        },
      },
      questions: {
        relation: Model.HasManyRelation,
        modelClass: Question,
        join: {
          from: "phase.id",
          to: "question.phase_id",
        },
      },
      task_templates: {
        relation: Model.HasManyRelation,
        modelClass: TaskTemplate,
        join: {
          from: "phase.id",
          to: "task_template.phase_id",
        },
      },
    };
  }
}
