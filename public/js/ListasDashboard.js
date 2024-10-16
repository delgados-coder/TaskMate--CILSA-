document.addEventListener('DOMContentLoaded', () => {

  document.getElementById("formCrearLista").onsubmit = async (event) => {
    event.preventDefault();

    const nuevaLista = {
      nombre_lista: document.getElementById('nombreListaCrear').value,
      descripcion: document.getElementById('descripcionListaCrear').value
    };

    try {
      const response = await fetch(`listas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaLista)
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Error al crear la lista:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  document.querySelectorAll('.btn-ver').forEach(button => {
    button.addEventListener('click', async () => {
      const listaId = button.dataset.id;
      try {
        const response = await fetch(`id?id=${listaId}`);
        const lista = await response.json();
        console.log(lista);
        
        document.getElementById('verNombreLista').textContent = lista.nombre_lista;
        document.getElementById('verDescripcionLista').textContent = lista.descripcion;

        const modalVerLista = new bootstrap.Modal(document.getElementById('modalVerLista'));
        modalVerLista.show();
      } catch (error) {
        console.error('Error al obtener la lista:', error);
      }
    });
  });

  document.querySelectorAll('.btn-editar').forEach(button => {
    button.addEventListener('click', async () => {
      const listaId = button.dataset.id;

      try {
        const response = await fetch(`id?id=${listaId}`);
        const lista = await response.json();

        document.getElementById('editNombreLista').value = lista.nombre_lista;
        document.getElementById('editDescripcionLista').value = lista.descripcion;

        const modalEditarLista = new bootstrap.Modal(document.getElementById('modalEditarLista'));
        modalEditarLista.show();

        document.getElementById('formEditarLista').onsubmit = async (event) => {
          event.preventDefault();

          const updatedLista = {
            nombre_lista: document.getElementById('editNombreLista').value,
            descripcion: document.getElementById('editDescripcionLista').value
          };

          try {
            const response = await fetch(`id?id=${listaId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedLista)
            });

            if (response.ok) {
              window.location.reload();
            } else {
              console.error("Error al actualizar la lista:", response);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
      } catch (error) {
        console.error('Error al obtener la lista:', error);
      }
    });
  });

  document.querySelectorAll('.btn-eliminar').forEach(button => {
    button.addEventListener('click', async () => {
      const listaId = button.dataset.id;

      if (confirm("¿Estás seguro de que deseas eliminar esta lista?")) {
        try {
          const response = await fetch(`id?id=${listaId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          });

          if (response.ok) {
            window.location.reload();
          } else {
            console.error("Error al eliminar la lista:", response);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
  });
});
