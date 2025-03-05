import React from 'react';
import * as echarts from 'echarts';

const AdministratorPage: React.FC = () => {
    React.useEffect(() => {
        // Department Progress Chart
        const departmentChart = echarts.init(document.getElementById('departmentChart') as HTMLElement);
        departmentChart.setOption({
            animation: false,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['Ventas', 'Marketing', 'RR.HH.', 'Operaciones', 'TI']
            },
            series: [
                {
                    name: 'Progreso',
                    type: 'bar',
                    data: [85, 75, 65, 55, 90],
                    itemStyle: {
                        color: '#1B9AF5'
                    }
                }
            ]
        });

        // Course Completion Chart
        const completionChart = echarts.init(document.getElementById('completionChart') as HTMLElement);
        completionChart.setOption({
            animation: false,
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Estado de Cursos',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 48, name: 'Completados' },
                        { value: 32, name: 'En Progreso' },
                        { value: 20, name: 'No Iniciados' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });

        // Responsive charts
        window.addEventListener('resize', function () {
            departmentChart.resize();
            completionChart.resize();
        });
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg fixed h-full">
                <div className="p-6">
                    <img src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png" alt="Logo" className="h-8" />
                </div>
                <nav className="mt-6">
                    <a href="#" className="flex items-center px-6 py-3 text-custom bg-blue-50">
                        <i className="fas fa-chart-line w-5 h-5 mr-3"></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
                        <i className="fas fa-users w-5 h-5 mr-3"></i>
                        <span>Trabajadores</span>
                    </a>
                    <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
                        <i className="fas fa-graduation-cap w-5 h-5 mr-3"></i>
                        <span>Cursos</span>
                    </a>
                    <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
                        <i className="fas fa-chart-bar w-5 h-5 mr-3"></i>
                        <span>Reportes</span>
                    </a>
                    <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
                        <i className="fas fa-cog w-5 h-5 mr-3"></i>
                        <span>Configuración</span>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex-1 flex items-center">
                                <div className="w-full max-w-lg lg:max-w-xs">
                                    <label htmlFor="search" className="sr-only">Buscar</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-search text-gray-400"></i>
                                        </div>
                                        <input id="search" className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-custom focus:border-custom sm:text-sm" placeholder="Buscar trabajadores o cursos..." type="search" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                                    <i className="fas fa-bell text-xl"></i>
                                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                                </button>
                                <div className="ml-4 relative flex-shrink-0">
                                    <div className="flex items-center">
                                        <img className="h-8 w-8 rounded-full" src="https://creatie.ai/ai/api/search-image?query=A professional headshot of a business person with a warm smile, wearing formal attire, against a neutral background&width=100&height=100&orientation=squarish&flag=32585e0a-2f96-4b93-addd-1c48e5cc5f34" alt="" />
                                        <span className="ml-3 text-sm font-medium text-gray-700">Admin</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Quick Actions */}
                    <div className="mb-8">
                        <div className="flex space-x-4">
                            <button className="rounded bg-custom text-white px-4 py-2 flex items-center">
                                <i className="fas fa-plus mr-2"></i>
                                Asignar Curso
                            </button>
                            <button className="rounded bg-white border border-gray-200 text-gray-700 px-4 py-2 flex items-center">
                                <i className="fas fa-user-plus mr-2"></i>
                                Nuevo Trabajador
                            </button>
                            <button className="rounded bg-white border border-gray-200 text-gray-700 px-4 py-2 flex items-center">
                                <i className="fas fa-file-alt mr-2"></i>
                                Generar Reporte
                            </button>
                        </div>
                    </div>
                </main>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { icon: "fas fa-users", label: "Total Trabajadores", value: "248" },
                        { icon: "fas fa-graduation-cap", label: "Cursos Activos", value: "36" },
                        { icon: "fas fa-chart-line", label: "Tasa de Finalización", value: "78%" },
                        { icon: "fas fa-clock", label: "Horas de Formación", value: "1,234" },
                    ].map((stat, index) => (
                        <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5 flex items-center">
                                <div className="flex-shrink-0">
                                    <i className={`${stat.icon} text-custom text-3xl`}></i>
                                </div>
                                <div className="ml-5 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                                        <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {[
                        { title: "Progreso por Departamento", id: "departmentChart" },
                        { title: "Completación de Cursos", id: "completionChart" },
                    ].map((chart, index) => (
                        <div key={index} className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">{chart.title}</h3>
                            <div id={chart.id} style={{ height: "300px" }}></div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="mt-8">
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Actividad Reciente</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {["Trabajador", "Curso", "Progreso", "Estado", "Última Actividad"].map((header) => (
                                            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[
                                        {
                                            name: "Ana García",
                                            dept: "Recursos Humanos",
                                            img: "https://creatie.ai/ai/api/search-image?query=A professional headshot of a young business woman...",
                                            course: "Gestión de Talento",
                                            progress: "75%",
                                            status: "En Progreso",
                                            lastActivity: "Hace 2 horas",
                                        },
                                        {
                                            name: "Carlos Rodríguez",
                                            dept: "Ventas",
                                            img: "https://creatie.ai/ai/api/search-image?query=A professional headshot of a middle-aged business man...",
                                            course: "Técnicas de Venta Avanzadas",
                                            progress: "90%",
                                            status: "En Progreso",
                                            lastActivity: "Hace 4 horas",
                                        },
                                        {
                                            name: "María López",
                                            dept: "Marketing",
                                            img: "https://creatie.ai/ai/api/search-image?query=A professional headshot of a young business woman...",
                                            course: "Marketing Digital",
                                            progress: "100%",
                                            status: "Completado",
                                            lastActivity: "Hace 1 día",
                                        },
                                    ].map((activity, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <img className="h-10 w-10 rounded-full" src={activity.img} alt="" />
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                                                        <div className="text-sm text-gray-500">{activity.dept}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{activity.course}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div className="bg-custom h-2.5 rounded-full" style={{ width: activity.progress }}></div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${activity.status === "Completado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                                    }`}>
                                                    {activity.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {activity.lastActivity}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
    
            </div>
        );
    };
    
    export default AdministratorPage
    