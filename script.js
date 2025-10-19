console.log("✅ Script cargado correctamente");

// --- URL de tu API Sheety ---
const estudiantes_ENDPOINT = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdAppTdg/estudiantes";

// --- CAPTURA DEL FORMULARIO ---
document.getElementById("registroForm").addEventListener("submit", function (e) {
  e.preventDefault();
  registrarEstudiante();
});

// --- FUNCIÓN PARA REGISTRAR UN ESTUDIANTE ---
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
      // 👇 El objeto raíz debe coincidir con el nombre de la hoja
      body: JSON.stringify({ estudiantes: estudiante })
    });

    if (res.ok) {
      alert("✅ Estudiante registrado con éxito.");
      document.getElementById("registroForm").reset();
    } else {
      const errorText = await res.text();
      console.error("⚠️ Error en respuesta:", errorText);
      alert("❌ Error al registrar estudiante. Revisa la consola (F12).");
    }
  } catch (error) {
    console.error("🚨 Error de conexión:", error);
    alert("❌ No se pudo conectar con Sheety. Revisa tu endpoint o conexión.");
  }
