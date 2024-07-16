import utils from "./utils.js";
import { localize } from "./dict.js";
import { getNextLanguage, setLanguage } from "./language.js";

const startConfetti = confetti.create($("#canvas")[0]);

let people = [];

updateText();

$("#btn-add-person").on("click", addPerson);
$("#btn-calculate").on("click", calculate);
$("#btn-reset").on("click", reset);
$("#btn-language").on("click", toggleLanguage);
$(document.body).on("change", ".split-percentage", percentageChanged);
$(document.body).on("change", ".personal-expenses", personalExpensesChanged);

function toggleLanguage() {
  setLanguage(getNextLanguage());
  updateText();
}

function updateText() {
  $("#btn-language").text(getNextLanguage().toUpperCase());
  $(".app-title").text(localize("label.app_title"));
  $("#total-cost-label").text(localize("label.total_cost"));
  $("#total-cost").prop(
    "placeholder",
    localize("label.total_cost_placeholder")
  );
  $("#new-name-label").text(localize("label.add_person"));
  $("#new-name").prop("placeholder", localize("label.add_person_placeholder"));
  $("#btn-add-person").text(localize("label.add"));
  $("#btn-reset").text(localize("label.reset"));
  $("#btn-calculate").text(localize("label.calculate"));
  $("#col-name").text(localize("label.name"));
  $("#col-percentage").text(localize("label.split_percentage"));
  $("#col-personal-expenses").text(localize("label.personal_expenses"));
  $("#col-result").text(localize("label.result"));
}

function calculate() {
  const totalCost = utils.toFloat($("#total-cost").val());

  if (totalCost === undefined || isNaN(totalCost)) {
    $("#total-cost-error").text(localize("error.totalcost_required"));
    return;
  } else if (totalCost <= 0) {
    $("#total-cost-error").text(localize("error.totalcost_minimum"));
    return;
  } else {
    $("#total-cost-error").text("");
  }
  if (people.length < 2) {
    $("#new-name-error").text(localize("error.people_required"));
    return;
  } else if (people.reduce((val, next) => val + next.percentage, 0) > 100) {
    $("#new-name-error").text(localize("error.peoplepercentage_maximum"));
    return;
  } else {
    $("#new-name-error").text("");
  }

  function celebrate() {
    startConfetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.6 },
    });

    setTimeout(() => myConfetti.reset(), 3000);
  }

  const totalPersonalExpenses = people.reduce(
    (val, next) => val + next.personalExpenses,
    0
  );

  if (totalPersonalExpenses > totalCost) {
    $("#total-cost-error").text(localize("error.personalexpenses_maximum"));
    return;
  } else {
    $("#total-cost-error").text("");
  }

  const sharedCost = totalCost - totalPersonalExpenses;

  people = people.map((p) => {
    p.result = (sharedCost * (p.percentage / 100) + p.personalExpenses).toFixed(
      2
    );
    return p;
  });

  updatePeople();

  celebrate();
}

function addPerson() {
  const name = $("#new-name").val().trim();

  if (utils.isNullOrWhiteSpace(name)) {
    $("#new-name-error").text(localize("error.name_required"));
    return;
  }

  if (
    utils.any(people.filter((p) => p.name.toLowerCase() == name.toLowerCase()))
  ) {
    $("#new-name-error").text(localize("error.name_unique"));
    return;
  }

  $("#new-name-error").text("");

  const person = {
    id: crypto.randomUUID(),
    name: name,
    percentage: 50,
    personalExpenses: 0,
    result: 0,
  };
  people = [...people, person];

  if (people.length > 2) {
    people = people.map((p) => {
      p.percentage = 100.0 / people.length;
      return p;
    });
  }

  $("#new-name").val(undefined);

  if ($("#table").hasClass("hidden")) {
    $("#table").removeClass("hidden");
  }

  if ($("#btn-calculate").hasClass("hidden")) {
    $("#btn-calculate").removeClass("hidden");
  }

  updatePeople();
}

function percentageChanged(e) {
  const id = $(e.target).closest(".person").attr("data-id");
  const value = utils.toFloat($(e.target).val());

  if (isNaN(value)) {
    $(e.target).val(0);
  }

  people = people.map((p) => {
    if (p.id == id) {
      p.percentage = value;
    }
    return p;
  });
}

function reset() {
  if (
    (people.length > 0 || $("#total-cost").val()) &&
    window.confirm("Do you really want to reset? All progress will be lost")
  ) {
    window.location.reload();
  }
}

function personalExpensesChanged(e) {
  const id = $(e.target).closest(".person").attr("data-id");
  const value = utils.toFloat($(e.target).val());

  if (isNaN(value)) {
    $(e.target).val(0);
  }

  people = people.map((p) => {
    if (p.id == id) {
      p.personalExpenses = value;
    }
    return p;
  });
}

function updatePeople() {
  $("#people-list").html("");
  people.forEach((person) => {
    $("#people-list").append(`
      <tr class="person" data-id="${person.id}">
          <td class="text-center">${person.name}</td>
          <td>
            <div class="d-flex">
              <input
                class="form-control split-percentage"
                type="number"
                value="${person.percentage}"
              />
              <span class="percentage-sign">%</span>
            </div>
          </td>
          <td>
            <div class="d-flex">
              <input
                class="form-control personal-expenses"
                type="number"
                value="${person.personalExpenses}"
              />
              <span class="dollar-sign">$</span>
            </div>
          </td>
          <td>
            <span class="result">${
              person.result == 0 ? "-" : person.result
            }</span>
            <span class="dollar-sign">$</span>
        </tr>
  `);
  });
}
