/**
 * @file The data model for Items of type Ability
 */
import OseTags from "../helpers-tags";

export default class OseDataModelAbility extends foundry.abstract.DataModel {
  static defineSchema() {
    const { StringField, NumberField, BooleanField, ArrayField, ObjectField } =
      foundry.data.fields;
    return {
      save: new StringField(),
      pattern: new StringField(),
      requirements: new StringField(),
      roll: new StringField(),
      rollType: new StringField(),
      rollTarget: new NumberField(),
      blindroll: new BooleanField(),
      description: new StringField(),
      tags: new ArrayField(new ObjectField()),
    };
  }

  get #rollTag() {
    if (!this.roll) return null;

    return {
      label: `${game.i18n.localize("OSE.items.Roll")} ${OseTags.rollTagFormula({
        actor: this.parent.actor,
        data: this._source,
      })}${OseTags.rollTagTarget({
        rollType: this.rollType,
        rollTarget: this.rollTarget,
      })
        }`,
    };
  }

  get #saveTag() {
    if (!this.save) return null;

    return {
      label: CONFIG.OSE.saves_long[this.save],
      icon: "fa-skull",
    };
  }

  get manualTags() {
    return this.tags || [];
  }

  get autoTags() {
    return [
      ...this.requirements.split(",").map((req) => ({ label: req.trim() })),
      this.#rollTag,
      this.#saveTag,
    ].filter((t) => !!t);
  }
}
