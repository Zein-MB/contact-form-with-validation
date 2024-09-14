let firstName = document.getElementById("firstName"),
  lastName = document.getElementById("lastName"),
  email = document.getElementById("email"),
  form = document.forms[0],
  query = document.querySelectorAll(".query input"),
  queryCont = document.querySelector(".query .mini-cont"),
  inputs = document.getElementsByClassName("empty_state"),
  termCont = document.querySelector(".terms div"),
  termInput = document.getElementById("term"),
  emptyError = document.querySelectorAll(".empty"),
  invalidError = document.querySelector("p.invalid"),
  successMsg = document.querySelector(".success_state");

// Getting empty inputs
const mainArr = Array.from(inputs);

const emptyVals = mainArr.filter((input) => {
  return input.value == "";
});

// Email pattern
let emailPattern = /(www.)?\w+(?!@)(\D)?\w+(\d+)?@gmail.com/gi;
let isValid = null;

console.log(emptyVals);

form.addEventListener("submit", (event) => {
  // Empty state for all text inputs
  emptyVals.forEach((val) => {
    if (val.value == "") {
      val.classList.add("empty_error");
      val.nextElementSibling.classList.add("active");
      event.preventDefault();
    }
  });

  // Invalid state for email input
  if (isValid === false) {
    event.preventDefault();
    toggleError(email)
  } else {
    toggleError(email)
  }

  // Radio buttons empty state
  if (!query[0].checked && !query[1].checked) {
    queryCont.nextElementSibling.classList.add("active");
    event.preventDefault();
  }

  // Term checkbox button empty state
  if (!termInput.checked) {
    termCont.nextElementSibling.classList.add("active");
  }

  if (!event.defaultPrevented) {
    event.preventDefault();
    successMsg.classList.add("visible");

    // Reset inputs

    resetVals();
  }

  if (successMsg.classList.contains("visible")) {
    setTimeout(() => {
      successMsg.classList.remove("visible");
    }, 2500);
  }
});

// Reset inputs
function resetVals() {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  document
    .querySelectorAll('input:not(input[type="text"])')
    .forEach((input) => {
      input.checked = false;
    });

  document.querySelector("textarea").value = "";

  window.scrollTo(0, 0)
}

// Toggle error function
function toggleError(input) {
  if (isValid === false) {
    input.classList.add('invalid_error');
    invalidError.classList.add('active');
  } else {
    input.classList.remove('invalid_error');
    invalidError.classList.remove('active');
  }
}

// Email on input
email.addEventListener("input", () => {
  if (emailPattern.test(email.value) === false) {
    isValid = false;
    toggleError(email);
  } else {
    isValid = true;
    toggleError(email)
  }
});

// Empty values on input
emptyVals.forEach((val) => {
  val.addEventListener("input", () => {
    if (
      val.nextElementSibling.classList.contains("active") &&
      val.value !== "" &&
      val.classList.contains("empty_error")
    ) {
      val.nextElementSibling.classList.remove("active");
      val.classList.remove("empty_error");
    }
  });
});

// Query on input
query.forEach((opt) => {
  opt.addEventListener("change", () => {
    if (
      queryCont.nextElementSibling.classList.contains("active") &&
      opt.checked
    ) {
      queryCont.nextElementSibling.classList.remove("active");
    }
  });
});

// Term on change
termInput.addEventListener("change", () => {
  if (
    termCont.nextElementSibling.classList.contains("active") &&
    termInput.checked
  ) {
    termCont.nextElementSibling.classList.remove("active");
  }
});
