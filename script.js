onsole.log("Script cargado correctamente ✅");

// --- CONEXIÓN CON GOOGLE SHEET ---
const ESTUDIANTES_ENDPOINT = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdAppTdg/estudiantes";

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
    const res = await fetch(ESTUDIANTES_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estudiante }) // ← IMPORTANTE: objeto raíz debe coincidir con tu hoja
    });

    if (res.ok) {
      document.getElementById("mensaje").innerText = "✅ Estudiante registrado con éxito.";
      document.getElementById("registroForm").reset();
    } else {
      const errorText = await res.text();
      console.error("Error al registrar:", errorText);
      document.getElementById("mensaje").innerText = "⚠️ Error al registrar estudiante.";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("mensaje").innerText = "❌ Error de conexión.";
  }
}
