import { Model } from "objection";

export default class Question extends Model {
  static get tableName() {
    return "question";
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
        phase_id: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const Answer = require("./Answer");

    return {
      answers: {
        relation: Model.ManyToManyRelation,
        modelClass: Answer,
        join: {
          from: "question.id",
          through: {
            // project_template_question is the join table.
            from: "question_answer.project_template_id",
            to: "question_answer.question_id",
          },
          to: "answer.id",
        },
      },
    };
  }
}
