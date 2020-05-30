import { Model } from "objection";

export default class TaskTemplate extends Model {
  static get tableName() {
    return "task_template";
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
        answer_id: { type: "integer" },
        phase_id: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const Task = require("./Task");

    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: "task_template.id",
          to: "task.task_template_id",
        },
      },
    };
  }
}
