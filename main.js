const productosContainer = document.querySelector("#productosContainer");
const carritoContainer = document.querySelector("#carritoContainer");
const totalContainer = document.querySelector("#totalContainer");
const finalizarPedidoButton = document.querySelector("#finalizarPedidoButton");

const productos = [
  {
    nombre: "Hamburguesa Clásica",
    precio: 2800,
  },
  {
    nombre: "Hamburguesa de Pollo",
    precio: 2500,
  },
  {
    nombre: "Hamburguesa Vegetariana",
    precio: 2600,
  },
];

let carrito = obtenerCarritoGuardado();

function obtenerCarritoGuardado() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const actualizarCarrito = () => {
  carritoContainer.innerHTML = "";
  let total = 0;

  carrito.forEach(({ producto, cantidad }) => {
    const carritoItem = document.createElement("p");
    carritoItem.innerText = `${cantidad}x ${producto.nombre} : $${(
      producto.precio * cantidad
    ).toFixed(2)}`;
    carritoContainer.appendChild(carritoItem);
    total += producto.precio * cantidad;
  });

  totalContainer.innerText = `Total: $${total.toFixed(2)}`;
};

const agregarProducto = (index) => {
  const contador = document.getElementById(`contador-${index}`);
  const cantidad = parseInt(contador.innerText, 10);

  if (cantidad > 0) {
    const productoExistenteIndex = carrito.findIndex(
      (item) => item.producto.nombre === productos[index].nombre
    );

    if (productoExistenteIndex !== -1) {
      carrito[productoExistenteIndex].cantidad += cantidad;
    } else {
      carrito.push({
        producto: productos.find(
          (producto) => producto.nombre === productos[index].nombre
        ),
        cantidad,
      });
    }

    guardarCarrito(carrito);
    actualizarCarrito();
    contador.innerText = "0";
  }
};

const finalizarPedido = () => {
  carrito.length > 0
    ? (alert("¡Pedido finalizado! Gracias por tu compra."),
      (carrito = []),
      guardarCarrito(carrito),
      actualizarCarrito())
    : alert(
        "El carrito está vacío. Agrega productos antes de finalizar el pedido."
      );
};

productos.forEach((producto, index) => {
  const productoContainer = document.createElement("div");
  productoContainer.className = "producto-container";

  const productNombre = document.createElement("h3");
  productNombre.innerText = producto.nombre;
  productoContainer.appendChild(productNombre);

  const productPrecio = document.createElement("p");
  productPrecio.innerText = `$${producto.precio.toFixed(2)}`;
  productoContainer.appendChild(productPrecio);

  const numeroContador = document.createElement("span");
  numeroContador.id = `contador-${index}`;
  numeroContador.innerText = "0";
  productoContainer.appendChild(numeroContador);

  const btnSuma = document.createElement("button");
  btnSuma.innerText = "+";
  btnSuma.addEventListener("click", () => {
    const contador = document.getElementById(`contador-${index}`);
    contador.innerText = parseInt(contador.innerText, 10) + 1;
  });

  const btnResta = document.createElement("button");
  btnResta.innerText = "-";
  btnResta.addEventListener("click", () => {
    const contador = document.getElementById(`contador-${index}`);
    contador.innerText = Math.max(parseInt(contador.innerText, 10) - 1, 0);
  });

  const btnAgregar = document.createElement("button");
  btnAgregar.innerHTML = "Agregar al carrito";
  btnAgregar.addEventListener("click", () => {
    agregarProducto(index);
    guardarCarrito(carrito); // Guardar carrito después de agregar un producto
  });

  productoContainer.appendChild(btnSuma);
  productoContainer.appendChild(btnResta);
  productoContainer.appendChild(btnAgregar);
  productosContainer.appendChild(productoContainer);
});

finalizarPedidoButton.addEventListener("click", finalizarPedido);

actualizarCarrito();
