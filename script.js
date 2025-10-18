console.log("sript cargado");
// URLs de tu API Sheety
const apiCarreras = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdAppTdg/carreras'";
const apiEstudiantes = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdAppTdg/estudiantes'";

// 1️⃣ Cargar lista de carreras desde Google Sheets
fetch(apiCarreras)
  .then(response => response.json())
  .then(data => {
    const select = document.getElementById("carrera");
    data.carreras.forEach(c => {
      const option = document.createElement("option");
      option.value = c.nombreCarrera;
      option.textContent = c.nombreCarrera;
      select.appendChild(option);
    });
  })
  .catch(err => console.error("Error al cargar carreras:", err));

// 2️⃣ Enviar formulario y registrar estudiante
document.getElementById("registroForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const id_estudiante = document.getElementById("nombre").value;
  const nombre_estudiante= document.getElementById("nombre").value;
  const correo_estudiante= document.getElementById("correo").value;
  const nombre_carrera = document.getElementById("carrera").value;
  const modalidad = document.getElementById("modalidad").value;

  fetch(apiEstudiantes, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      estudiante: {
        id_estudiante,
        nombre_estudiante,
        correo_estudiante,
        nombre_carrera,
        modalidad,
        progreso: "0%",
        etapaActual: "Inicio"
      }
    })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("mensaje").textContent = "✅ Estudiante registrado con éxito.";
    document.getElementById("registroForm").reset();
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById("mensaje").textContent = "❌ Error al registrar estudiante.";
  });
});
