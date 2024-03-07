// VISTA

import {
  newDishValidation,
  assignValidationForm,
  desAssignValidationForm,
} from "./validation.js";
// Definimos Symbol para implementar el método
const EXCECUTE_HANDLER = Symbol("excecuteHandler");

// Creamos la clase, declaramos las propiedades que vamos a utilizar más habitualmente
class RestaurantView {
  constructor() {
    this.main = document.getElementById("main");
    this.dishh = document.getElementById("dish");
    this.menu = document.querySelector(".lista.nav__lista"); // Menu de navegacion
    this.categories = document.getElementById("categories");
    this.preMain = document.getElementById("platosRandom");
    this.contador = 0; // Contador para el nombre al abrir una nueva ventana
    this.ventanas = []; // Array donde almacenamos las ventanas abiertas

    // Aqui guardaremos la referencia de la nueva ventana
    this.dishWindow = null;
  }

  [EXCECUTE_HANDLER](
    handler, // Función de manejo que se ejecutará
    handlerArguments, // Argumentos que se pasarán a la función de manejo
    scrollElement, // Elemento en la página hacia el cual se realizará un desplazamiento
    data, // Datos asociados con la entrada del historial
    url, // URL que se asocia con la entrada del historial
    event // Objeto de evento asociado con la acción
  ) {
    // Ejecuta la función de manejo con los argumentos proporcionados
    handler(...handlerArguments);

    // Busca el elemento en la página hacia el cual se realizará un desplazamiento
    const scroll = document.querySelector(scrollElement);

    // Log para depuración, imprime el elemento encontrado
    console.log(scroll);

    // Si se encuentra el elemento, realiza un desplazamiento suave hacia él
    if (scroll) {
      scroll.scrollIntoView();
    }
    // Agrega una nueva entrada al historial del navegador
    history.pushState(data, null, url);

    // Evita la acción predeterminada del evento (p. ej., la navegación normal de la página)
    event.preventDefault();
  }

  // Método para cada vez que se le de al inicio o al logo, se invoqué el método pasado por parmetro
  // prettier-ignore
  bindInit(handler) {
    document.getElementById('init').addEventListener('click', (event) => {
    this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#',
    event);
    });
    document.getElementById('logo__image').addEventListener('click', (event) => {
    this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#',
    event);
    });
    }

  // Iteramos sobre las categorias y las mostramos al inicio
  showCategories(categories) {
    this.categories.replaceChildren();
    // Si hay mas de un elemento hijo elimina el 2
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();
    // Creamos el div que será dodne iteraremos con las categorias
    const container = document.createElement("div");
    container.id = "category-list";
    container.classList.add("row");

    for (const category of categories) {
      // Vamos insertando las categorias al final
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="category-item"> ><a data-category="${
          category.name
        }" href="#product-list">
      <div><img class="category-image" alt="${category.name}" 
      src="${
        "./Multimedia/" + category.name + ".jpg"
      }" style="max-width: 100%; max-height: 550px;"/>
      </div>
      <div>
      <h3>${category.name}</h3>
      <div>${category.description}</div>
      </div>
      </a>
      </div>`
      );
    }
    this.categories.append(container);
  }

  showCategoriesinMenu(categories) {
    // Creamos el elemento li, que es el que añadiremos al final de la lista
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown"); // Esta clasde de bootstrap conseguira que sea un menu despegable
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" 
      href="#product-list" id="navCats" role="button"
      data-bs-toggle="dropdown" aria-expanded="false">Categorías</a>`
    );
    // Creamos la lista ordenada que irá dentro del elemento li del menu
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    container.id = "lista__categorias";

    // Iteramos sobre las categorias para obtener la informacion que ira en la lista
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.name}"
         class="dropdown-item" href="#product-list">${category.name}</a></li>`
      );
    }
    // Al elemento li que irá en el menu le añadimos las categorias que acabamos de crear
    li.append(container);
    // Y al menu de navegacion le añadimos li que es donde hemos metido todo
    this.menu.append(li);
  }

  // Mostrar alergenos en el menu
  showAllergensinMenu(allergens) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown"); // Esta clasde de bootstrap conseguira que sea un menu despegable
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" 
      href="#" id="navAllerg" role="button"
      data-bs-toggle="dropdown" aria-expanded="false">Alergias</a>`
    );
    // Creamos la lista ordenada que irá dentro del elemento li del menu
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    container.id = "lista__allergenens";

    // Iteramos sobre las categorias para obtener la informacion que ira en la lista
    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-allergen="${allergen.name}"
         class="dropdown-item" href="#product-list">${allergen.name}</a></li>`
      );
    }
    // Al elemento li que irá en el menu le añadimos las categorias que acabamos de crear
    li.append(container);
    // Y al menu de navegacion le añadimos li que es donde hemos metido todo
    this.menu.append(li);
  }

  // Mostrar los menus en en menu nav
  showMenusinMenu(menus) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown"); // Esta clasde de bootstrap conseguira que sea un menu despegable
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" 
      href="#" id="navMenus" role="button"
      data-bs-toggle="dropdown" aria-expanded="false">Menus</a>`
    );
    // Creamos la lista ordenada que irá dentro del elemento li del menu
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    container.id = "lista__menus";

    // Iteramos sobre las categorias para obtener la informacion que ira en la lista
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-menu="${menu.name}"
         class="dropdown-item" href="#product-list">${menu.name}</a></li>`
      );
    }
    // Al elemento li que irá en el menu le añadimos las menus que acabamos de crear
    li.append(container);
    // Y al menu de navegacion le añadimos li que es donde hemos metido todo
    this.menu.append(li);
  }

  showRestaurantsinMenu(restaurants) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown"); // Esta clasde de bootstrap conseguira que sea un menu despegable
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" 
      href="#" id="navRest" role="button"
      data-bs-toggle="dropdown" aria-expanded="false">Restaurants</a>`
    );
    // Creamos la lista ordenada que irá dentro del elemento li del menu
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    container.id = "lista__restaurants";

    // Iteramos sobre las categorias para obtener la informacion que ira en la lista
    for (const restaurant of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-restaurant="${restaurant.name}"
         class="dropdown-item" href="#product-list">${restaurant.name}</a></li>`
      );
    }
    // Al elemento li que irá en el menu le añadimos las menus que acabamos de crear
    li.append(container);
    // Y al menu de navegacion le añadimos li que es donde hemos metido todo
    this.menu.append(li);
  }

  RandomDishes(dishes) {
    // Borramos la zona
    this.dishh.replaceChildren();
    this.preMain.replaceChildren();
    let copiaDishes = [];
    let platosAleatorios = [];
    let numeroPlatos = 3;

    // Si hay mas de un elemento hijo elimina el 2
    if (this.preMain.children.length > 1) this.preMain.children[1].remove();

    const container = document.createElement("div");
    container.classList.add("flex");

    // Añadimos cada plato a la copia
    for (const dish of dishes) {
      copiaDishes.push(dish);
    }
    for (let index = 0; index < numeroPlatos; index++) {
      let indiceAleatorio = Math.floor(Math.random() * copiaDishes.length);
      platosAleatorios.push(copiaDishes[indiceAleatorio]);

      let plato = copiaDishes[indiceAleatorio];

      container.insertAdjacentHTML(
        "beforeend",
        `<div><a data-dish=${
          plato.name
        } href="#product-list"><img class="category-image" alt="${plato.name}" 
        src="${
          "./Multimedia/" + plato.name + ".jpg"
        }" style="max-width: 100%; max-height: 550px;" />  <div>
        <h3>${plato.name}</h3></a></div></div>`
      );

      //Borramos el plato que hemos seleccionado para que no salga de nuevo
      copiaDishes.splice(indiceAleatorio, 1);
    }
    this.preMain.append(container);
  }

  bindCategoryDishesMenu(handler) {
    // Cogemos el elemento de la lista
    let lista = document.getElementById("navCats");
    const links = lista.nextSibling.querySelectorAll("a");

    // Recorremos cada enlace y le añadimos el evento con el que se activira la callback
    for (const li of links) {
      li.addEventListener("click", (event) => {
        // Obtenemos la categoria clickeada
        const { category } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#product-list",
          { action: "dishCategoryList", category },
          "#product-list",
          event
        );
      });
    }
  }

  bindCategoryDishes(handler) {
    // Cogemos el elemento de la lista
    let lista = document.getElementById("category-list");
    // Cogemos todos los elementos hijos que son los div con clase .category-item
    const links = lista.children;

    // Y ahora recorreremos cada uno de esos elementos y le añadimos un enlace de clickear
    for (const li of links) {
      li.querySelector("a").addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#product-list",
          { action: "dishCategoryList", category },
          "#product-list",
          event
        );
      });
    }
  }

  bindAllergenDishesMenu(handle) {
    // Cogemos el elemento de la lista
    let lista = document.getElementById("navAllerg");
    // nextSibling pasamos al siguiente hermano y ahi buscamos los elementos a
    const links = lista.nextSibling.querySelectorAll("a");

    // Recorremos cada enlace y le añadimos el evento con el que se activira la callback
    for (const li of links) {
      li.addEventListener("click", (event) => {
        // Obtenemos la categoria clickeada
        const allergen = event.currentTarget.dataset.allergen;
        this[EXCECUTE_HANDLER](
          handle,
          [allergen],
          "#product-list",
          { action: "dishAllergenList", allergen },
          "#product-list",
          event
        );
      });
    }
  }

  bindMenuDishesMenu(handle) {
    // Cogemos el elemento de la lista
    let lista = document.getElementById("navMenus");
    const links = lista.nextSibling.querySelectorAll("a");

    // Recorremos cada enlace y le añadimos el evento con el que se activira la callback
    for (const li of links) {
      li.addEventListener("click", (event) => {
        // Obtenemos la categoria clickeada
        const { menu } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handle,
          [menu],
          "#product-list",
          { action: "menuList", menu },
          "#product-list",
          event
        );
      });
    }
  }

  bindRestaurantsDishesMenu(handle) {
    // Cogemos el elemento de la lista
    let lista = document.getElementById("navRest");
    const links = lista.nextSibling.querySelectorAll("a");

    // Recorremos cada enlace y le añadimos el evento con el que se activira la callback
    for (const li of links) {
      li.addEventListener("click", (event) => {
        // Obtenemos la categoria clickeada
        const { restaurant } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handle,
          [restaurant],
          "#product-list",
          { action: "restaurantList", restaurant },
          "#product-list",
          event
        );
      });
    }
  }

  // Mostrar plato cuando se le da a una categoria alérgeno o menu
  showDishes(dishes) {
    this.categories.replaceChildren();

    // Si hay más de un elemento hijo, elimina el segundo
    if (this.categories.children.length > 1) {
      this.categories.children[1].remove();
    }

    const container = document.createElement("div");
    container.id = "dish-list";
    container.classList.add("flex");

    for (const dish of dishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="plate-item">
                <a data-dish="${dish.name}" href="#product-list">
                    <div>
                        <img class="category-image plate-image" 
                             style="max-width: 100%; max-height: 550px;" 
                             src="${"./Multimedia/" + dish.name + ".jpg"}" 
                             alt="${dish.name}" />
                    </div>
                    <div>
                        <h3>${dish.name}</h3>
                    </div>
                </a>
            </div>
            `
      );
    }

    this.categories.append(container);
  }

  showRestaurantInformation(restaurant) {
    this.categories.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("flex2");

    container.insertAdjacentHTML(
      "beforeend",
      `<div class = "color">
        <h1> INFORMACION DE ${restaurant.name} </h1> <br>
       <h3> NOMBRE: ${restaurant.name}</h3>
       <h3> ESTILO: ${restaurant.description}</h3>
       <h3> LOCATION: ${restaurant.location}</h3>
     </div>
   </a>
 </div>`
    );
    this.categories.append(container);
  }

  bindShowDish(handle) {
    const div = document.getElementById("dish-list");
    console.log(div);

    // Obtenemos todos los enlaces que son descendientes de los divs hijos del div principal
    const links = div.querySelectorAll("a");

    // Iteramos sobre los enlaces
    for (const li of links) {
      li.addEventListener("click", (event) => {
        // Obtenemos la categoria clickeada
        const { dish } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handle,
          [dish],
          "#product-list",
          { action: "dishBind", dish },
          "#product-list",
          event
        );
      });
    }
  }
  dishInformation(dish) {
    this.dishh.replaceChildren();

    this.dishh.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card mx-auto" style="max-width: 9rem;">
            <img src="${
              "./Multimedia/" + dish.name.replace(/\s+/g, "") + ".jpg"
            }" class="card-img-top fotoplato" alt="${dish.name}" >
            <div class="card-body">
                <h5 class="card-title" style="font-size: 1rem;">Nombre: ${
                  dish.name
                }</h5>
                <p class="card-text" style="font-size: 0.9rem;">Descripción: ${
                  dish.description
                }</p>
                <p class="card-text" style="font-size: 0.9rem;">Ingredientes: ${
                  dish.ingredients
                }</p>
                <button class="btn btn-primary" data-dish= ${
                  dish.name
                }>Comprar</button>
                <br> 
                <button id="b-open" class="btn btn-primary" data-dish= ${
                  dish.name
                }>Nueva <br>Ventana</button>
                </div>
            </div>
            
        </div>
        `
    );
  }

  bindShowRandomDish(handle) {
    const div = document.getElementById("platosRandom");
    const links = div.querySelectorAll("a");

    for (const li of links) {
      li.addEventListener("click", (event) => {
        // Obtenemos la categoria clickeada
        const { dish } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handle,
          [dish],
          "#product-list",
          { action: "randomDish", dish },
          "#product-list",
          event
        );
      });
    }
  }

  showProductInNewWindow(dish) {
    // Cogemos los elementos de la nueva ventana
    const main = this.dishWindow.document.querySelector("main");
    const header = this.dishWindow.document.querySelector("header nav");

    // Los vaciamos
    main.replaceChildren();
    header.replaceChildren();
    let container;

    // Si existe  el plato
    if (dish) {
      this.dishWindow.document.title = dish.name;
      header.insertAdjacentHTML(
        "beforeend",
        `<h1 dataserial="${dish.name}" class="display-5">${dish.name} -${dish.description}</h1>`
      );
      container = document.createElement("div");
      container.id = "single-product";
      container.classList.add(`${dish.constructor.name}-style`);
      container.classList.add("container");
      container.classList.add("mt-5");
      container.classList.add("mb-5");
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex
justify-content-center">
<div class="col-md-10">
<div class="card">
<div class="row">
<div class="col-md-12">
<div class="images p-3">
<div class="text-center p-4"> <img id="main-image"
 src="${"./Multimedia/" + dish.name + ".jpg"}""/> </div>
</div>
</div>
<div class="col-md-12">
<div class="product p-4">
<div class="mt-4 mb-3"> <span class="text-uppercase
text-muted brand">${dish.name}</span>
<h5 class="text-uppercase">${dish.description}</h5>
<div class="price d-flex flex-row align-itemscenter">
<span class="actprice">${dish.ingredients}</span>
</div>
</div>
<p class="about">${dish.description}</p>
<div class="sizes mt-5">
<h6 class="text-uppercase">Características</h6>
</div>
<div class="cart mt-4 align-items-center"> <button
data-serial="${
          dish.name
        }" class="btn btn-primary text-uppercase mr2 px-4">Comprar</button> </div>
</div>
</div>
</div>
</div>
</div>
</div>`
      );
      container.insertAdjacentHTML(
        "beforeend",
        '<button class="btn btnprimary text-uppercase m-2 px-4"onClick="window.close()">Cerrar</button>'
      );
      main.append(container);
    }
  }

  // Método para cuando le demos al botón de abrir en nueva ventana
  bindShowProductInNewWindow(handler) {
    const bOpen = document.getElementById("b-open");

    // Verificamos si la ventana es nula o esta cerrada para abrirla si no lo esta
    bOpen.addEventListener("click", (event) => {
      this.contador++;
      let nombre = "dishWindow" + this.contador;

      this.dishWindow = window.open(
        "Dish.html",
        nombre,
        "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"
      );

      this.ventanas.push(this.dishWindow);

      // Agregamos el evento que se ejecutará cuando el contenido de la ventana emergente se cargue
      this.dishWindow.addEventListener("load", () => {
        handler(event.target.dataset.dish);
      });
    });
  }

  // Método para cerrar ventana
  closeWindow() {
    let botonCerrar = document.getElementById("cerrarVentana"); // Boton cerrar ventana

    botonCerrar.addEventListener("click", () => {
      // Recorremos todas las ventanas para cerrarla
      for (const ventana of this.ventanas) {
        if (ventana || !ventana.closed()) {
          ventana.close();
        }
      }
    });
  }

  showAdminMenu() {
    const menuOption = document.createElement("li");
    menuOption.classList.add("nav-item");
    menuOption.classList.add("dropdown");
    menuOption.insertAdjacentHTML(
      "afterbegin",
      '<a class="nav-link dropdown-toggle" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">Adminitración</a>'
    );

    const suboptions = document.createElement("ul");
    suboptions.classList.add("dropdown-menu");
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="newCategory" class="dropdown-item" href="#new-category">Crear Plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="removeDish" class="dropdown-item" href="#remove-dish">Eliminar Plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="assignDish" class="dropdown-item" href="#assignDish">Asignar Platos Menu</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="desAssignDish" class="dropdown-item" href="#desAssignDish"> Desasignar Platos Menu</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="newRemoveCategory" class="dropdown-item" href="#del-product">Añadir-Borrar Categoria</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="newRestaurant" class="dropdown-item" href="#del-product">Crear Restaurante</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="modCategoryDish" class="dropdown-item" href="#del-product">Modificar Cateogrias Plato</a></li>'
    );

    menuOption.append(suboptions);
    this.menu.append(menuOption);
  }

  showNewDishForm(categories, allergens) {
    this.categories.replaceChildren();
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();

    // Creamos el div donde ira nuestro formulario de creacion del plato
    const container = document.createElement("div");

    // Le añadimos las clases y las ids correspondientes a nuestro contenedor
    container.classList.add("container", "my-3");
    container.id = "new-dish";

    // Le añadimos el titulo a nuestro contenedor
    container.insertAdjacentHTML("afterbegin", "<h1>Nuevo Plato</h1>");

    // Añadimos el formulario para la creacion del plato a nuestro contenedor
    container.insertAdjacentHTML(
      "beforeend",
      `     
       <form name="fNewDish" role="form" id="fNewDish" class="booking_frm black"  novalidate> 
         <h2 class="frm_title">Creación Del Plato</>
         
 
         <div class="mt-4">
           <div class="input-group">
             <label for="ndName">Nombre <span class="letter_red">*</span></label>
             <input class="input-style type="text" id="ndName" name="ndName"
             placeholder="Introduzca el nombre del plato" value="" required/>
             <div class="invalid-feedback">El plato debe contener un nombre.</div>
             <div class="valid-feedback">Correcto.</div>
           </div>
         </div>
 
         <div class="mt-4">
           <div class="input-group">
             <label for="ndDescription">Descripción <span class="letter_red">*</span></label>
             <input class="input-style type="text" id="ndDescription" name="ndDescription"
             placeholder="Introduzca la descripcion del plato" value="" required/>
             <div class="invalid-feedback">El plato debe contener una descripción.</div>
             <div class="valid-feedback">Correcto.</div>
           </div>
         </div>
 
         <div class="mt-4">
           <div class="input-group">
             <label for="ndIngredients">Ingredientes <span class="letter_red">*</span></label>
             <input class="input-style type="text" id="ndIngredients" name="ndIngredients"
             placeholder="Introducza los ingredientes (ingre1,ingre2)" pattern="^[a-zA-Z0-9]+(?:,[a-zA-Z0-9]+)*$" value="" required/>
             <div class="invalid-feedback">El plato debe tener ingredientes.</div>
             <div class="valid-feedback">Correcto.</div>
           </div>
         </div>
 
         <div class="mt-4">
           <div class="input-group">
             <label for="ndCategories">Categorias <span class="letter_red">*</span></label>
             <select class="input-style" id="ndCategories" name="ndCategories" size="3" multiple required>
             </select>
             <div class="invalid-feedback">Debe seleccionar al menos una categoria.</div>
             <div class="valid-feedback">Correcto.</div>
           </div>
         </div>
 
         <div class="mt-4">
           <div class="input-group">
             <label for="ndAllergens">Alergenos <span class="letter_red">*</span></label>
             <select class="input-style" id="ndAllergens" name="ndAllergens" size="4" multiple required>
             </select>
             <div class="invalid-feedback">Debe seleccionar al menos un alergeno.</div>
             <div class="valid-feedback">Correcto.</div>
           </div>
         </div>
 
         <div class="mt-4">
           <button class="button red" type="submit">Enviar</button>
           <button class="button red" type="reset">Cancelar</button>
         </div>
       </form>
       `
    );

    // Añadimos el formulario a nuestra pagina
    this.main.append(container);

    // Vamos a poner los alergenos y categorias
    const allergensSelector = document.getElementById("ndAllergens");
    console.log(allergensSelector);

    for (const allergen of allergens) {
      allergensSelector.insertAdjacentHTML(
        "beforeend",
        `
          <option value='${allergen.name}'>${allergen.name}</option>
        `
      );
    }

    // Obtenemos el selector donde iran nuestras categorias
    const categoySelector = document.getElementById("ndCategories");

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const category of categories) {
      categoySelector.insertAdjacentHTML(
        "beforeend",
        `
          <option value='${category.name}'>${category.name}</option>
        `
      );
    }
  }

  // Formulario para mostrar que plato queremos borrar
  showRemoveDish(categories, allergens) {
    // Primero lo que tenemos que hacer es borrar el contenido del main
    this.categories.replaceChildren();
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();

    // Creamos el div donde ira nuestro formulario de creacion del plato
    const container = document.createElement("div");

    // Le añadimos las clases y las ids correspondientes a nuestro contenedor
    container.classList.add("container", "my-3");
    container.id = "remove-dish";

    // Le añadimos el titulo a nuestro contenedor
    container.insertAdjacentHTML("afterbegin", "<h1>Eliminar Plato</h1>");

    container.insertAdjacentHTML(
      "beforeend",
      `     
      <form name="fRemoveDish" role="form" id="fRemoveDish" class="booking_frm black"  novalidate> 
        <h2 class="frm_title">Eliminación de platos</>
        <h3 class="frm_subtitle">Rellene los campos con la información necesaria para la eliminacion del plato.</h3>

        <div class="mt-4">
          <div class="input-group">
            <label for="ndCategories">Categoria</label>
            <select class="input-style" id="ndCategories" name="ndCategories">
              <option selected disabled>Seleccione una categoria</option>
            </select>
            <div class="invalid-feedback">Debe seleccionar al menos una categoria.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>
        </div>

        <div class="mt-4">
          <div class="input-group">
            <label for="ndAllergens">Alergenos</label>
            <select class="input-style" id="ndAllergens" name="ndAllergens">
              <option selected disabled>Seleccione un alérgeno</option>
            </select>
            <div class="invalid-feedback">Debe seleccionar al menos un alergeno.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>
        </div>
      </form>
      `
    );
    // Añadimos el contendor donde iran la lista de los platos
    container.insertAdjacentHTML(
      "beforeend",
      '<div id="remove-dishlist" class="container my-3"><div class="row"></div></div>'
    );

    // Añadimos el formulario a nuestra pagina
    this.main.append(container);

    // Obtenemos el selector donde iran nuestro alergenos para añadirlos
    const allergensSelector = document.getElementById("ndAllergens");

    // Recorremos los alergenos que nos llegan
    // y las añadimos a nuestro selector de alergenos
    for (const allergen of allergens) {
      allergensSelector.insertAdjacentHTML(
        "beforeend",
        `
          <option value='${allergen.name}'>${allergen.name}</option>
        `
      );
    }

    // Obtenemos el selector donde iran nuestras categorias
    const categoySelector = document.getElementById("ndCategories");

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const category of categories) {
      categoySelector.insertAdjacentHTML(
        "beforeend",
        `
          <option value='${category.name}'>${category.name}</option>
        `
      );
    }
  }
  // Mostramos el listado de los productos para eliminarlos
  showRemoveDishList(dishes) {
    // Obtenemos el contenedor donde pondremos nuestros platos
    const dishContainer = document
      .getElementById("remove-dishlist")
      .querySelector("div.row");
    // Remplazamos el contenido de nuestro div
    dishContainer.replaceChildren();

    // Creamos un boolean que nos indicara si existen platos o no
    let existDish = false;

    // Iteramos sobre los platos
    for (const dish of dishes) {
      existDish = true;
      // Añadimos los platos al contenedor
      dishContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card black rounded-3 mr-10 style-card">${dish.name}
            <div class="card-body text-center">
                <p class="card-text text-white">${dish.name}</p>
            </div>
            <div class="mt-4 mb-4 mx-auto">
              <a href='#remove-dish' data-dish="${dish.name}" class="btn justify-content-center button red">Eliminar</a>
            </div>
        </div>
        `
      );
    }

    // Si no existen platos unicamente podremos un mensaje
    if (!existDish) {
      dishContainer.insertAdjacentHTML(
        "beforeend",
        `
          <p class="letter_red">No existen platos para esta categoría o alérgeno</p>
        `
      );
    }
  }

  // Asignaremos un plato al menu
  showAssignDishForm(menus, dishes) {
    // Primero borraremos el contenido del main
    this.categories.replaceChildren();
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();

    // Creamos el div donde ira nuestro formulario de creacion del plato
    const container = document.createElement("div");

    // Le añadimos las clases y las ids correspondientes a nuestro contenedor
    container.classList.add("container", "my-3");
    container.id = "assign-dish";

    // Le añadimos el titulo a nuestro contenedor
    container.insertAdjacentHTML(
      "afterbegin",
      "<h1>Asignación de plato a menú</h1>"
    );

    // Añadimos el formulario para la creacion del plato a nuestro contenedor
    container.insertAdjacentHTML(
      "beforeend",
      `     
      <form name="fAssignDish" role="form" id="fAssignDish" class="booking_frm black"  novalidate> 
        <h2 class="frm_title">Asignación Del Plato a Menú</>
        <h3 class="frm_subtitle">Rellene los campos con la información necesaria para la asignación del plato.</h3>

        <div class="mt-4">
          <div class="input-group">
            <label for="ndMenus">Menus <span class="letter_red">*</span></label>
            <select class="input-style" id="ndMenus" name="ndMenus"  size="3" required>
            </select>
            <div class="invalid-feedback">Debe seleccionar un menu.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>
        </div>

        <div class="mt-4">
          <div class="input-group">
            <label for="ndDishes">Platos <span class="letter_red">*</span></label>
            <select class="input-style" id="ndDishes" name="ndDishes" size="4" multiple required>
            </select>
            <div class="invalid-feedback">Debe seleccionar al menos un plato.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>
        </div>

        <div class="mt-4">
          <button class="button red" type="submit">Enviar</button>
          <button class="button red" type="reset">Cancelar</button>
        </div>
      </form>
      `
    );

    // Añadimos el formulario a nuestra pagina
    this.main.append(container);

    const menuSelector = document.getElementById("ndMenus");

    // Recorremos los menus que nos llegan
    // y las añadimos a nuestro selector de menus
    for (const menu of menus) {
      menuSelector.insertAdjacentHTML(
        "beforeend",
        `
           <option value='${menu.name}'>${menu.name}</option>
         `
      );
    }
    // Obtenemos el selector donde iran nuestro menus
    const dishesSelector = document.getElementById("ndDishes");

    // Recorremos los menus que nos llegan
    // y las añadimos a nuestro selector de menus
    for (const dish of dishes) {
      dishesSelector.insertAdjacentHTML(
        "beforeend",
        `
             <option value='${dish.name}'>${dish.name}</option>
           `
      );
    }
  }

  showDesAssignDishForm(menus, dishes) {
    // Primero borraremos el contenido del main
    this.categories.replaceChildren();
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();

    // Creamos el div donde ira nuestro formulario de creacion del plato
    const container = document.createElement("div");

    // Le añadimos las clases y las ids correspondientes a nuestro contenedor
    container.classList.add("container", "my-3");
    container.id = "desassign-dish";

    // Le añadimos el titulo a nuestro contenedor
    container.insertAdjacentHTML(
      "afterbegin",
      "<h1>Desasignación de plato a menú</h1>"
    );

    // Añadimos el formulario para la creacion del plato a nuestro contenedor
    container.insertAdjacentHTML(
      "beforeend",
      `     
      <form name="fDesAssignDish" role="form" id="fDesAssignDish" class="booking_frm black"  novalidate> 
        <h2 class="frm_title">Desasignación plato al menú</>
        <h3 class="frm_subtitle">Rellene los campos con la información necesaria para la desasignación del plato.</h3>

        <div class="mt-4">
          <div class="input-group">
            <label for="ndMenus">Menus <span class="letter_red">*</span></label>
            <select class="input-style" id="ndMenus" name="ndMenus"  size="3" required>
            </select>
            <div class="invalid-feedback">Debe seleccionar un menu.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>
        </div>

        <div class="mt-4">
          <div class="input-group">
            <label for="ndDishes">Platos <span class="letter_red">*</span></label>
            <select class="input-style" id="ndDishes" name="ndDishes" size="4" multiple required>
            </select>
            <div class="invalid-feedback">Debe seleccionar al menos un plato.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>
        </div>

        <div class="mt-4">
          <button class="button red" type="submit">Enviar</button>
          <button class="button red" type="reset">Cancelar</button>
        </div>
      </form>
      `
    );

    // Añadimos el formulario a nuestra pagina
    this.main.append(container);

    // Obtenemos el selector donde iran nuestro menus
    const menuSelector = document.getElementById("ndMenus");

    // Recorremos los menus que nos llegan
    // y las añadimos a nuestro selector de menus
    for (const menu of menus) {
      menuSelector.insertAdjacentHTML(
        "beforeend",
        `
            <option value='${menu.name}'>${menu.name}</option>
          `
      );
    }

    // Obtenemos el selector donde iran nuestro menus
    const dishesSelector = document.getElementById("ndDishes");

    // Recorremos los menus que nos llegan
    // y las añadimos a nuestro selector de menus
    for (const dish of dishes) {
      dishesSelector.insertAdjacentHTML(
        "beforeend",
        `
             <option value='${dish.name}'>${dish.name}</option>
           `
      );
    }
  }

  bindAdminMenu(newDish, removeDish, assignDish, desssingDish) {
    const newDishLink = document.getElementById("newCategory");
    newDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        newDish,
        [],
        "#new-category",
        { action: "newCategory" },
        "#",
        event
      );
    });

    const removeDishLink = document.getElementById("removeDish");
    removeDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        removeDish,
        [],
        "#remove-dish",
        { action: "removeDish" },
        "#",
        event
      );
    });

    const assignDishLink = document.getElementById("assignDish");
    assignDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        assignDish,
        [],
        "#assignDish",
        { action: "assignDish" },
        "#",
        event
      );
    });

    const deassignDishLink = document.getElementById("desAssignDish");
    deassignDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        desssingDish,
        [],
        "#desAssignDish",
        { action: "desAssignDish" },
        "#",
        event
      );
    });
  }

  // Este bind se activará cuuando seleccionemos en un select de un formulario
  bindRemoveDishSelect(allergens, categories) {
    // Recogemos el select de alergenos
    const ndAllergens = document.getElementById("ndAllergens");
    ndAllergens.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        allergens,
        [event.currentTarget.value],
        "#remove-dish",
        { action: "removeDishByAllergen", allergen: event.currentTarget.value },
        "#remove-dish",
        event
      );
    });

    // Recogemos el select de categorias
    const ndCategories = document.getElementById("ndCategories");
    ndCategories.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        categories,
        [event.currentTarget.value],
        "#remove-dish",
        { action: "removeDishByCategory", category: event.currentTarget.value },
        "#remove-dish",
        event
      );
    });
  }

  // Bind para la eliminacion de platos
  bindRemoveDish(handler) {
    // Recogemos el contenedor donde tenemos los platos
    const dishList = document.getElementById("remove-dish");
    // Recogemos los botones de eliminar
    const buttons = dishList.querySelectorAll("a");
    // Iteramos sobre los botones
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.dish);
      });
    }
  }

  bindNewDishForm(handler) {
    newDishValidation(handler);
  }

  bindAssignDishForm(handler) {
    assignValidationForm(handler);
  }

  bindDesAssignDishForm(handler) {
    desAssignValidationForm(handler);
  }

  // MODALES

  showDishModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Plato creada";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${dish.name}</strong> se ha creado correctamente.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewDish.reset();
      }
      document.fNewDish.ndName.focus();
      messageModalContainer.addEventListener("hidden.bs.modal", listener, {
        once: true,
      });
    };
  }
  showRemoveDishModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Plato eliminado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido eliminado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato no existe en el manager.</div>'
      );
    }
    messageModal.show();
  }

  showAssignDishModal(done, menu, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Asignación plato menu";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">Los platos han sido agregados al <strong>${menu.name}</strong>.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i>El <strong>${menu.name}</strong> ya contiene alguno de los platos que esta intentando agregar.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fAssignDish.reset();
      }
      document.fAssignDish.ndMenus.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showDesAssignDishModal(done, menu, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Desasignación plato menu";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">Los platos han sido desasignados del <strong>${menu.name}</strong>.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i>El <strong>${menu.name}</strong> no contiene alguno de los platos seleccionados.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fDesAssignDish.reset();
      }
      document.fDesAssignDish.ndMenus.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showRemoveDishModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Plato eliminado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido eliminado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato no existe en el manager.</div>'
      );
    }
    messageModal.show();
  }
}

export default RestaurantView;
