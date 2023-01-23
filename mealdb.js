document.getElementById('loading').style.display = 'none';
let searchText = "chicken"

fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`)
    .then(res => res.json())
    .then(data => {
        const searchResult = document.getElementById('search-result');
        searchResult.classList.add('row-cols-md-3');
        if (data.meals.length > 6) {
            data.meals = data.meals.slice(0, 6);
            const showAll = document.getElementById('show-all');
            showAll.classList.remove('d-none');
        }
        data.meals.forEach(meal => {
            // console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 bg-secondary-subtle">
                <img src="${meal.strMealThumb}" class="card-img-top p-4" width="80" height="220" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                    <button onclick="loadMealDetails('${meal.idMeal}')" href="#" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#mealDetailModal">Show Details</button>
                </div>
            </div>
        `;
            searchResult.appendChild(div);
        })
    });

const searchFood = (dataLimit) => {
    const searchField = document.getElementById('search-field');
    if (searchField.value) searchText = searchField.value;
    console.log(searchText)

    document.getElementById('search-result').textContent = '';
    document.getElementById('loading').style.display = 'block';

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals, dataLimit));
}

const displaySearchResult = (meals, dataLimit) => {
    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML ='';
    // searchResult.textContent = '';
    document.getElementById('loading').style.display = 'none';

    const showAll = document.getElementById('show-all');
    if (dataLimit && meals.length > 6) {
        meals = meals.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    if (meals == null || searchText == '') {
        const div = document.createElement('div');
        searchResult.classList.remove('row-cols-md-3');
        div.innerHTML = `
        <h1>No content found matching your interest</h1>
        `
        searchResult.appendChild(div);
    }


    else {
        searchResult.classList.add('row-cols-md-3');
        meals.forEach(meal => {
            // console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 bg-secondary-subtle">
                    <img src="${meal.strMealThumb}" class="card-img-top p-4"  width="80" height="220"  alt="...">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                        <button onclick="loadMealDetails('${meal.idMeal}')" href="#" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#mealDetailModal">Show Details</button>
                    </div>
                </div>
            `;
            searchResult.appendChild(div);
        });
    }
    document.getElementById('search-field').value = '';
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    searchFood();
})


const loadMealDetails = async id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.meals[0]);
    displayMealDetails(data.meals[0])
}

const displayMealDetails = meal => {
    console.log(meal);
    const modalTitle = document.getElementById('mealDetailModalLabel');
    modalTitle.innerText = meal.strMeal;
    const mealDetails = document.getElementById('meal-details');
    // console.log();
    mealDetails.innerHTML = `
        <p><span class="fw-bold">Category:</span> ${meal.strCategory ? meal.strCategory : 'No Category Found'}</p>
        <p><span class="fw-bold">Special in:</span> ${meal.strArea ? meal.strArea : 'No Specified Region'}</p>
        <span class="fw-bold">Recipe link:</span> <a href=${meal.strYoutube}>${meal.strYoutube ? meal.strYoutube : 'No Recipe found'}</a>
    `
}

// console.log(`00${7+1+2}`)