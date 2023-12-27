// Init Github, UI
const github = new Github();
const ui = new UI();

// Search
const searchUser = document.getElementById("search-user");

searchUser.addEventListener("keyup", (e) => {
  const userText = e.target.value;

  if (userText !== "") {
    github.getUser(userText).then((data) => {
      if (data.profile.message === "Not Found") {
        // alert
        ui.showAlert("User not found", "alert alert-danger");
      } else {
        // profile
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    });
  } else {
    // Clear profile
    ui.clearProfile();
  }
});
