
const Resource= () => {
    return (
        <div className="flex flex-col p-8 bg-transparent">
            {/* Navegación */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <img 
                        src="https://image-resource.creatie.ai/152487613725585/152487613725587/75b3ef6bdbfeed6aa6499fc1a28b8188.png" 
                        alt="Logo" 
                        className="h-8 w-8" 
                    />
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="py-10">
                <h1 className="text-2xl font-bold mb-6">Agregar Nuevo Recurso Educativo</h1>
                <div className="space-y-6">
                    {/* Título del Recurso */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título del Recurso</label>
                        <input 
                            type="text" 
                            placeholder="Ingrese el título del recurso" 
                            className="block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea 
                            placeholder="Describa el recurso educativo" 
                            className="block w-full border border-gray-300 rounded-md p-2"
                        ></textarea>
                    </div>

                    {/* Curso Asignado y Tipo de Curso */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Curso Asignado</label>
                            <div className="relative">
                                <select className="block w-full border border-gray-300 rounded-md p-2">
                                    <option>Seleccione un curso</option>
                                    {/* Agrega más opciones según sea necesario */}
                                </select>
                                <img 
                                    src="https://image-resource.creatie.ai/152487613725585/152487613725587/ef0d5f9b0dd3ddc582782e4f4b44dd00.png" 
                                    alt="Icono" 
                                    className="absolute right-2 top-2 h-6 w-6" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Curso</label>
                            <div className="relative">
                                <select className="block w-full border border-gray-300 rounded-md p-2">
                                    <option>Seleccione un tipo</option>
                                    {/* Agrega más opciones según sea necesario */}
                                </select>
                                <img 
                                    src="https://image-resource.creatie.ai/152487613725585/152487613725587/ef0d5f9b0dd3ddc582782e4f4b44dd00.png" 
                                    alt="Icono" 
                                    className="absolute right-2 top-2 h-6 w-6" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Categorías de Aprendizaje */}
                    <div>
                        <h2 className="text-sm font-medium text-gray-700 mb-2">Categorías de Aprendizaje</h2>
                        <div className="flex items-center mb-2">
                            <input type="checkbox" className="mr-2" />
                            <label className="text-sm">Visual</label>
                        </div>
                        <div className="flex items-center mb-2">
                            <input type="checkbox" className="mr-2" />
                            <label className="text-sm">Auditivo</label>
                        </div>
                        <div className="flex items-center mb-2">
                            <input type="checkbox" className="mr-2" />
                            <label className="text-sm">Kinestésico</label>
                        </div>
                        <div className="flex items-center mb-2">
                            <input type="checkbox" className="mr-2" />
                            <label className="text-sm">Lectura/Escritura</label>
                        </div>
                    </div>

                    {/* Subir Archivos */}
                    <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center">
                        <div className="flex items-center mb-2">
                            <svg className="h-10 w-10 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                {/* SVG Content */}
                            </svg>
                        </div>
                        <p className="text-gray-500 mb-2">Arrastra y suelta archivos aquí (PDF, DOCX, o formatos de examen) o</p>
                        <button className="bg-white border border-gray-300 rounded-md px-4 py-2">
                            Seleccionar Archivos
                        </button>
                    </div>

                    {/* Botones de Guardar y Publicar */}
                    <div className="flex justify-end space-x-4">
                        <button className="bg-white border border-gray-300 rounded-md px-4 py-2">
                            Guardar Borrador
                        </button>
                        <button className="bg-blue-600 text-white rounded-md px-4 py-2">
                            Publicar Recurso
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resource;