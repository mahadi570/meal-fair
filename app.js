
        const showIngredients = meal => {
            const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
            const ingridients = array.filter(number => {
                return meal[`strIngredient${number}`] !== "" && meal[`strIngredient${number}`] !== null;
            })
            const showComponents = `<img src="${meal['strMealThumb']}" alt="">
                        <h1>${meal['strMeal']}</h1>
                        <h3>Components</h3>
                        <ul></ul>`
            document.getElementById("ingridients").innerHTML = showComponents;
            // Display ingredients
            ingridients.forEach(number => {
                const ulElement = document.querySelector("#ingridients ul");
                const li = document.createElement("li");

                li.innerText = `${meal[`strMeasure${number}`]} ${meal[`strIngredient${number}`]}`
                ulElement.appendChild(li);
            })
        }
        const getComponents = (id) => {
            const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
            fetch(url).then(response => response.json()).then(data => {
                const [meal] = data.meals;
                showIngredients(meal)
            })
        }
        const displayMeal = (data) => {
            document.getElementById("wrong-search").style.display = "none";
            document.getElementById("ingridients").innerHTML = "";
            const mealContainer = document.getElementById("allMeal");
            mealContainer.innerHTML = "";
            document.getElementById("search").value = "";
            data.meals.forEach(meal => {
                const searchResult = `<div onclick="(getComponents('${meal.idMeal}'))" class="meal">
                                <img src="${meal.strMealThumb}">
                                <h3>${meal.strMeal}</h3>
                             </div>`
                mealContainer.insertAdjacentHTML("beforeend", searchResult)
            });
        }
        document.getElementById("search-button").addEventListener("click", function () {
            const searchValue = document.getElementById("search").value;
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
                .then(response => response.json())
                .then(data => {
                    displayMeal(data);
                })
                .catch(error => {
                    document.getElementById("wrong-search").style.display = "block";
                });
        });