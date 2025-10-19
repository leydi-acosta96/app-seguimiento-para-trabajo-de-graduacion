console.log("✅ Script cargado correctamente");

// ✅ Endpoint exacto de tu hoja “estudiantes”
const ENDPOINT = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdAppTdg/estudiantes";

// Captura del formulario
document.getElementById("registroForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Datos del formulario
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

  console.log("📤 Enviando datos:", estudiante);

  try {
    // 👇 Aquí está el cambio importante (singular)
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estudiante }) 
    });

    const data = await res.json();
    console.log("📥 Respuesta de Sheety:", data);

    if (res.ok) {
      alert("✅ Estudiante registrado con éxito.");
      document.getElementById("registroForm").reset();
    } else {
      alert("⚠️ Error al registrar estudiante: " + JSON.stringify(data));
    }
  } catch (error) {
    console.error("🚨 Error de conexión:", error);
    alert("No se pudo conectar con Sheety. Revisa la consola (F12).");
  }
});
