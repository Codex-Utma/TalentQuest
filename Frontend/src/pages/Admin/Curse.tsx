
const Curse = () => {
    return (
        <div className="w-[1440px] h-[1024px] overflow-hidden bg-gray-50">
            {/* Encabezado */}
            <div className="absolute top-0 left-0 w-full h-[65px] bg-white border-b border-gray-300">
                <div className="flex flex-col justify-start items-start gap-2 px-8">
                    <div className="flex justify-between items-center w-full h-[64px]">
                        <div className="flex items-center">
                            <div className="w-[32px] h-[32px] bg-cover" 
                                 style={{ backgroundImage: "url('https://image-resource.creatie.ai/152487613725585/152487613725587/75b3ef6bdbfeed6aa6499fc1a28b8188.png')" }}>
                            </div>
                            <div className="ml-4 border-b-2 border-black">
                                <span className="text-black text-sm font-medium">Panel de Administración</span>
                            </div>
                        </div>
                        <div className="text-gray-700 text-lg">Admin: Juan Pérez</div>
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="absolute top-[65px] left-0 w-full h-[891px] flex flex-col gap-2 p-8">
                {/* Búsqueda y Filtros */}
                <div className="absolute top-8 left-8 w-[1376px] h-[196px]">
                    <div className="w-full h-full bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-lg font-medium">Búsqueda y Filtros</h2>
                        <div className="mt-4 flex gap-4">
                            {/* Campo de búsqueda */}
                            <div className="flex flex-col w-[276px]">
                                <label className="text-gray-700 text-sm font-medium">Buscar Usuario</label>
                                <div className="relative mt-2">
                                    <input type="text" 
                                           className="w-full h-[42px] p-2 pl-10 border border-gray-300 rounded" 
                                           placeholder="Nombre o ID" />
                                    <div className="absolute top-2 left-2">
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4a6 6 0 100 12 6 6 0 000-12zm0 0l6 6m-6-6l-6 6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Selección de estado */}
                            <div className="flex flex-col w-[276px]">
                                <label className="text-gray-700 text-sm font-medium">Estado</label>
                                <select className="mt-2 w-full h-[42px] border border-gray-300 rounded p-2">
                                    <option>Todos los estados</option>
                                    {/* Agregar más opciones aquí */}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lista de Usuarios */}
                <div className="absolute top-[260px] left-8 w-[1376px] h-[247px]">
                    <div className="w-full h-full bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-medium">Lista de Usuarios</h3>
                        <div className="overflow-hidden">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 p-4 text-left">Nombre</th>
                                        <th className="border border-gray-300 p-4 text-left">ID</th>
                                        <th className="border border-gray-300 p-4 text-left">Departamento</th>
                                        <th className="border border-gray-300 p-4 text-left">Cursos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-50">
                                        <td className="border border-gray-300 p-4">María González</td>
                                        <td className="border border-gray-300 p-4">USR001</td>
                                        <td className="border border-gray-300 p-4">Ventas</td>
                                        <td className="border border-gray-300 p-4">2 activos</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="border border-gray-300 p-4">Carlos Rodríguez</td>
                                        <td className="border border-gray-300 p-4">USR002</td>
                                        <td className="border border-gray-300 p-4">Marketing</td>
                                        <td className="border border-gray-300 p-4">1 activo</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Botones de Acción */}
                <div className="absolute top-[539px] left-8 w-[1376px] h-[42px] flex justify-end">
                    <button className="flex items-center border border-gray-300 rounded px-4 py-2 mr-4">
                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16v4a2 2 0 002 2h14a2 2 0 002-2v-4m-8-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Exportar Reporte
                    </button>
                    <button className="bg-black text-white rounded px-4 py-2 flex items-center">
                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16v4a2 2 0 002 2h14a2 2 0 002-2v-4m-8-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Curse;
