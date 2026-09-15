/*  =====================
  Footer
  ====================== */
// creates footer, adds styling, appends new styling to bottom of page
const createFooter = document.createElement("footer")
createFooter.style.backgroundColor = "transparent"
createFooter.style.textAlign = "center"
document.body.appendChild(createFooter)

// assigns date function to variable today, then assigning getYear (current year)
// to varible thisYear
const today = new Date()
const thisYear = today.getFullYear()

const footer = document.querySelector("footer")
// creates paragraph element, adds copyright symbol,
// my name, and assigned current year as text to paragraph element,
// and appends text to created footer
const copyright = document.createElement("p")
copyright.textContent = `\u00A9 Maria Fernanda Arredondo Garcia ${thisYear}`
footer.appendChild(copyright)

/*  =====================
  List of Skills section
  ====================== */
// list of skills array
const skills = [
  "Krita",
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Adobe Indesign",
  "Maya",
  "JavaScript",
  "CSS",
  "HTML",
]
// query selects Skills section id and ul element inside
const skillsSection = document.querySelector("#Skills")
const skillsList = skillsSection.querySelector("ul")

// iterates through items in Skills array one at a time,
// each time creating li element, adding array item as text in created list,
// and appending it to Skills section
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li")
  skill.innerText = skills[i]
  skillsList.appendChild(skill)
}

/*  ===================== 
  Message Form Submit
  ====================== */
// creates message form, named "leave_message"
const messageForm = document.querySelector('form[name="leave_message"]')
// assigns "submit" action from addEventListener function to created message form
messageForm.addEventListener("submit", function (event) {
  // prevents page from refreshing
  event.preventDefault()
  // creates variables, individually assigning entered name, email,
  // and message typed into message form
  const uName = event.target.usersName.value
  const uEmail = event.target.usersEmail.value
  const uMessage = event.target.usersMessage.value
  // logs submitted info into console
  console.log(uName, uEmail, uMessage)

  // query selects message section id and ul element inside
  const messageSection = document.querySelector("#messages")
  const messageList = messageSection.querySelector("ul")
  // creates new list element
  const newMessage = document.createElement("li")

  // adds new html anchor tag, assigning email as clickable link,
  // name and message as text
  newMessage.innerHTML = `<a href="mailto:${uEmail}">${uName}</a> <span><br/>${uMessage}</span>`

  // creates new button, adds "remove" text inside button,
  // and keeps track of kind of object variable is
  const removeButton = document.createElement("button")
  removeButton.innerText = "remove"
  removeButton.type = "button"

  // assigns "click" action from addEventListener to created button,
  // assigns new variable to parent of said button,
  // and assigns remove to object when button is clicked
  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode
    entry.remove()
  })

  // from first addEventListener, once form triggers "submit" action,
  //appends a "remove" button and new message as list element to Message section beneath
  newMessage.appendChild(removeButton)
  messageList.appendChild(newMessage)
  // clears message form, ready for new inputs
  messageForm.reset()
})

/*  =====================
  Fetch Request to Github
  ====================== */
// sends request to github for specific users repository info,
// using GET, default method for fetch request
fetch("https://api.github.com/users/mariafarr002/repos")
  // returns reponse of JSON data and running an if statement to check if request was successful or not
  // if not, throws error message with "Request failed" followed by error occurred
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed" + response.status)
    }
    return response.json()
  })
  // parses through response JSON and assigns data to variable, logging the value from API fetch into console
  .then((data) => {
    const repositories = data
    console.log("repositories:", repositories)
    // query selects Projects section and ul element inside section
    const projectSection = document.querySelector("#Projects")
    const projectList = projectSection.querySelector("ul")
    // iterates through repo data array, going through data
    // and adding text of name of repo, appending it list inside Projects section
    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement("li")
      project.innerText = repositories[i].name
      projectList.appendChild(project)
    }
  })
  // catch function handles any errors from server of api fetch request
  // gives user a warning why section may be empty
  .catch((error) => {
    console.error("Something went wrong...:", error)
  })
