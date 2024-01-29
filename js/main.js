


// <!-- =============start side Navbar Section======================== -->
let is_link = 'search';

let W_navTab = $('.nav-tab').outerWidth(true);

console.log(W_navTab)

let sidLeft = $('.side-nav-menu ').css("left")
console.log(sidLeft);
// 
function closeSideBar() {

  $('#open-icone-x').addClass('fa-align-justify')
  $('#open-icone-x').removeClass('fa-x')
  $('.side-nav-menu ').animate({ left: `-${W_navTab}px` }, 500)
  $('.links li').animate({ top: "500px" }, 500)
}

closeSideBar();

function opendSideBar() {

  $('#open-icone-x').removeClass('fa-align-justify')
  $('#open-icone-x').addClass('fa-x')

  $('.side-nav-menu').animate({ left: `0px` }, 500)
  for (let i = 0; i < 5; i++) {
    $('.links li').eq(i).animate({ top: "0px" }, 500 + (i * 50))
  }


  // $('.links li').eq(0).animate({top:"0px"},700)
  // $('.links li').eq(1).animate({top:"0px"},800)
  // $('.links li').eq(2).animate({top:"0px"},900)
  // $('.links li').eq(3).animate({top:"0px"},1000)
  // $('.links li').eq(4).animate({top:"0px"},1200)


}


$('#open-icone-x').click((e) => {
  if ($('.side-nav-menu ').css("left") == "0px") {
    closeSideBar()

  }
  else {

    opendSideBar()



  }


})
// <!-- =============End side Navbar Section =========================-->

// <!-- =============start  serch By Name Section======================== -->

//`https://www.themealdb.com/api/json/v1/1/search.php?s=`

async function serchByName(term) {
  $('.inner-loading-screen').fadeIn(500)
  let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)

  resp = await resp.json();
  let { meals } = resp;

  meals ? displyMeals(meals) : displyMeals([])
}

// serchByName("");
// strMealThumb
let x = []
// console.log(x.length);




//  <h3 class="p">${list.length == 25?strMeal:`${list.length==14?strCategory:strArea}`}</h3>
// <h3 class="p">${list.length == 25?strMeal:strCategory}</h3>

//======================= start display Category and Meals ========================

function displyMeals(list) {
  console.log(list);
  let str = ``
  for (let { strMealThumb, strMeal, strCategory, strCategoryThumb, strCategoryDescription, idMeal } of list) {
    str += `<section class="col-md-3 p-3">
 
  <div class="meal" onclick="getMealsDetails(${idMeal})"  id-m="${is_link == 'search' ? idMeal : ''}">
    
      <img src="${is_link == 'search' && list.length != 28 ? strMealThumb : strCategoryThumb}" class="w-100" alt="">
      <div class="meal-layer  d-flex justify-content-center flex-column  text-black text-capitalize">
      <h3 class="p">${is_link == 'search' ? strMeal : strCategory}</h3>
      
 <p>${is_link == 'Categories' ? strCategoryDescription.split(" ").slice(0, 10).join(" ") : ""}</p> 
      </div>
    </div>
  
</section>`
  }

  document.getElementById('is_meals').innerHTML = str;

  $('.inner-loading-screen').fadeOut(500)
}


// ======================= start display Category and Meals ========================




// <!-- =============End serch By Name  Section =========================-->


// <!-- =============Start serch By Categories  Section =========================-->


$('#is_categories').click((e) => {
  document.getElementById('myContact').innerHTML = ` `
  closeSideBar();
  console.log('Categories');
  is_link = 'Categories'
  getCategories()
})

async function getCategories() {
  $('.inner-loading-screen').fadeIn(500)
  document.getElementById('mysearch').innerHTML = ''
  let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  resp = await resp.json();
  let { categories } = resp
  // console.log(categories);
  displyMeals(categories)
}

// <!-- =============End serch By Categories  Section =========================-->


// <!-- =============start serch By Area  Section =========================-->
$('#is_area').click((e) => {
  document.getElementById('myContact').innerHTML = ` `
  closeSideBar();
  console.log('area');
  is_link = 'area'
  getArea();
})

async function getArea() {
  $('.inner-loading-screen').fadeIn(500)
  document.getElementById('mysearch').innerHTML = ''
  console.log("area");
  let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  resp = await resp.json();
  console.log(resp);
  let { meals } = resp
  console.log(meals);
  displyMealsArea(meals)
  $('.inner-loading-screen').fadeOut(500)
}



// <!-- =============End serch By Area  Section =========================-->

















// <!-- =============start is_ingredient   Section =========================-->
$('#is_ingredient').click((e) => {
  document.getElementById('myContact').innerHTML = ` `
  closeSideBar();
  is_link = 'ingrad'
  getIngredient()
})

async function getIngredient() {
  $('.inner-loading-screen').fadeIn(500)
  document.getElementById('mysearch').innerHTML = ''
  console.log("is_ingredient");
  let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  resp = await resp.json();
  console.log(resp);
  let { meals } = resp
  console.log(meals);
  displyMealsArea(meals)
  // $('.inner-loading-screen').fadeOut(500)
}



// <!-- =============End serch is_ingredient  Section =========================-->




// <!-- =============Start display Area & gridainet  Section =========================-->


let iconArea = '<i class="fa-solid fa-house-laptop fa-4x"></i>'
let iconIngrdaint = `<i class="fa-solid fa-drumstick-bite fa-4x"></i>`


function displyMealsArea(list) {
  console.log(list);
  let str = ``
  for (let { strArea, strIngredient, strDescription } of list) {
    str += `<section class="col-md-3 p-3">
       
        <div class="meal-A">
      

          <div class="text-center text-white d-flex justify-content-center flex-column align-items-center text-black text-capitalize">
          <span>${list.length == 28 ? iconArea : iconIngrdaint}</span>
          <h3 class="p  text-left">${list.length == 28 ? strArea : strIngredient.split(" ").slice(0, 1)}</h3>
          <p>${list.length != 28 ? strDescription?.split(" ").slice(0, 50).join(" ") : " "}</p>
            </div>
          </div>
          
      </section>`
  }
  document.getElementById('is_meals').innerHTML = str;

  $('.inner-loading-screen').fadeOut(500)
}


// <!-- =============End display  Area & gridainet   Section =========================-->



// =============start get DetailesMealis by ID===================
async function getMealsDetails(mealId) {
  document.getElementById('mysearch').innerHTML = ''
  if (mealId != null) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    resp = await resp.json();
    let { meals } = resp;
    console.log(mealId);
    console.log(meals[0]);

    displayMealesDetails(meals[0])
  }

}
// =============End get DetailesMealis by ID===================




// <!-- =============Start display MealisDetails  Section =========================-->
// strMeal,strMealThumb,strInstructions,strArea,strCategory

function displayMealesDetails(meal) {
  // console.log(meal);
  closeSideBar();
  let tages = meal.strTags?.split(",");
  if (!tages) {
    tages = []
  }
  let tagstr = ``;
  for (const elem of tages) {
    tagstr += `<li class="alert alert-danger m-2 p-1">${elem}</li>`
  }
  let Ingredient = ``;
  for (let i = 0; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      Ingredient += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]}${meal[`strIngredient${i}`]}</li>`
      // Ingredient.push(meal[`strIngredient${i}`])
    }
  }
  console.log(Ingredient);
  let { strMeal, strMealThumb, strInstructions, strArea, strCategory, strYoutube, strSource } = meal
  let str = `<div class="col-md-4">
  <img class="rounded-3 w-100" src="${strMealThumb}" alt="detais">
  <h2>${strMeal}</h2>

</div>
<section class="col-md-8">
<h2>Instructions</h2>
<p>${strInstructions}</p>

<h3><span class="fw-bolder">Area : </span>${strArea}</h3>
<h3><span class="fw-bolder">Category : </span>${strCategory}</h3>

<ul class="list-unstyled d-flex g-3 flex-wrap">
${Ingredient}
</ul>
<h3>Tags :</h3>
<ul class="list-unstyled d-flex g-3 flex-wrap">
      
${tagstr}
</ul>
<a target="_blank" href="${strSource}" class="btn btn-success">Source</a>
<a target="_blank" href="${strYoutube}" class="btn btn-danger">Youtube</a>
</section>`



  document.getElementById('is_meals').innerHTML = str;
  $('.inner-loading-screen').fadeOut(500)

}

// <!-- =============End display MealisDetails  Section =========================-->


// ------------------Start search bg  ---------------------------



// ------------------Start search ---------------------------

// ----serach by name and First letter

$('#is_search').click(function (e) {
  closeSideBar();
  is_link = 'search';
  document.getElementById('is_meals').innerHTML = '';





  document.getElementById('mysearch').innerHTML = `<section class="container w-75 serch my-5">
  <section class="row text-white">
<div class="col-md-6 ">
      <input id="searchName" type="text" class="w-100 text-white form-control bg-transparent" placeholder="Serch by Name">

      </div>
      <div class="col-md-6 ">
          <input id="searchLetter" type="text" class="text-white
           w-100 form-control bg-transparent" 
           placeholder="Serch by First Letter">

      </div>
  </section>
</section>`
  $('#searchLetter').keyup(function (e) {
    is_link = 'search';
    console.log(e.target.value);
    searchByLetter(e.target.value);


  })
  console.log($('#searchName'));
  $('#searchName').keyup(function (e) {
    is_link = 'search';
    console.log(e.target.value);
    serchByName(e.target.value)
  })



  // $('#searchLetter').keyup(function(e){
  //   is_link='search';
  //   console.log(e.target.value);
  //   searchByLetter(e.target.value);


  // })

})

async function searchByLetter(term) {
  $('.inner-loading-screen').fadeIn(500)
  term = " " ? term = 'a' : '';
  let api = `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  console.log(api);
  let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)

  resp = await resp.json();
  let { meals } = resp;

  meals ? displyMeals(meals) : displyMeals([])
}
// -------------------start contact us---------------------------------



$(document).ready(function () {
  serchByName("").then(() => {
    $('.loading-screen').fadeOut(500)
    $('body').css({ overflowY: 'visible' })
    $('.inner-loading-screen').fadeOut(500)
  })

})



// <!-- ------------------End loading screen-------------------- -->


$('#is_contact').click((e) => {
  closeSideBar();
  console.log('is_contact');
  document.getElementById('is_meals').innerHTML = " "
  document.getElementById('myContact').innerHTML = `
<div class="min-vh-100 d-center flex-column h-50 cot  w-75 container" 
 id="contact" >
<section class="row w-75 gy-4 d-center" >

    <section class=" contact col-md-8  w-100 justify-content-between  
    text-center flex-column ">
      
      <div class="container ">
      <section class="row gy-4 w-100 d-center ">
      <div class="col-md-6">
      <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
      <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
          Special characters and numbers not allowed
      </div>
  </div>
  

  <div class="col-md-6">
  <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
  <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
      Email not valid *exemple@yyy.zzz
  </div>
</div>

<div class="col-md-6">
<input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
<div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid Phone Number
</div>
</div>
<div class="col-md-6">
<input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
<div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid age from {10:80}
</div>
</div>

<div class="col-md-6">
<input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
<div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid password *Minimum eight characters, at least one letter and one number:*
</div>
</div>
<div class="col-md-6">
<input  id="repasswordInput" onkeyup="" type="password" class="form-control " placeholder="Repassword">
<div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid repassword 
</div>
  </div>
      </section>
    </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
   


  
  </section> 


</section>

</div>`
submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })

})



submitBtn = document.getElementById("submitBtn")




let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;


function inputsValidation() {

  console.log("vvvvvvvvv");
  if (nameInputTouched) {
    if (nameValidation()) {
      document.getElementById("nameAlert").classList.replace("d-block", "d-none");
 
     
    } else {
      document.getElementById("nameAlert").classList.replace("d-none", "d-block");
 
     
    }
  }
  if (emailInputTouched) {

    if (emailValidation()) {
      document.getElementById("emailAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("emailAlert").classList.replace("d-none", "d-block")

    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document.getElementById("ageAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("ageAlert").classList.replace("d-none", "d-block")

    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

    }
  }


  if (nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
  } else {
    submitBtn.setAttribute("disabled", true)
  }
}

function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
  // return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
return (/^0[125][0-9]{9}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
  // return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
  return (/^([1-7][0-9]|80)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}