console.log("✅ Script cargado correctamente");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwUbS61rf4IGws2FKaDFZyp7QsFhmdFVzfJyRtE4LsuMRgVpetd0DuoHOx-hq3HRLkX/exec"; // URL que copiaste

document.getElementById("registroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

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
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ estudiante })
    });
    const data = await res.json();
    document.getElementById("mensaje").textContent = "✅ " + data.message;
    document.getElementById("registroForm").reset();
  } catch (err) {
    console.error(err);
    document.getElementById("mensaje").textContent = "⚠️ Error al enviar los datos.";
  }
    
});
