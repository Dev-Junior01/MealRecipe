const closeBtn = document.querySelector('.close-btn');
const ShowInfo = document.querySelector('.Info .instruction');
const result = document.querySelector('.results');
const searchBtn = document.querySelector('.search-box i');
searchBtn.addEventListener('click',GetMeals);
result.addEventListener('click',GetMealRecipe);
closeBtn.addEventListener('click',()=>{
    closeBtn.parentElement.style.display = 'none';
})
function GetMeals(){
    let searchTxt = document.querySelector('.search-box input').value.trim();
    if(searchTxt!=''){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTxt}`)
    .then(response => response.json())
    .then(data =>{
        let html="";
        if(data.meals){
            data.meals.forEach(meal => {
                html +=`
                <div class="result-box" data-id="${meal.idMeal}">
                    <div class="img-recipe">
                        <img src="${meal.strMealThumb}" alt="Food">
                    </div>
                    <div class="details">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>
                `;
            });
        }else{
            html = "Sorry We don't find any meal";
        }
        result.innerHTML = html;
    })
    }else{
            html = "Please check the entry";
            result.innerHTML = html;
    }
    
}
function GetMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response=> response.json())
        .then(data =>mealRecipeBox(data))
    }
}
function mealRecipeBox(recipe){
    recipe = recipe.meals[0];
    let html = `
<h2>${recipe.strMeal}</h2>
<p>${recipe.strCategory}</p>
<div class="instruction">
    <h3>instruction</h3>
    <p>${recipe.strInstructions}</p>
</div>
<div class="recipe-meal-img">
    <img src="${recipe.strMealThumb}" alt="">
</div>
<div class="recipe-link">
        <a href="${recipe.strYoutube}">Watch Video</a>
</div>
    `;
    ShowInfo.innerHTML = html;
    ShowInfo.parentElement.style.display = "block";
}
