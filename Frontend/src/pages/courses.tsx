import React from 'react';

const MisCursos = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="bg-white shadow">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-auto"
                  src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
                  alt="Logo"
                />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-custom text-custom border-b-2 inline-flex items-center px-1 pt-1 text-sm font-medium">Mis Cursos</a>
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">Calendario</a>
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">Recursos</a>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700">
                <i className="fas fa-bell"></i>
              </button>
              <div className="ml-3 relative flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://creatie.ai/ai/api/search-image?query=professional headshot of a young latin person smiling at camera"
                  alt="Usuario"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Barra lateral */}
          <aside className="col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300">
                    <option>Todos</option>
                    <option>En progreso</option>
                    <option>Completados</option>
                    <option>No iniciados</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoría</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300">
                    <option>Todas</option>
                    <option>Programación</option>
                    <option>Diseño</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                  <input type="date" className="mt-1 block w-full rounded-md border-gray-300" />
                </div>
              </div>
            </div>
          </aside>
          
          {/* Contenido principal */}
          <section className="col-span-9">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900">Cursos Activos</h2>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <img className="h-48 w-full object-cover" src="https://via.placeholder.com/600x400" alt="Curso" />
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">Desarrollo Web Avanzado</h3>
                    <p className="mt-2 text-sm text-gray-500">75% completado</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <img className="h-48 w-full object-cover" src="https://via.placeholder.com/600x400" alt="Curso" />
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">Introducción a Data Science</h3>
                    <p className="mt-2 text-sm text-gray-500">50% completado</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MisCursos;
