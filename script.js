$(function () {
  var pet_info = {
    name: "Benji",
    weight: 18,
    happiness: 14
  };

  var petComments = {
    treat: ["finally, the good stuff", "one more. please. i insist.", "cookie acquired!"],
    play: ["okay that was actually fun", "throw it again!", "i definitely let you win"],
    exercise: ["was cardio really necessary?", "my tiny legs are tired", "i deserve a snack now"],
    nap: ["five more minutes...", "professional napper at work", "zzz... probably dreaming of treats"]
  };

  function randomComment(action) {
    var choices = petComments[action];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function changePet(weightChange, happinessChange, action) {
    pet_info.weight += weightChange;
    pet_info.happiness += happinessChange;
    checkPetInfo();
    updatePetInfo();
    updatePetPhoto(action);
    $(".speech").text(randomComment(action));
  }

  function updatePetPhoto(action) {
    var isNapping = action === "nap";
    var petImage = document.querySelector(".pet-image");

    petImage.src = isNapping ? "images/benji nap.jpg" : "images/benji awake.jpg";
    petImage.alt = isNapping ? "Benji relaxing on the couch" : "Benji standing and looking at the camera";
    $(".pet-status").text(isNapping ? "Asleep" : "Awake");
  }

  function checkPetInfo() {
    if (pet_info.weight < 0) {
      pet_info.weight = 0;
    }

    if (pet_info.happiness < 0) {
      pet_info.happiness = 0;
    }
  }

  function updatePetInfo() {
    $(".name").text(pet_info.name);
    $(".weight").text(pet_info.weight);
    $(".happiness").text(pet_info.happiness);

    // .each() goes through both stat meters, so this same chunk updates weight and happiness without copying it twice.
    $(".stat-row").each(function () {
      var statName = this.dataset.stat;
      var statValue = pet_info[statName];
      var percent = Math.min((statValue / 30) * 100, 100);
      var color = statName === "weight" ? "#ff8552" : "#7566df";

      // .css() changes the little meter's width and color on the page whenever Benji's stats change.
      $(this.querySelector(".meter-fill")).css({
        width: percent + "%",
        backgroundColor: color
      });
    });
  }

  $(".treat-button").click(function () {
    changePet(2, 3, "treat");
  });

  $(".play-button").click(function () {
    changePet(-1, 4, "play");
  });

  $(".exercise-button").click(function () {
    changePet(-2, -2, "exercise");
  });

  $(".nap-button").click(function () {
    changePet(0, 2, "nap");
  });

  updatePetInfo();
});
