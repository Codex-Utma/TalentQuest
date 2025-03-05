
const Newmodule = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Navegación */}
            <nav className="bg-white shadow">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <img className="h-8 w-auto" src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png" alt="Logo" />
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <a href="#" className="border-custom text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Cursos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Contenido Principal */}
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Nuevo Módulo</h1>
                    <div className="mt-2 text-sm text-gray-500">
                        <span>Cursos</span>
                        <span className="mx-2">/</span>
                        <span>Desarrollo Web</span>
                        <span className="mx-2">/</span>
                        <span>Módulos</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="col-span-1">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Detalles del Módulo</h2>
                            <form>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Título del Módulo</label>
                                        <input type="text"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom sm:text-sm"
                                            placeholder="Introducción a HTML" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Descripción</label>
                                        <textarea rows={4}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom sm:text-sm"
                                            placeholder="Describe el contenido del módulo..."></textarea>
                                        <button className="bg-black text-white rounded px-4 py-2 flex items-center">
                                            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16v4a2 2 0 002 2h14a2 2 0 002-2v-4m-8-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Guardar Cambios
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newmodule;
