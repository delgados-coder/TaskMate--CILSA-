const apiURL = "http://127.0.0.1:3333/api/v2/";

document.addEventListener('DOMContentLoaded', () => {

  async function cargarCategoriasYListas(modal) {
    try {
      const [categoriasRes, listasRes] = await Promise.all([
        fetch(apiURL + "categorias"),
        fetch(apiURL + "listas")
      ]);

      const categorias = await categoriasRes.json();
      const listas = await listasRes.json();

      const categoriasSelect = modal.querySelector("#categorias-select, #categoriasCrear-select");
      const listasSelect = modal.querySelector("#listas-select, #listasCrear-select");

      categoriasSelect.innerHTML = "";
      listasSelect.innerHTML = "";

      categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria.id;
        option.textContent = categoria.nombre_categoria;
        categoriasSelect.appendChild(option);
      });

      listas.forEach(lista => {
        const option = document.createElement("option");
        option.value = lista.id;
        option.textContent = lista.nombre_lista;
        listasSelect.appendChild(option);
      });

    } catch (error) {
      console.error("Error al cargar categorías o listas:", error);
    }
  }

  const modalCrear = document.getElementById("modalCrear");
  modalCrear.addEventListener('show.bs.modal', async () => {
    await cargarCategoriasYListas(modalCrear);
  });

  document.getElementById("formCrear").onsubmit = async (event) => {
    event.preventDefault();

    const nuevaTarea = {
      titulo: document.getElementById('tituloCrear').value,
      descripcion: document.getElementById('descripcionCrear').value,
      estado: false,
      id_categoria: parseInt(document.getElementById('categoriasCrear-select').value, 10),
      id_lista: parseInt(document.getElementById('listasCrear-select').value, 10)
    };

    try {
      const crearResponse = await fetch(`${apiURL}tareas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaTarea)
      });

      if (crearResponse.ok) {
        const tareaCreada = await crearResponse.json();
        modalCrear.querySelector('.btn-close').click();
        window.location.reload();
      } else {
        console.error("Error al crear la tarea:", crearResponse);
      }
    } catch (error) {
      console.error("Error al enviar la tarea:", error);
    }
  };

  document.querySelectorAll('.btn-ver').forEach(button => {
    button.addEventListener('click', async () => {
      const tareaId = button.dataset.id;

      try {
        const response = await fetch(`${apiURL}tareas/${tareaId}`);
        const tarea = await response.json();

        document.getElementById('verTitulo').textContent = tarea.titulo;
        document.getElementById('verDescripcion').textContent = tarea.descripcion;
        document.getElementById('verEstado').textContent = tarea.estado;
        document.getElementById('verFechaCreacion').textContent = tarea.created_at;
        document.getElementById('verFechaModificacion').textContent = tarea.updated_at;
        document.getElementById('verCategoria').textContent = tarea.categoria.nombre_categoria;
        document.getElementById('verLista').textContent = tarea.lista.nombre_lista;

        const modalVer = new bootstrap.Modal(document.getElementById('modalVer'));
        modalVer.show();

      } catch (error) {
        console.error('Error al obtener la tarea:', error);
      }
    });
  });

  document.querySelectorAll('.btn-editar').forEach(button => {
    button.addEventListener('click', async () => {
      const tareaId = button.dataset.id;

      await cargarCategoriasYListas(document.getElementById('modalEditar'));

      try {
        const response = await fetch(`${apiURL}tareas/${tareaId}`);
        const tarea = await response.json();

        document.getElementById('editTitulo').value = tarea.titulo;
        document.getElementById('editDescripcion').value = tarea.descripcion;
        document.getElementById('categorias-select').value = tarea.id_categoria;
        document.getElementById('listas-select').value = tarea.id_lista;

        const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
        modalEditar.show();

        document.getElementById('formEditar').onsubmit = async (event) => {
          event.preventDefault();

          const updatedTarea = {
            titulo: document.getElementById('editTitulo').value,
            descripcion: document.getElementById('editDescripcion').value,
            id_categoria: parseInt(document.getElementById('categorias-select').value, 10),
            id_lista: parseInt(document.getElementById('listas-select').value, 10)
          };

          try {
            const editarResponse = await fetch(`${apiURL}tareas/${tareaId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedTarea)
            });

            if (editarResponse.ok) {
              window.location.reload();
            } else {
              console.error('Error al editar la tarea:', editarResponse.statusText);
            }
          } catch (error) {
            console.error('Error al editar la tarea:', error);
          }
        };

      } catch (error) {
        console.error('Error al obtener la tarea:', error);
      }
    });
  });

  document.querySelectorAll('.btn-eliminar').forEach(button => {
    button.addEventListener('click', async () => {
      const tareaId = button.dataset.id;

      if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
        try {
          await fetch(`${apiURL}tareas/${tareaId}`, { method: 'DELETE' });
          window.location.reload();
        } catch (error) {
          console.error('Error al eliminar la tarea:', error);
        }
      }
    });
  });

  document.querySelectorAll('.btn-completado').forEach(button => {
    button.addEventListener('click', async () => {
      const tareaId = button.dataset.id;

      try {
        await fetch(`${apiURL}tareas/${tareaId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado: true })
        });

        window.location.reload();
      } catch (error) {
        console.error('Error al completar la tarea:', error);
      }
    });
  });

  document.querySelectorAll('.btn-pendiente').forEach(button => {
    button.addEventListener('click', async () => {
      const tareaId = button.dataset.id;

      try {
        await fetch(`${apiURL}tareas/${tareaId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado: false })
        });

        window.location.reload();
      } catch (error) {
        console.error('Error al marcar la tarea como pendiente:', error);
      }
    });
  });

});
