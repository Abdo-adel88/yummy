










var toggle = document.querySelector(".difbut")
var toggleTow = document.querySelector("#clic")
var tog = document.querySelector(".any")
var togdf = document.querySelector(".slidd")







var head = document.getElementById("box");






if (localStorage.getItem("pages") != null) {
    let pagename = JSON.parse(localStorage.getItem("pages"))
    if (pagename == "idsearch") {
        displasearcch()
        localStorage.removeItem("pages")
    }
    if (pagename == "idcateg") {
        getCaategories()
        localStorage.removeItem("pages")
    }
    if (pagename == "idareaa") {
        gettareax()
        localStorage.removeItem("pages")
    }
    if (pagename == "iditeg") {
        gettiteg()
        localStorage.removeItem("pages")
    }


}
else {
    home()
}



let w = $("#sidebar").innerWidth();
let w1 = $('#sidebar > div').innerWidth();
$("#sidebar").css("left", -(w - w1));
$("#close").click(function () {
    $("#close").hide();
    $("#open").show();
    $("#sidebar").animate({ left: -(w - w1) }, 300, function () {
    });

});
$("#open").click(function () {
    $("#sidebar").css("z-index", 99999999);
    $("#open").hide();
    $("#close").show();
    $("#sidebar").animate({ left: 0 }, 300);
    $("li").css("top", "50%");
    $("li").eq(0).animate({ top: "0px" }, 400);
    $("li").eq(1).animate({ top: "0px" }, 500);
    $("li").eq(2).animate({ top: "0px" }, 600);
    $("li").eq(3).animate({ top: "0px" }, 700);
    $("li").eq(4).animate({ top: "0px" }, 800);
});





async function home() {
    $(".inner-loading-screen").fadeIn(300)


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
    response = await response.json()



    displayMeals(response.meals)
    $(".inner-loading-screen").fadeOut(500)
}



function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="lg:w-1/4   ">
        <div onclick="gettCategories(${arr[i].idMeal})" class="m-2 relative dola cursor-pointer dola:hover .btn-primary overflow-hidden">
            <div class="btn-primary d-flex align-items-center p-2">
            <h2 class=" mt-36 text-3xl">${arr[i].strMeal}</h2>
            </div>
            <img class="w-full h-80   rounded-xl " src="${arr[i].strMealThumb}" alt="">
        </div>
    </div>
        `
    }

    head.innerHTML = cartoona
}



async function gettCategories(a) {


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a}`)
    response = await response.json()


    displayCategories(response.meals)

}

function displayCategories(b) {
    let cartoona = "";

    let boxx = "";
    for (let i = 1; ; i++) {
        if (b[0][`strIngredient${i}`] == "") {
            break;
        } else {
            boxx += `
        <div class="h-6 ml-3  mt-4 p-6 flex items-center rounded-2xl bg-sky-300">
        <h5 >${b[0][`strMeasure${i}`]}${b[0][`strIngredient${i}`]}</h5>          
        </div>

        `
        }
    }


    if (b[0].strTags == null) {
        cc = "no tags"
    }
    else {
        var cc = b[0].strTags;
    }



    cartoona = `

        <div class="flex lg:flex-row flex-col  w-10/12">
        <div class=" lg:w-1/4 w-full">
            <img class="w-full h-96 rounded-2xl" src="${b[0].strMealThumb}" alt="">
            <h3 class="text-white text-5xl">${b[0].strMeal}</h3>
        </div>
        <div class="lg:w-3/4 w-full">
            <div class="ml-12 text-white">
                <h3 class="text-5xl "> Instructions</h3>
                <p class="mt-8 ">${b[0].strInstructions}</p>
                <h3 class="text-3xl mt-6">Area: <span class="text-3xl">${b[0].strArea} </span> </h3>
                <h3 class="text-3xl">Category: <span class="text-3xl">  ${b[0].strCategory}</span> </h3>
                <h3 class="text-3xl">categories: </h3><br />
                <div class="flex flex-wrap">

                    ${boxx}
                </div>
                <h3 class="text-3xl "> Tags :</h3>
                <div class="flex flex-wrap">
                    <div id="mealTag" class="h-6 ml-3 text-black mt-4 p-6 flex items-center rounded-2xl bg-red-300">
                         ${cc}
                    </div>

                </div>
                <div class="mt-10 ml-3 ">
                    <button class="btnn-success btnn-success:hover"> <a class="no-underline" href="${b[0].strSource}">Source</a></button>
                    <button class="btnn-danger btnn-danger:hover"> <a class="no-underline" href="${b[0].strYoutube}">youtube</a></button>
                </div>
            </div>
        </div>
    </div>
        `


    head.innerHTML = cartoona
}
// end indexxxxxxxxxxx





async function getCaategories() {
    $(".inner-loading-screen").fadeIn(500)

    let responsee = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    responsee = await responsee.json()

    displaycateg(responsee.categories)
    $(".inner-loading-screen").fadeOut(500)
}





// getCaategories()

function displaycateg(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {

        cartoona += `
        <div class="lg:w-1/4   ">
        <div onclick="gettCategoriesid('${arr[i].strCategory}')" class="m-2 relative dola cursor-pointer dola:hover .btn-primary overflow-hidden">
            <div class="btn-primary d-flex align-items-center p-2">
            <h2 class="text-center  mt-28 text-3xl">${arr[i].strCategory}</h2>
            <p class="text-center ">${arr[i].strCategoryDescription.slice(0, 100)}</p>
            </div>
            <img class="w-full h-80   rounded-xl " src="${arr[i].strCategoryThumb}" alt="">
        </div>
    </div>
        `
    }

    head.innerHTML = cartoona
}


async function gettCategoriesid(i) {
    $(".inner-loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${i}`)
    response = await response.json()


    displayMealls(response.meals.splice(0, 20))

    $(".inner-loading-screen").fadeOut(500)
}


function displayMealls(ar) {
    let cartoomna = "";

    for (let i = 0; i < ar.length; i++) {
        cartoomna += `
        <div class="lg:w-1/4   ">
        <div onclick="gettCategorriies(${ar[i].idMeal})" class="m-2 relative dola cursor-pointer dola:hover .btn-primary overflow-hidden">
            <div class="btn-primary d-flex align-items-center p-2">
            <h2 class=" mt-36 text-3xl">${ar[i].strMeal}</h2>
            </div>
            <img class="w-full h-80   rounded-xl " src="${ar[i].strMealThumb}" alt="">
        </div>
    </div>
        `
    }

    head.innerHTML = cartoomna
}

async function gettCategorriies(a) {
    $(".inner-loading-screen").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a}`)
    response = await response.json()


    displayCategoriies(response.meals)
    $(".inner-loading-screen").fadeOut(500)
}

function displayCategoriies(b) {
    let cartoona = "";



    let boxx = "";
    for (let i = 1; ; i++) {
        if (b[0][`strIngredient${i}`] == "") {
            break;
        } else {
            boxx += `
        <div class="h-6 ml-3  mt-4 p-6 flex items-center rounded-2xl bg-sky-300">
        <h5 >${b[0][`strMeasure${i}`]}${b[0][`strIngredient${i}`]}</h5>          
        </div>
        
        `
        }
    }


    if (b[0].strTags == null) {
        cc = "no tags"
    }
    else {
        var cc = b[0].strTags;
    }



    cartoona = `

        <div class="flex lg:flex-row flex-col  w-10/12">
        <div class=" lg:w-1/4 w-full">
            <img class="w-full h-96 rounded-2xl" src="${b[0].strMealThumb}" alt="">
            <h3 class="text-white text-5xl">${b[0].strMeal}</h3>
        </div>
        <div class="lg:w-3/4 w-full">
            <div class="ml-12 text-white">
                <h3 class="text-5xl "> Instructions</h3>
                <p class="mt-8 ">${b[0].strInstructions}</p>
                <h3 class="text-3xl mt-6">Area: <span class="text-3xl">${b[0].strArea} </span> </h3>
                <h3 class="text-3xl">Category: <span class="text-3xl">  ${b[0].strCategory}</span> </h3>
                <h3 class="text-3xl">categories: </h3><br />
                <div class="flex flex-wrap">

                    ${boxx}
                </div>
                <h3 class="text-3xl "> Tags :</h3>
                <div class="flex flex-wrap">
                    <div id="mealTag" class="h-6 ml-3 text-black mt-4 p-6 flex items-center rounded-2xl bg-red-300">
                         ${cc}
                    </div>

                </div>
                <div class="mt-10 ml-3 ">
                    <button class="btnn-success btnn-success:hover"> <a class="no-underline" href="${b[0].strSource}">Source</a></button>
                    <button class="btnn-danger btnn-danger:hover"> <a class="no-underline" href="${b[0].strYoutube}">youtube</a></button>
                </div>
            </div>
        </div>
    </div>
        `


    head.innerHTML = cartoona
}


///////////end categ



async function gettareax() {
    $(".inner-loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=`)
    response = await response.json()


    displayarea(response.meals)
    $(".inner-loading-screen").fadeOut(500)

}




function displayarea(ar) {
    let cartoomna = "";

    for (let i = 0; i < ar.length; i++) {
        cartoomna += `
        <div   class="w-1/4 mt-8 text-white">
        <div onclick="clickAreaApi('${ar[i].strArea}')" class="rounded-2xl text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop text-8xl"></i>
            <h3 class="mt-3 text-4xl text-">${ar[i].strArea}</h3>
        </div>
    </div>
        `
    }

    head.innerHTML = cartoomna
}


async function clickAreaApi(logarea) {
    $(".inner-loading-screen").fadeIn(500)
    let date = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${logarea}`)
    allget = await date.json()
    displaylocations(allget.meals)
    $(".inner-loading-screen").fadeOut(500)
}





function displaylocations(ar) {
    let cartoomna = "";

    for (let i = 0; i < ar.length; i++) {
        cartoomna += `
        <div class="lg:w-1/4   ">
        <div onclick="gettarrea(${ar[i].idMeal})" class="m-2 relative dola cursor-pointer dola:hover .btn-primary overflow-hidden">
            <div class="btn-primary d-flex align-items-center p-2">
            <h2 class=" mt-36 text-3xl">${ar[i].strMeal}</h2>
            </div>
            <img class="w-full h-80   rounded-xl " src="${ar[i].strMealThumb}" alt="">
        </div>
    </div>
        `
    }

    head.innerHTML = cartoomna
}



async function gettarrea(idd) {
    $(".inner-loading-screen").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idd}`)
    response = await response.json()


    displayareaaa(response.meals)
    $(".inner-loading-screen").fadeOut(500)
}

function displayareaaa(b) {
    let cartoona = "";



    let boxx = "";
    for (let i = 1; ; i++) {
        if (b[0][`strIngredient${i}`] == "") {
            break;
        } else {
            boxx += `
        <div class="h-6 ml-3  mt-4 p-6 flex items-center rounded-2xl bg-sky-300">
        <h5 >${b[0][`strMeasure${i}`]}${b[0][`strIngredient${i}`]}</h5>          
        </div>
        
        `
        }
    }


    if (b[0].strTags == null) {
        cc = "no tags"
    }
    else {
        var cc = b[0].strTags;
    }



    cartoona = `

    <div class="flex lg:flex-row flex-col  w-10/12">
    <div class=" lg:w-1/4 w-full">
        <img class="w-full h-96 rounded-2xl" src="${b[0].strMealThumb}" alt="">
        <h3 class="text-white text-5xl">${b[0].strMeal}</h3>
    </div>
    <div class="lg:w-3/4 w-full">
        <div class="ml-12 text-white">
            <h3 class="text-5xl "> Instructions</h3>
            <p class="mt-8 ">${b[0].strInstructions}</p>
            <h3 class="text-3xl mt-6">Area: <span class="text-3xl">${b[0].strArea} </span> </h3>
            <h3 class="text-3xl">Category: <span class="text-3xl">  ${b[0].strCategory}</span> </h3>
            <h3 class="text-3xl">categories: </h3><br />
            <div class="flex flex-wrap">

                ${boxx}
            </div>
            <h3 class="text-3xl "> Tags :</h3>
            <div class="flex flex-wrap">
                <div id="mealTag" class="h-6 ml-3 text-black mt-4 p-6 flex items-center rounded-2xl bg-red-300">
                     ${cc}
                </div>

            </div>
            <div class="mt-10 ml-3 ">
                <button class="btnn-success btnn-success:hover"> <a class="no-underline" href="${b[0].strSource}">Source</a></button>
                <button class="btnn-danger btnn-danger:hover"> <a class="no-underline" href="${b[0].strYoutube}">youtube</a></button>
            </div>
        </div>
    </div>
</div>
    `

    head.innerHTML = cartoona
}


// enddddd arrrreaaaa

async function gettiteg() {
    $(".inner-loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()

    displayintegg(response.meals)

    $(".inner-loading-screen").fadeOut(500)

}

function displayintegg(ar) {
    let cartoomna = "";

    for (let i = 0; i < 20; i++) {
        cartoomna += `
        <div  onclick=" gettingg('${ar[i].strIngredient}')"  class="w-1/4 mt-8 text-white">
        <div class="rounded-2xl text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite text-8xl"></i>
            <h3 class="mt-23 text-4xl text-">${ar[i].strIngredient.split(" ").slice(0, 1).join(" ")}</h3>
            <p class="line-clamp-3">${ar[i].strDescription}</p>
        </div>
    </div>
        `
    }

    head.innerHTML = cartoomna
}

async function gettingg(lo) {
    $(".inner-loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${lo}`)
    let responsee = await response.json()


    displayMeallsinteg(responsee.meals)
    $(".inner-loading-screen").fadeOut(500)
}



function displayMeallsinteg(ar) {
    let cartoomna = "";

    for (let i = 0; i < ar.length; i++) {
        cartoomna += `
        <div onclick="gettintegred(${ar[i].idMeal})" class="lg:w-1/4   ">
        <div  class="m-2 relative dola cursor-pointer dola:hover btn-primary overflow-hidden">
            <div class="btn-primary d-flex align-items-center p-2">
            <h2 class=" mt-36 text-3xl">${ar[i].strMeal}</h2>
            </div>
            <img class="w-full h-80   rounded-xl " src="${ar[i].strMealThumb}" alt="">
        </div>
    </div>
        `
    }

    head.innerHTML = cartoomna
}


async function gettintegred(a) {


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a}`)
    response = await response.json()


    displayCinteg(response.meals)

}

function displayCinteg(b) {
    let cartoona = "";



    let boxx = "";
    for (let i = 1; ; i++) {
        if (b[0][`strIngredient${i}`] == "") {
            break;
        } else {
            boxx += `
        <div class="h-6 ml-3  mt-4 p-6 flex items-center rounded-2xl bg-sky-300">
        <h5 >${b[0][`strMeasure${i}`]}${b[0][`strIngredient${i}`]}</h5>          
        </div>
        
        `
        }
    }


    if (b[0].strTags == null) {
        cc = "no tags"
    }
    else {
        var cc = b[0].strTags;
    }



    cartoona = `

    <div class="flex lg:flex-row flex-col  w-10/12">
    <div class=" lg:w-1/4 w-full">
        <img class="w-full h-96 rounded-2xl" src="${b[0].strMealThumb}" alt="">
        <h3 class="text-white text-5xl">${b[0].strMeal}</h3>
    </div>
    <div class="lg:w-3/4 w-full">
        <div class="ml-12 text-white">
            <h3 class="text-5xl "> Instructions</h3>
            <p class="mt-8 ">${b[0].strInstructions}</p>
            <h3 class="text-3xl mt-6">Area: <span class="text-3xl">${b[0].strArea} </span> </h3>
            <h3 class="text-3xl">Category: <span class="text-3xl">  ${b[0].strCategory}</span> </h3>
            <h3 class="text-3xl">categories: </h3><br />
            <div class="flex flex-wrap">

                ${boxx}
            </div>
            <h3 class="text-3xl "> Tags :</h3>
            <div class="flex flex-wrap">
                <div id="mealTag" class="h-6 ml-3 text-black mt-4 p-6 flex items-center rounded-2xl bg-red-300">
                     ${cc}
                </div>

            </div>
            <div class="mt-10 ml-3 ">
                <button class="btnn-success btnn-success:hover"> <a class="no-underline" href="${b[0].strSource}">Source</a></button>
                <button class="btnn-danger btnn-danger:hover"> <a class="no-underline" href="${b[0].strYoutube}">youtube</a></button>
            </div>
        </div>
    </div>
</div>
    `


    head.innerHTML = cartoona
}









async function gettnamemeals(lo) {
    $(".inner-loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${lo}`)
    let responsee = await response.json()



    if (responsee.meals != null) {
        displayseachname(responsee.meals)
    }
    $(".inner-loading-screen").fadeOut(500)

}



function displayseachname(ar) {
    let cartoomna = "";
    var headtwo = document.getElementById("boxsearch");


    for (let i = 0; i < ar.length; i++) {
        cartoomna += `
      <div class="lg:w-1/4   ">
      <div onclick="gettserchmealss(${ar[i].idMeal})" class="m-2 relative dola cursor-pointer dola:hover .btn-primary overflow-hidden">
          <div class="btn-primary d-flex align-items-center p-2">
          <h2 class=" mt-36 text-3xl">${ar[i].strMeal}</h2>
          </div>
          <img class="w-full h-80   rounded-xl " src="${ar[i].strMealThumb}" alt="">
      </div>
  </div>
      `
    }

    headtwo.innerHTML = cartoomna
}


async function gettserchmealss(a) {


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a}`)
    let responsee = await response.json()


    displaynamedetalis(responsee.meals)

}

function displaynamedetalis(b) {
    let cartoona = "";

    var headtwo = document.getElementById("boxsearch");

    let boxx = "";
    for (let i = 1; ; i++) {
        if (b[0][`strIngredient${i}`] == "") {
            break;
        } else {
            boxx += `
      <div class="h-6 ml-3  mt-4 p-6 flex items-center rounded-2xl bg-sky-300">
      <h5 >${b[0][`strMeasure${i}`]}${b[0][`strIngredient${i}`]}</h5>          
      </div>
      
      `
        }
    }


    if (b[0].strTags == null) {
        cc = "no tags"
    }
    else {
        var cc = b[0].strTags;
    }


    for (let i = 0; i < b.length; i++) {
        cartoona = `

        <div class="flex lg:flex-row flex-col  w-10/12">
        <div class=" lg:w-1/4 w-full">
            <img class="w-full h-96 rounded-2xl" src="${b[0].strMealThumb}" alt="">
            <h3 class="text-white text-5xl">${b[0].strMeal}</h3>
        </div>
        <div class="lg:w-3/4 w-full">
            <div class="ml-12 text-white">
                <h3 class="text-5xl "> Instructions</h3>
                <p class="mt-8 ">${b[0].strInstructions}</p>
                <h3 class="text-3xl mt-6">Area: <span class="text-3xl">${b[0].strArea} </span> </h3>
                <h3 class="text-3xl">Category: <span class="text-3xl">  ${b[0].strCategory}</span> </h3>
                <h3 class="text-3xl">categories: </h3><br />
                <div class="flex flex-wrap">

                    ${boxx}
                </div>
                <h3 class="text-3xl "> Tags :</h3>
                <div class="flex flex-wrap">
                    <div id="mealTag" class="h-6 ml-3 text-black mt-4 p-6 flex items-center rounded-2xl bg-red-300">
                         ${cc}
                    </div>

                </div>
                <div class="mt-10 ml-3 ">
                    <button class="btnn-success btnn-success:hover"> <a class="no-underline" href="${b[0].strSource}">Source</a></button>
                    <button class="btnn-danger btnn-danger:hover"> <a class="no-underline" href="${b[0].strYoutube}">youtube</a></button>
                </div>
            </div>
        </div>
    </div>
        `
    }

    headtwo.innerHTML = cartoona
}



// litttttter#####################

async function gettlittermeals(lo) {
    $(".inner-loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${lo}`)
    let responsee = await response.json()


    displayseachlitterr(responsee.meals)
    $(".inner-loading-screen").fadeOut(500)
}



function displayseachlitterr(ar) {
    let cartoomna = "";
    var headtwo = document.getElementById("boxsearch");
    for (let i = 0; i < ar.length; i++) {
        cartoomna += `
      <div class="lg:w-1/4   ">
      <div onclick="gettserchmealsslitter(${ar[i].idMeal})" class="m-2 relative dola cursor-pointer dola:hover .btn-primary overflow-hidden">
          <div class="btn-primary d-flex align-items-center p-2">
          <h2 class=" mt-36 text-3xl">${ar[i].strMeal}</h2>
          </div>
          <img class="w-full h-80   rounded-xl " src="${ar[i].strMealThumb}" alt="">
      </div>
  </div>
      `
    }

    headtwo.innerHTML = cartoomna
}


async function gettserchmealsslitter(a) {


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a}`)
    response = await response.json()


    displaylitterdetalis(response.meals)

}

function displaylitterdetalis(b) {
    let cartoona = "";

    var headtwo = document.getElementById("boxsearch");

    let boxx = "";
    for (let i = 1; ; i++) {
        if (b[0][`strIngredient${i}`] == "") {
            break;
        } else {
            boxx += `
      <div class="h-6 ml-3  mt-4 p-6 flex items-center rounded-2xl bg-sky-300">
      <h5 >${b[0][`strMeasure${i}`]}${b[0][`strIngredient${i}`]}</h5>          
      </div>
      
      `
        }
    }


    if (b[0].strTags == null) {
        cc = "no tags"
    }
    else {
        var cc = b[0].strTags;
    }


    for (let i = 0; i < b.length; i++) {
        cartoona = `

        <div class="flex lg:flex-row flex-col  w-10/12">
        <div class=" lg:w-1/4 w-full">
            <img class="w-full h-96 rounded-2xl" src="${b[0].strMealThumb}" alt="">
            <h3 class="text-white text-5xl">${b[0].strMeal}</h3>
        </div>
        <div class="lg:w-3/4 w-full">
            <div class="ml-12 text-white">
                <h3 class="text-5xl "> Instructions</h3>
                <p class="mt-8 ">${b[0].strInstructions}</p>
                <h3 class="text-3xl mt-6">Area: <span class="text-3xl">${b[0].strArea} </span> </h3>
                <h3 class="text-3xl">Category: <span class="text-3xl">  ${b[0].strCategory}</span> </h3>
                <h3 class="text-3xl">categories: </h3><br />
                <div class="flex flex-wrap">

                    ${boxx}
                </div>
                <h3 class="text-3xl "> Tags :</h3>
                <div class="flex flex-wrap">
                    <div id="mealTag" class="h-6 ml-3 text-black mt-4 p-6 flex items-center rounded-2xl bg-red-300">
                         ${cc}
                    </div>

                </div>
                <div class="mt-10 ml-3 ">
                    <button class="btnn-success btnn-success:hover"> <a class="no-underline" href="${b[0].strSource}">Source</a></button>
                    <button class="btnn-danger btnn-danger:hover"> <a class="no-underline" href="${b[0].strYoutube}">youtube</a></button>
                </div>
            </div>
        </div>
    </div>
        `
    }

    headtwo.innerHTML = cartoona
}









//                        ######catactus#########





function displasearcch() {
    let search = `
    <header>
        
            <div class="flex flex-row ml-4 items-center justify-center mx-auto lg:w-[1000px] lg:h-[80px] ">
                <label for="search-by-idd"></label>
                <input  onkeyup="gettnamemeals(this.value)" id="search-by-idd" class="w-9/12  lg:w-1/3 border-solid border-2 mt-4 ml-6 lg:mt-0  border-whit rounded-lg  h-10  bg-black p-2 text-white" type="text"
                    placeholder="search By Name">
                <label class="" for="search-by-litter"></label>
           
                <input onkeyup="gettlittermeals(this.value)" id="search-by-litter" maxlength="1" class="w-9/12 mt-4 lg:w-1/3 lg:mt-0 border-solid border-2  border-whit rounded-lg h-10  lg:ml-3 p-2 bg-black text-white"
                        type="text" placeholder="search By liter">
               
            </div>

            <div class="container  mx-auto  mt-10">
                <div id="boxsearch"
                    class=" lg:flex-row w-10/12 mx-auto flex-col flex-wrap flex items-center justify-center">

                </div>
            </div>
        
    </header>`;
    head.innerHTML = search;
}
