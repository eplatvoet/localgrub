$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const nameInput = $("input#name-input");
  const zipInput = $("input#zipcode-input")
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      name: nameInput.val().trim(),
      zipcode: zipInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.zipcode, userData.email, userData.password);
    nameInput.val("");
    zipInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, zipcode, email, password) {
    $.post("/api/signup", {
      name: name,
      zipcode: zipcode,
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleLoginErr(err) {
    var errString = JSON.stringify(err, null, 2);
    $("#alert .msg").text(errString);
    $("#alert").fadeIn(500);
  }
});
