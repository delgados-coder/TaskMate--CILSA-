document.addEventListener('DOMContentLoaded', () => {

  const modalCrear = document.getElementById("modalCrear");
  modalCrear.addEventListener('show.bs.modal', async () => {});

  document.getElementById("formCrear").onsubmit = async (event) => {
    event.preventDefault();

    const nuevaCategoria = {
      nombre_categoria: document.getElementById('nombreCategoriaCrear').value,
      descripcion: document.getElementById('descripcionCategoriaCrear').value
    };

      const crearResponse = await fetch(``, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaCategoria)
      });
      if (crearResponse.ok) {
        modalCrear.querySelector('.btn-close').click();
        window.location.reload();
      } else {
        console.error("Error al crear la categoría:", crearResponse);
      }
  };

  document.querySelectorAll('.btn-ver').forEach(button => {
    button.addEventListener('click', async () => {
      const categoriaId = button.dataset.id;

      try {
        const response = await fetch(`id?id=${categoriaId}`);
        const categoria = await response.json();

        document.getElementById('verNombreCategoria').textContent = categoria.nombre_categoria;
        document.getElementById('verDescripcionCategoria').textContent = categoria.descripcion;

        const modalVer = new bootstrap.Modal(document.getElementById('modalVer'));
        modalVer.show();
      } catch (error) {
        console.error('Error al obtener la categoría:', error);
      }
    });
  });

  document.querySelectorAll('.btn-editar').forEach(button => {
    button.addEventListener('click', async () => {
      const categoriaId = button.dataset.id;

      try {
        const response = await fetch(`id?id=${categoriaId}`);
        const categoria = await response.json();

        document.getElementById('editNombreCategoria').value = categoria.nombre_categoria;
        document.getElementById('editDescripcionCategoria').value = categoria.descripcion;

        const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
        modalEditar.show();

        document.getElementById('formEditar').onsubmit = async (event) => {
          event.preventDefault();

          const updatedCategoria = {
            nombre_categoria: document.getElementById('editNombreCategoria').value,
            descripcion: document.getElementById('editDescripcionCategoria').value
          };

          try {
            const editarResponse = await fetch(`id?id=${categoriaId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedCategoria)
            });

            if (editarResponse.ok) {
              window.location.reload();
            } else {
              console.error('Error al editar la categoría:', editarResponse.statusText);
            }
          } catch (error) {
            console.error('Error al editar la categoría:', error);
          }
        };

      } catch (error) {
        console.error('Error al obtener la categoría:', error);
      }
    });
  });

  document.querySelectorAll('.btn-eliminar').forEach(button => {
    button.addEventListener('click', async () => {
      const categoriaId = button.dataset.id;

      if (confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
        try {
          const response = await fetch(`id?id=${categoriaId}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            window.location.reload();
          } else {
            console.error('Error al eliminar la categoría:', response.statusText);
          }
        } catch (error) {
          console.error('Error al eliminar la categoría:', error);
        }
      }
    });
  });

});
