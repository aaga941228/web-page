const coursesContainer = document.querySelector("#courses-container");
const moreCoursesButton = document.querySelector("#more-courses");

function renderCourses(amount, list) {
  let index = 0;
  let items = amount;
  const coursesList = list;
  return function () {
    if (items >= coursesList.length) {
      items = coursesList.length;
      moreCoursesButton.classList.add("disabled");
      moreCoursesButton.textContent = "No more courses";
    }
    for (let i = index; i < items; i++) {
      const course = new Course(coursesList[i].name, coursesList[i].filename);
      course.render(coursesContainer);
    }
    index += amount;
    items += amount;
  };
}

const renderSixCourses = renderCourses(6, coursesList);
renderSixCourses();

moreCoursesButton.addEventListener("click", function (e) {
  e.preventDefault();
  renderSixCourses();
});

window.onscroll = function () {
  if (document.documentElement.scrollTop > 100) {
    document.querySelector(".go-top-container").classList.add("show");
  } else {
    document.querySelector(".go-top-container").classList.remove("show");
  }
};

document
  .querySelector(".go-top-container")
  .addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
