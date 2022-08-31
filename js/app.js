const loadPhone = (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhones(data.data, dataLimit));
};

const displayPhones = (phones, dataLimit) => {
  //   console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerText = "";

  //display 6 phones only
  const showAllBtn = document.getElementById("show-all");
  if (dataLimit && phones.length > 6) {
    phones = phones.slice(0, 6);
    showAllBtn.classList.remove("d-none");
  } else {
    showAllBtn.classList.add("d-none");
  }

  //display no phone message

  const noPhone = document.getElementById("no-phone-message");
  console.log(noPhone);
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
    loader(false);
  }

  //display all phones
  phones.forEach((phone) => {
    noPhone.classList.add("d-none");
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
              <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">
                   ${phone.brand}
                  </p>
                  <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                  

                </div>
              </div>

    `;
    phoneContainer.appendChild(phoneDiv);
    loader(false);
  });
};

const processSearch = (dataLimit) => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, dataLimit);
  loader(true);
};

//search button
document.getElementById("btn-search").addEventListener("click", () => {
  processSearch(6);
});

//enter key handler
document.getElementById("search-field").addEventListener("keypress", (e) => {
  // console.log(e.key)
  if (e.key === "Enter") {
    processSearch(6);
  }
});

const loader = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

//not the best way to show all

document.getElementById("btn-show-all").addEventListener("click", () => {
  processSearch();
  console.log("click");
});

//load phone details

const loadPhoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data.data));
};
