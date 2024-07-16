import { getLanguage, defaultLanguage } from "./language.js";

const dict = {
  en: {
    "label.app_title": "Facturio",
    "label.total_cost": "Total Cost",
    "label.total_cost_placeholder": "Total monetary cost",
    "label.add_person": "Add Person",
    "label.add_person_placeholder": "Name to add",
    "label.add": "Add",
    "label.name": "Name",
    "label.split_percentage": "Split Percentage",
    "label.personal_expenses": "Personal Expenses",
    "label.paid": "Paid Total Cost ?",
    "label.result": "Result",
    "label.reset": "Reset",
    "label.calculate": "Calculate",
    "label.confirm_reset":
      "Do you really want to reset? All information will be lost",
    "error.name_required": "The name is required!",
    "error.name_unique": "The name must be unique!",
    "error.people_required":
      "At least two (2) people must be added in order to calculate the results!",
    "error.totalcost_minimum": "The total cost must be greater than zero (0)!",
    "error.totalcost_required": "The total cost is required!",
    "error.peoplepercentage_maximum":
      "The total percentage must not go over 100% !",
    "error.personalexpenses_maximum": "Personal expenses must be inferior to the total cost!",
  },
  fr: {
    "label.total_cost": "Coût total",
    "label.total_cost_placeholder": "Coût total en monnaie",
    "label.add_person": "Ajouter une personne",
    "label.add_person_placeholder": "Nom à ajouter",
    "label.add": "Ajouter",
    "label.name": "Nom",
    "label.split_percentage": "Pourcentage divisé",
    "label.personal_expenses": "Dépenses personelles",
    "label.paid": "A payé le coût total ?",
    "label.result": "Résultat",
    "label.reset": "Réinitialiser",
    "label.calculate": "Calculer",
    "label.confirm_reset":
      "Voulez-vous vraiment réinitialiser ? Toutes les informations seront perdues",
    "error.name_required": "Le nom est requis !",
    "error.name_unique": "Le nom doit être unique !",
    "error.people_required":
      "Au moins deux (2) personnes doivent être ajoutées afin de calculer les résultats !",
      "error.totalcost_minimum": "Le coût total doit être supérieur à zéro (0) !",
    "error.totalcost_required": "Le coût total est requis!",
    "error.personalexpenses_maximum": "Les dépenses personelles ne doivent pas dépenser le coût total !",
    "error.peoplepercentage_maximum":
      "Le pourcentage total ne doit pas dépasser 100% !",
  },
};

/**
 * Localize a resource with the specified key
 * @param {String} key The key to look up
 * @returns {String} The resulting string
 */
function localize(key) {
  let value = dict[getLanguage()][key];
  if (!value) {
    value = dict[defaultLanguage][key];
  }

  return value;
}

export default { localize };
export { localize };
