// CONTROLADOR

import {
  Dish,
  Category,
  Allergen,
  Menu,
  Restaurant,
  Coordinate,
} from "./Restaurant.js";

import RestaurantsManager from "./Restaurant.js";

// Creamos los Symbol que las usaremos como campos privados
const MODEL = Symbol("RestaurantModel");
const VIEW = Symbol("RestarantView");
const LOAD_RESTAURANT_OBJECTS = Symbol("Load Restaurant Objects");

class RestaurantController {
  constructor(model, view) {
    this[MODEL] = model; // Instancia de RestaurantManager
    this[VIEW] = view; // Instancia de RestaurantView

    this.onLoad(); // Se invocará cada vez que se inicia la página, por lo que meteremos en el método todo lo que queremos que se inicie
    this.onInit(); // El que ejecuta los métodos de la vista
    this.onAddCategory();
    this.onAddAllergen();
    this.onAddMenu();
    this.onAddRestaurant();

    this[VIEW].bindInit(this.handleInit); // El Onit de antes para cuando se reinicie, y aqui para cuando se le da
  }

  // Mediante un método de nombre de propiedad computado vamos a crear
  // Un método creado privado para instanciar los objetos
  [LOAD_RESTAURANT_OBJECTS]() {
    const nueces = this[MODEL].createDish("Nueces", "Nueces", ["Nueces"]);
    const boqueron = this[MODEL].createDish("Boqueron", "Boqueron con limon", [
      "Boqueron",
      "limon",
    ]);
    const sardinas = this[MODEL].createDish(
      "Sardinas",
      "Sardinas a la planca",
      ["Sardinas"]
    );
    const macarrones = this[MODEL].createDish(
      "Macarrones",
      "Macarrones con tomate",
      ["Macarrones", "Tomate"]
    );
    const ensalada = this[MODEL].createDish("Ensalada", "Ensalada alineada", [
      "Lechuga",
      "Tomate",
      "Aceite",
      "Vinagre",
    ]);
    const kebab = this[MODEL].createDish("Kebab", "Kebab Mixto", [
      "Pan de pita",
      "Carne de Pollo",
      "Ensalada",
      "Huevo",
    ]);

    const pizza = this[MODEL].createDish("Pizza", "Pizza barbacoa", [
      "Tomate",
      "Carne",
      "huevo",
      "queso",
    ]);
    const pizzaVegetariana = this[MODEL].createDish(
      "PizzaVegetariana",
      "Pizza vegetariana",
      ["Tomate", "Lechuga", "Cebolla", "Queso"]
    );

    const lionsRestaurant = this[MODEL].createRestaurant(
      "LionsRestaurant",
      "Restaurant / Bar",
      "New York"
    );
    const nachoRestaurant = this[MODEL].createRestaurant(
      "NachoRestaurant",
      "Restaurant",
      "Granada"
    );
    const ferniRestaurant = this[MODEL].createRestaurant(
      "FerniRestaurant",
      "Restaurant / Pub",
      "Ciudad Real"
    );

    const carne = this[MODEL].createCategory("carne", "Carne de vacuno");
    const pescado = this[MODEL].createCategory("pescado", "Pescado del mar");
    const verduras = this[MODEL].createCategory("verduras", "Verduras frescas");

    const alergiaHuevo = this[MODEL].createAllergen(
      "Huevo",
      "Alergia al Huevo"
    );
    const alergiaTomate = this[MODEL].createAllergen(
      "Tomate ",
      "Alergia al Tomate"
    );
    const alergiaPescado = this[MODEL].createAllergen(
      "Pescado",
      "Alergia al pescado"
    );
    const alergiaFrutosSecos = this[MODEL].createAllergen(
      "Frutos Secos",
      "Alergia a los frutos secos"
    );

    const menuCarne = this[MODEL].createMenu("Menu Carne", "Menu carnivoro");
    const menuVegetariano = this[MODEL].createMenu(
      "Menu Vegano",
      "Menu para vegetariano"
    );
    const menuDeLaCasa = this[MODEL].createMenu(
      "Menu de la casa",
      "Menu especial"
    );

    // Ahora añadimos las categorias y alergias a los platos, y los platos a los menus

    this[MODEL].assignCategoryToDish(kebab, carne, pescado);
    this[MODEL].assignCategoryToDish(ensalada, verduras, pescado);
    this[MODEL].assignCategoryToDish(boqueron, pescado);
    this[MODEL].assignCategoryToDish(macarrones, verduras, carne);
    this[MODEL].assignCategoryToDish(sardinas, pescado);
    this[MODEL].assignCategoryToDish(pizza, carne);
    this[MODEL].assignCategoryToDish(pizzaVegetariana, verduras);

    this[MODEL].assignAllergenToDish(nueces, alergiaFrutosSecos);
    this[MODEL].assignAllergenToDish(boqueron, alergiaPescado);
    this[MODEL].assignAllergenToDish(sardinas, alergiaPescado);
    this[MODEL].assignAllergenToDish(kebab, alergiaHuevo);
    this[MODEL].assignAllergenToDish(macarrones, alergiaTomate, alergiaHuevo);
    this[MODEL].assignAllergenToDish(pizza, alergiaTomate, alergiaHuevo);
    this[MODEL].assignAllergenToDish(ensalada, alergiaTomate, alergiaPescado);
    this[MODEL].assignAllergenToDish(
      pizzaVegetariana,
      alergiaTomate,
      alergiaHuevo
    );

    this[MODEL].assignDishToMenu(menuCarne, sardinas, boqueron, kebab);
    this[MODEL].assignDishToMenu(menuVegetariano, ensalada, macarrones, nueces);
    this[MODEL].assignDishToMenu(menuDeLaCasa, kebab, pizza, macarrones);
  }
  1;
  // Ahora creamos un método de aplicación que estará en el constructor, se invocará con cada recarga
  onLoad = () => {
    this[LOAD_RESTAURANT_OBJECTS]();
  };

  // Ejecutará los métodos de la Vista, se invocará con reinicio de la aplicación o con petición del usuario
  // Evento
  onInit = () => {
    this[VIEW].showCategoriesinMenu(this[MODEL].getterCategories()); // Mostrara las categorias en el menu del nav
    this[VIEW].showCategories(this[MODEL].getterCategories()); // Mostrará las imagenes al cargarse la página
    this[VIEW].RandomDishes(this[MODEL].getterDishes()); // Mostrará los platos random del menu
    this[VIEW].bindShowRandomDish(this.handleDishInformation);
    this[VIEW].showAllergensinMenu(this[MODEL].getterAllergens());
    this[VIEW].showMenusinMenu(this[MODEL].getterMenus());
    this[VIEW].showRestaurantsinMenu(this[MODEL].getterRestaurants());
  };

  // Se ejecuta cuando se pulse una categoria
  onAddCategory = () => {
    this[VIEW].bindCategoryDishesMenu(this.handleDishesCategoryMenu); // Muestra los platos de las categorias seleccionadas en el menu
    this[VIEW].bindCategoryDishes(this.handleDishesCategoryMenu); // Muestra los platos de las categorias seleccionadas en el menu
  };

  // Se ejecutará cuando se pulse un alérgeno
  onAddAllergen = () => {
    this[VIEW].bindAllergenDishesMenu(this.handleDishesAllergenMenu);
  };

  onAddMenu = () => {
    this[VIEW].bindMenuDishesMenu(this.handleDishesMenusMenu);
  };

  onAddRestaurant = () => {
    this[VIEW].bindRestaurantsDishesMenu(this.handleRestaurant);
  };
  // Manejador
  handleInit = () => {
    this.onInit();
  };

  // Manejador de dishes

  // Manejador para mostrar los platos de la categoria que has seleccionado
  handleDishesCategoryMenu = (categoryName) => {
    this[VIEW].dishh.replaceChildren();
    const category = this[MODEL].getCategory(categoryName);
    const dishes = this[MODEL].getDishesInCategory(category);
    this[VIEW].showDishes(dishes);

    // El metodo de mostrar platos estará disponible cuando se haya pulsado una categoria
    this[VIEW].bindShowDish(this.handleDishInformation); // Muestra los platos al seleccionar uno
  };

  handleDishesAllergenMenu = (AllergenName) => {
    this[VIEW].dishh.replaceChildren();
    // Sacamos la alergia
    console.log(AllergenName);
    const allergen = this[MODEL].getAllergen(AllergenName);
    // Sacamos todos los platos que tienen esa alergia
    const dishes = this[MODEL].getDishesWithAllergen(allergen);
    // Mostramos los platos
    this[VIEW].showDishes(dishes);

    this[VIEW].bindShowDish(this.handleDishInformation); // Muestra los platos al seleccionar uno
  };

  handleDishesMenusMenu = (menuName) => {
    // Sacamos la alergia
    console.log(menuName);
    this[VIEW].dishh.replaceChildren();
    const menu = this[MODEL].getMenu(menuName);
    // Sacamos todos los platos que tienen esa alergia
    const dishes = this[MODEL].getDishesInMenu(menu);
    // Mostramos los platos
    this[VIEW].showDishes(dishes);

    this[VIEW].bindShowDish(this.handleDishInformation); // Muestra los platos al seleccionar uno
  };

  handleRestaurant = (restaurantName) => {
    this[VIEW].dishh.replaceChildren();
    const restaurant = this[MODEL].getRestaurant(restaurantName);
    console.log("ajdhasuh");
    this[VIEW].showRestaurantInformation(restaurant);
  };

  // Manejador para enseñar la informacion de un plato
  handleDishInformation = (dishName) => {
    // Cogemos el plato
    console.log(dishName);
    const dish = this[MODEL].getDish(dishName);

    console.log("ES UNDEFINED??" + dish.name);
    this[VIEW].dishInformation(dish);
    this[VIEW].bindShowProductInNewWindow(this.handleShowProductInNewWindow);
  };

  // Handle que le pasaremos al método de capturar el botón con la información del plato
  handleShowProductInNewWindow = (dishName) => {
    const dish = this[MODEL].getDish(dishName);
    this[VIEW].showProductInNewWindow(dish);
    this[VIEW].closeWindow();
  };
}

export default RestaurantController;
