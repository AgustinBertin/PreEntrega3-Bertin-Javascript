const productosContainer = document.querySelector("#productosContainer");
const carritoContainer = document.querySelector("#carritoContainer");
const totalContainer = document.querySelector("#totalContainer");
const finalizarPedidoButton = document.querySelector("#finalizarPedidoButton");
const vaciarCarritoButton = document.querySelector("#vaciarCarritoButton");
const filtroTipo = document.querySelector("#filtroTipo");
const ordenPrecio = document.querySelector("#ordenPrecio");
const busquedaProducto = document.querySelector("#busquedaProducto");
const buscarButton = document.querySelector("#buscarButton");

const productos = [
  {
    nombre: "Hamburguesa Clasica",
    tipo: "hamburguesas",
    precio: 2800,
  },
  {
    nombre: "Hamburguesa de Pollo",
    tipo: "hamburguesas",
    precio: 2500,
  },
  {
    nombre: "Hamburguesa Vegetariana",
    tipo: "hamburguesas",
    precio: 2600,
  },
  {
    nombre: "Hamburguesa Doble Cheese Bacon",
    tipo: "hamburguesas",
    precio: 3200,
  },
  {
    nombre: "Porcion de Papas Fritas",
    tipo: "porciones",
    precio: 800,
  },
  {
    nombre: "Porcion de Aros de Cebolla",
    tipo: "porciones",
    precio: 800,
  },
  {
    nombre: "Porción de Nuggets de Pollo",
    tipo: "porciones",
    precio: 900,
  },
  {
    nombre: "Porcion de Bastones de Queso",
    tipo: "porciones",
    precio: 850,
  },
];

let carrito = obtenerCarritoGuardado();

function obtenerCarritoGuardado() {
  const carritoGuardado = localStorage.getItem("carrito");
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const actualizarCarrito = () => {
  carritoContainer.innerHTML = "";
  let total = 0;

  carrito.forEach(({ producto, cantidad }) => {
    const carritoItem = document.createElement("div");
    carritoItem.className = "carrito-item";

    const carritoTexto = document.createElement("p");
    carritoTexto.innerText = `${producto.nombre} x${cantidad}`;
    carritoItem.appendChild(carritoTexto);

    const btnEliminar = document.createElement("button");
    btnEliminar.innerText = "Eliminar Producto";
    btnEliminar.addEventListener("click", () => {
      carrito = carrito.filter(
        (item) => item.producto.nombre !== producto.nombre
      );
      actualizarCarrito();
      guardarCarrito();
    });
    carritoItem.appendChild(btnEliminar);

    const btnRestar = document.createElement("button");
    btnRestar.innerText = "-";
    btnRestar.addEventListener("click", () => {
      if (cantidad > 1) {
        carrito.find((item) => item.producto.nombre === producto.nombre)
          .cantidad--;
        actualizarCarrito();
        guardarCarrito();
      }
    });
    carritoItem.appendChild(btnRestar);

    const cantidadProducto = document.createElement("span");
    cantidadProducto.innerText = cantidad;

    const btnSumar = document.createElement("button");
    btnSumar.innerText = "+";
    btnSumar.addEventListener("click", () => {
      carrito.find((item) => item.producto.nombre === producto.nombre)
        .cantidad++;
      actualizarCarrito();
      guardarCarrito();
    });
    carritoItem.appendChild(btnSumar);

    carritoContainer.appendChild(carritoItem);
    total += producto.precio * cantidad;
  });

  totalContainer.innerText = `Total: $${total.toFixed(2)}`;
};

const agregarProducto = (producto) => {
  if (!carrito.find((item) => item.producto.nombre === producto.nombre)) {
    carrito.push({ producto, cantidad: 1 });
    guardarCarrito();
    actualizarCarrito();
  }
};

const finalizarPedido = () => {
  if (carrito.length > 0) {
    let total = carrito.reduce(
      (accumulator, { producto, cantidad }) =>
        accumulator + producto.precio * cantidad,
      0
    );

    alert(
      `¡Pedido finalizado! El Total es: $${total.toFixed(
        2
      )}. Gracias por su compra.`
    );
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
  } else {
    alert(
      "El carrito está vacío. Agrega productos antes de finalizar el pedido."
    );
  }
};

const filtrarProductosPorTipo = (tipo) => {
  const tipoSeleccionado = tipo.toLowerCase();
  const productosFiltrados = productos.filter((producto) =>
    tipoSeleccionado === "todos" ? true : producto.tipo === tipoSeleccionado
  );
  mostrarProductos(productosFiltrados);
};

const ordenarProductosPorPrecio = (orden) => {
  const comparador =
    orden === "ascendente"
      ? (a, b) => a.precio - b.precio
      : (a, b) => b.precio - a.precio;
  const productosOrdenados = [...productos].sort(comparador);
  mostrarProductos(productosOrdenados);
};

const buscarProductosPorNombre = (nombre) => {
  const productosEncontrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(nombre)
  );
  mostrarProductos(productosEncontrados);
};

const mostrarProductos = (productosMostrados) => {
  productosContainer.innerHTML = "";

  productosMostrados.forEach((producto) => {
    const productoContainer = document.createElement("div");
    productoContainer.className = "producto-container";

    const productNombre = document.createElement("h3");
    productNombre.innerText = producto.nombre;
    productoContainer.appendChild(productNombre);

    const productPrecio = document.createElement("p");
    productPrecio.innerText = `$${producto.precio.toFixed(2)}`;
    productoContainer.appendChild(productPrecio);

    const btnAgregar = document.createElement("button");
    btnAgregar.innerHTML = "Agregar al carrito";
    btnAgregar.addEventListener("click", () => {
      agregarProducto(producto);
    });

    productoContainer.appendChild(btnAgregar);
    productosContainer.appendChild(productoContainer);
  });
};

productos.forEach((producto) => {
  const productoContainer = document.createElement("div");
  productoContainer.className = "producto-container";

  const productNombre = document.createElement("h3");
  productNombre.innerText = producto.nombre;
  productoContainer.appendChild(productNombre);

  const productPrecio = document.createElement("p");
  productPrecio.innerText = `$${producto.precio.toFixed(2)}`;
  productoContainer.appendChild(productPrecio);

  const btnAgregar = document.createElement("button");
  btnAgregar.innerHTML = "Agregar al carrito";
  btnAgregar.addEventListener("click", () => {
    agregarProducto(producto);
  });

  productoContainer.appendChild(btnAgregar);
  productosContainer.appendChild(productoContainer);
});

finalizarPedidoButton.addEventListener("click", finalizarPedido);
vaciarCarritoButton.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
});

filtroTipo.addEventListener("change", () => {
  const tipoSeleccionado = filtroTipo.value;
  filtrarProductosPorTipo(tipoSeleccionado);
});

ordenPrecio.addEventListener("change", () => {
  const ordenSeleccionado = ordenPrecio.value;
  ordenarProductosPorPrecio(ordenSeleccionado);
});

buscarButton.addEventListener("click", () => {
  const nombreProducto = busquedaProducto.value.toLowerCase();
  buscarProductosPorNombre(nombreProducto);
});

actualizarCarrito();
