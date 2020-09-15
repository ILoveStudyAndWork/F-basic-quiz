import "./style/index.scss";

const userDescription = document.getElementsByClassName("about-me-message")[0];
const introMessage = document.getElementsByClassName("intro-message")[0];
const avatarURl = document.getElementById("avatar");
const educationList = document.getElementById("edu-list");
const basicUrl = "http://localhost:8080/users/1";
const educationUrl = "http://localhost:8080/users/1/educations";

async function getBasicInfo() {
  const basicResponse = await fetch(basicUrl);
  const BasicData = await basicResponse.json();
  const { name, age, avatar, description } = BasicData;
  userDescription.textContent = description;
  introMessage.textContent = `MY NAME IS ${name}  ${age}YO AND THIS IS MY RESUME/CV`;
  avatarURl.src = avatar;
}

function createEducationItem(year, title, description) {
  const educationItem = document.createElement("section");
  educationItem.setAttribute("class", "edu-item");

  const yearDiv = document.createElement("div");
  yearDiv.setAttribute("class", "year");
  const eduDetail = document.createElement("article");
  eduDetail.setAttribute("class", "edu-detail");
  const eduTitle = document.createElement("p");
  const eduDesc = document.createElement("p");
  eduTitle.setAttribute("class", "edu-title");
  eduDesc.setAttribute("class", "edu-desc");
  yearDiv.textContent = year;
  eduTitle.textContent = title;
  eduDesc.textContent = description;
  educationItem.appendChild(yearDiv);
  eduDetail.appendChild(eduTitle);
  eduDetail.appendChild(eduDesc);
  educationItem.appendChild(eduDetail);
  educationList.appendChild(educationItem);
}

async function getEducation() {
  const educationResponse = await fetch(educationUrl);
  const education = await educationResponse.json();
  // eslint-disable-next-line array-callback-return
  education.map((item) => {
    const { year, title, description } = item;
    createEducationItem(year, title, description);
  });
}

getBasicInfo();
getEducation();
