/**
 * Carga los partials HTML e inyecta su contenido en los elementos
 * del DOM correspondientes.
 */
export async function loadPartials() {
  const partials = [
    { id: 'app-header',  file: 'partials/header.html' },
    { id: 'app-sidebar', file: 'partials/sidebar.html' },
    { id: 'app-footer',  file: 'partials/footer.html' },
  ];

  await Promise.all(
    partials.map(async ({ id, file }) => {
      const res  = await fetch(file);
      const html = await res.text();
      const el   = document.getElementById(id);
      if (el) el.innerHTML = html;
    })
  );
}
