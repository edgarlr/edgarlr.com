(function () {
  function changeTheme() {
    document.documentElement.dataset.theme = localStorage.getItem("theme") ?? "auto";
  }
  changeTheme()
})