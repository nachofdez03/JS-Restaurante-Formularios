// VISTA

// Definimos Symbol para implementar el método
const EXCECUTE_HANDLER = Symbol("excecuteHandler");

// Creamos la clase, declaramos las propiedades que vamos a utilizar más habitualmente
class RestaurantView {
  constructor() {
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
}

export default RestaurantView;
