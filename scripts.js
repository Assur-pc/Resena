// Datos de ejemplo para las publicaciones
const postsData = [
  {
    id: 1,
    title: "Investigadores crean el primer procesador cuántico lógico",
    content: `
      <p>Un equipo de Harvard ha creado el primer procesador cuántico lógico de 48 qubits, un avance significativo en el camino hacia la computación cuántica estable con corrección de errores. Este procesador abre nuevas posibilidades en medicina, ciencia y finanzas.</p>
      <img src="quantum_processor.jpg" alt="Imagen de un procesador cuántico">
    `,
    size: "large"
  },
  {
    id: 2,
    title: "Funcionamiento de un procesador cuántico lógico",
    content: `
      <p>Los procesadores cuánticos lógicos usan qubits que pueden existir en múltiples estados simultáneamente. Este procesador, con 48 qubits, usa corrección de errores para garantizar cálculos precisos y eficientes en comparación con los sistemas cuánticos anteriores.</p>
      <img src="quantum_computing.jpg" alt="Funcionamiento del procesador cuántico lógico">
    `,
    size: "large"
  },
  {
    id: 3,
    title: "Impacto del procesador cuántico lógico",
    content: `
      <ul>
        <li>Permite la ejecución de algoritmos cuánticos más complejos.</li>
        <li>Revoluciona la investigación científica, como la simulación molecular.</li>
        <li>Posibilita avances en áreas como la criptografía y la inteligencia artificial.</li>
      </ul>
    `,
    size: "small"
  },
  {
    id: 4,
    title: "Futuro de la computación cuántica",
    content: `
      <p>Con este avance, los procesadores cuánticos lógicos están cada vez más cerca de hacer realidad la computación cuántica práctica. Esto tendrá un impacto en áreas como la medicina, la ciencia, la optimización financiera y mucho más.</p>
      <img src="Future_quantum.jpg" alt="Futuro de la asdasdscomputación cuántica">
    `,
    size: "large"
  },
  {
    id: 5,
    title: "Sistema de corrección de errores cuántico",
    content: `
      <p>El equipo de Harvard diseñó un sistema avanzado de corrección de errores, el cual permite que los qubits cuánticos mantengan su coherencia y precisión a lo largo de los cálculos. Esto marca un hito en la confiabilidad de la computación cuántica.</p>
      <img src="error_correction.jpg" alt="Sistema de corrección de errores cuántico">
    `,
    size: "large"
  },
  {
    id: 6,
    title: "Aplicaciones científicas de los procesadores cuánticos",
    content: `
      <p>Los procesadores cuánticos podrían revolucionar sectores como la química y la medicina. Al simular moléculas complejas, los investigadores podrán descubrir nuevos materiales, medicamentos y tratamientos personalizados.</p>
      <img src="quantum_medicine.jpg" alt="Aplicaciones en medicina cuántica">
    `,
    size: "small"
  },
  {
    id: 7,
    title: "Limitaciones actuales de la computación cuántica",
    content: `
      <p>Aunque este procesador representa un avance, todavía existen desafíos como el aumento de la cantidad de qubits utilizables y la mejora de la estabilidad del sistema cuántico en entornos prácticos.</p>
      <img src="quantum_limitations.jpg" alt="Limitaciones de la computación cuántica">
    `,
    size: "small"
  },
  {
    id: 8,
    title: "Link al artículo completo",
    content: `
      <p>Para más información, visita el artículo original en la Harvard Gazette: <a href="https://news.harvard.edu/gazette/story/2023/12/researchers-create-first-logical-quantum-processor/?authuser=0" target="_blank">Clic aquí</a></p>
    `,
    size: "large"
  },
];


// Variables para el slideshow
let currentSlideIndex = 0;

// Inicializar la página
document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
});

// Renderizar las publicaciones
function renderPosts() {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  postsData.forEach(post => {
    const postElement = document.createElement("div");
    postElement.classList.add("post", post.size); // Aplicar la clase de tamaño
    postElement.dataset.id = post.id;

    const likes = getLikes(post.id);

    postElement.innerHTML = `
      <div class="post-header">
        <h3>${post.title}</h3>
        <div class="options">
          <button class="options-button" aria-label="Opciones de publicación" onclick="toggleOptionsMenu(event)">&#x22EE;</button>
          <div class="options-menu">
            <ul>
              <li><button onclick="abrirPublicacion(${post.id})">Abrir publicación</button></li>
              <li><button onclick="abrirEnOtraVentana(${post.id})">Abrir en otra ventana</button></li>
              <li><button onclick="copiarEnlace(${post.id})">Copiar enlace</button></li>
              <li><button onclick="iniciarPresentacion(${post.id})">Iniciar presentación</button></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="post-content">
        ${post.content}
      </div>
      <div class="post-footer">
        <button class="like-button" onclick="darLike(this, ${post.id})">❤️ Like (<span class="like-count">${likes}</span>)</button>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Obtener likes desde localStorage
function getLikes(postId) {
  const likes = localStorage.getItem(`likes_${postId}`);
  return likes ? parseInt(likes) : 0;
}

// Dar "like" y actualizar localStorage
function darLike(button, postId) {
  const likeCountSpan = button.querySelector('.like-count');
  let currentLikes = parseInt(likeCountSpan.textContent);
  currentLikes++;
  likeCountSpan.textContent = currentLikes;
  localStorage.setItem(`likes_${postId}`, currentLikes);
}

// Mostrar/ocultar el menú de opciones
function toggleOptionsMenu(event) {
  event.stopPropagation(); // Evitar que el clic se propague
  const optionsMenu = event.target.nextElementSibling;

  document.querySelectorAll('.options-menu').forEach(menu => {
    if (menu !== optionsMenu) {
      menu.style.display = 'none';
    }
  });
  
  optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
}

// Cerrar el menú si se hace clic fuera
document.addEventListener('click', () => {
  document.querySelectorAll('.options-menu').forEach(menu => {
    menu.style.display = 'none';
  });
});

// Función para abrir la publicación en un modal
function abrirPublicacion(postId) {
  const post = postsData.find(p => p.id === postId);
  if (post) {
    document.getElementById('modal-title').innerText = post.title;  // Colocar el título en el modal
    document.getElementById('modal-content').innerHTML = post.content; // Colocar el contenido en el modal
    document.getElementById('modal').style.display = 'block'; // Mostrar el modal
  }
}


// Cerrar el modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Abrir la publicación en otra ventana
function abrirEnOtraVentana(postId) {
  const post = postsData.find(p => p.id === postId);
  if (post) {
    const newWindow = window.open("", `_blank`);
    newWindow.document.write(`
      <html>
        <head>
          <title>${post.title}</title>
          <style>body { font-family: Arial, sans-serif; padding: 20px; }</style>
        </head>
        <body>
          <h2>${post.title}</h2>
          ${post.content}
        </body>
      </html>
    `);
    newWindow.document.close();
  }
}

// Copiar el enlace de la publicación
function copiarEnlace(postId) {
  const url = `${window.location.origin}${window.location.pathname}?post=${postId}`;
  navigator.clipboard.writeText(url).then(() => {
    alert('Enlace copiado al portapapeles.');
  }).catch(err => {
    console.error('Error al copiar el enlace: ', err);
  });
}

// Iniciar la presentación desde una publicación
function iniciarPresentacion(postId) {
  currentSlideIndex = postsData.findIndex(p => p.id === postId);
  if (currentSlideIndex === -1) return;
  mostrarSlideshow();
  mostrarSlide(currentSlideIndex);
}

// Mostrar el slideshow
function mostrarSlideshow() {
  document.getElementById("slideshow").style.display = "block";
}

// Cerrar el slideshow al hacer clic fuera
document.getElementById("slideshow").addEventListener('click', (e) => {
  if (e.target.id === "slideshow") {
    document.getElementById("slideshow").style.display = "none";
  }
});

// Mostrar un slide específico
function mostrarSlide(index) {
  const slideContent = document.getElementById("slide-content");
  if (index >= postsData.length) { currentSlideIndex = 0; }
  if (index < 0) { currentSlideIndex = postsData.length - 1; }

  const post = postsData[currentSlideIndex];
  slideContent.innerHTML = `
    <h2>${post.title}</h2>
    ${post.content}
  `;
}

// Navegar entre diapositivas
function prevSlide() {
  currentSlideIndex--;
  mostrarSlide(currentSlideIndex);
}

function nextSlide() {
  currentSlideIndex++;
  mostrarSlide(currentSlideIndex);
}
