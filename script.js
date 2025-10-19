console.log("sript cargado");
// URLs de tu API Sheety
// --- CONEXIÓN CON GOOGLE SHEET ---
const SHEET_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdAppTdg"; // tu endpoint generado con Sheety o Apps Script
const estudiantes_ENDPOINT = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdAppTdg/estudiantes";
const asesores_ENDPOINT = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdAppTdg/asesores";
const fase_ENDPOINT = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdAppTdg/fase";
const modalidad_ENDPOINT = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdAppTdg/modalidad";
const comision_ENDPOINT = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdAppTdg/comision";

// --- CAPTURA DE FORMULARIO ---
document.getElementById("registroForm").addEventListener("submit", function (e) {
  e.preventDefault();
  registrarEstudiante();
});

// --- FUNCIÓN: Registrar nuevo estudiante ---
async function registrarEstudiante() {
  const estudiante = {
    id_estudiante: document.getElementById("id_estudiante").value,
    nombre_estudiante: document.getElementById("nombre_estudiante").value,
    correo_estudiante: document.getElementById("correo_estudiante").value,
    telefono_estudiante: document.getElementById("telefono_estudiante").value,
    nombre_carrera: document.querySelector("#nombre_carrera option:checked").textContent,
    nombre_modalidad: document.getElementById("nombre_modalidad").value,
    etapa_actual: "Inicio",
    progreso: 0,
    documentos: ""
  };

  try {
    const res = await fetch(estudiantes_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estudiante })
    });
    if (res.ok) {
      alert("✅ Estudiante registrado con éxito.");
      document.getElementById("form-estudiante").reset();
    } else {
      alert("⚠️ Error al registrar estudiante.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
