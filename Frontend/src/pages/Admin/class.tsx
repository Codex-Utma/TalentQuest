
const Class = () => {
    return (
        <div className="bg-gray-50 font-sans min-h-screen">
            {/* Encabezado */}
            <header className="bg-white shadow-sm">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0">
                            <img className="h-8 w-auto" src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png" alt="Logo" />
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <a href="#" className="text-custom hover:text-custom-700 px-3 py-2 rounded-md text-sm font-medium">Inicio</a>
                            <a href="#" className="text-gray-500 hover:text-custom-700 px-3 py-2 rounded-md text-sm font-medium">Servicios</a>
                            <a href="#" className="text-gray-500 hover:text-custom-700 px-3 py-2 rounded-md text-sm font-medium">Productos</a>
                            <a href="#" className="text-gray-500 hover:text-custom-700 px-3 py-2 rounded-md text-sm font-medium">Contacto</a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">Bienvenido a Nuestra Plataforma</h1>
                        <p className="text-lg text-gray-600 mb-8">Descubre nuestras soluciones innovadoras diseñadas para impulsar tu negocio al siguiente nivel.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <i className="fas fa-rocket text-custom text-2xl mb-4"></i>
                                <h3 className="text-xl font-semibold mb-2">Rápido Desarrollo</h3>
                                <p className="text-gray-600">Implementación ágil y eficiente de soluciones personalizadas.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <i className="fas fa-shield-alt text-custom text-2xl mb-4"></i>
                                <h3 className="text-xl font-semibold mb-2">Máxima Seguridad</h3>
                                <p className="text-gray-600">Protección avanzada para tus datos y sistemas críticos.</p>
                            </div>
                        </div>
                    </div>

                    <aside className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4">Últimas Noticias</h2>
                        <div className="space-y-4">
                            <div className="border-b border-gray-200 pb-4">
                                <h3 className="text-sm font-medium">Nueva Actualización Disponible</h3>
                                <p className="text-sm text-gray-500 mt-1">Mejoras significativas en el rendimiento y la seguridad.</p>
                            </div>
                            <div className="border-b border-gray-200 pb-4">
                                <h3 className="text-sm font-medium">Próximo Evento Virtual</h3>
                                <p className="text-sm text-gray-500 mt-1">Únete a nuestro webinar sobre tendencias tecnológicas.</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>


        </div>
    );
};

export default Class;
