import React, { useState } from "react";
import ReactECharts from "echarts-for-react";


const preguntas = [
    {
        categoria: "aprendizaje",
        pregunta: "¿Cómo prefieres estudiar un nuevo tema?",
        opciones: ["Leyendo y tomando notas", "Escuchando explicaciones", "Practicando y experimentando"],
        valores: [1, 0, 0],
    },
    {
        categoria: "aprendizaje",
        pregunta: "¿Qué método de estudio te ayuda más a recordar información?",
        opciones: ["Resúmenes y esquemas", "Repetición en voz alta", "Aprender haciendo"],
        valores: [1, 0, 0],
    },
    {
        categoria: "aprendizaje",
        pregunta: "Cuando aprendes algo nuevo, ¿qué te resulta más fácil?",
        opciones: ["Ver imágenes o diagramas", "Escuchar explicaciones", "Hacer ejercicios prácticos"],
        valores: [1, 0, 0],
    },
    {
        categoria: "aprendizaje",
        pregunta: "¿Cuál de estos entornos prefieres para aprender?",
        opciones: ["Un lugar tranquilo y sin distracciones", "Escuchando a alguien explicar", "Moviéndome y explorando"],
        valores: [1, 0, 0],
    },
    {
        categoria: "aprendizaje",
        pregunta: "¿Cómo recuerdas mejor la información?",
        opciones: ["Viendo imágenes o gráficos", "Escuchando explicaciones", "Haciendo actividades prácticas"],
        valores: [1, 0, 0],
    },
    {
        categoria: "aprendizaje",
        pregunta: "¿Qué tipo de material prefieres para estudiar?",
        opciones: ["Libros y artículos", "Podcasts y audios", "Videos y demostraciones"],
        valores: [1, 0, 0],
    },
    {
        categoria: "daltonismo",
        pregunta: "¿Puedes distinguir claramente estos colores? (Rojo y Verde)",
        opciones: ["Sí", "No"],
        valores: [0, 0],
    },
    {
        categoria: "daltonismo",
        pregunta: "¿Tienes dificultades para identificar colores en mapas o gráficos?",
        opciones: ["Sí", "No"],
        valores: [0, 0],
    },
    {
        categoria: "dislexia",
        pregunta: "¿Te resulta difícil seguir líneas de texto largas sin perderte?",
        opciones: ["Sí", "No"],
        valores: [0, 0],
    },
    {
        categoria: "dislexia",
        pregunta: "¿Confundes con frecuencia letras o palabras similares al leer?",
        opciones: ["Sí", "No"],
        valores: [0, 0],
    },
    {
        categoria: "dislexia",
        pregunta: "¿Sientes que leer en voz alta es más difícil que leer en silencio?",
        opciones: ["Sí", "No"],
        valores: [0, 0],
    },
];

const Questionnaire: React.FC = () => {
    const [indicePregunta, setIndicePregunta] = useState(0);
    const [respuestas, setRespuestas] = useState<any>({});
    const [terminado, setTerminado] = useState(false);

    const handleRespuesta = (index: number) => {
        setRespuestas({ ...respuestas, [indicePregunta]: index });
        if (indicePregunta < preguntas.length - 1) {
            setIndicePregunta(indicePregunta + 1);
        } else {
            setTerminado(true);
        }
    };

    const calcularEstilo = () => {
        let visual = 0;
        let auditivo = 0;
        let kinestesico = 0;

        Object.keys(respuestas).forEach((key) => {
            const pregunta = preguntas[parseInt(key)];
            const respuestaIndex = respuestas[key];
            visual += pregunta.valores[respuestaIndex] === 1 ? 1 : 0;
            auditivo += pregunta.valores[respuestaIndex] === 2 ? 1 : 0;
            kinestesico += pregunta.valores[respuestaIndex] === 3 ? 1 : 0;
        });

        return { visual, auditivo, kinestesico };
    };

    const { visual, auditivo, kinestesico } = calcularEstilo();
    const estiloPredominante = visual > auditivo && visual > kinestesico ? "Visual" : auditivo > kinestesico ? "Auditivo" : "Kinestésico";

    const chartOptions = {
        radar: {
            indicator: [
                { name: "Visual", max: 100 },
                { name: "Auditivo", max: 100 },
                { name: "Kinestésico", max: 100 },
            ],
        },
        series: [{
            type: "radar",
            data: [{
                value: [visual, auditivo, kinestesico],
                name: "Estilos de aprendizaje",
                areaStyle: { color: "rgba(27, 154, 245, 0.2)" },
            }],
        }],
    };

    return (
        
        <div className="bg-gradient-to-b from-blue-500 to-blue-700 min-h-screen flex flex-col items-center justify-center p-6 text-white">
            {/* Navbar */}
            <nav className="bg-blue-800 w-full py-4 shadow-lg flex justify-center items-center">
                <img src="" alt="Logo" className="h-10" />
            </nav>

            <div className="flex-grow flex flex-col items-center justify-center w-full">
                <h1 className="text-4xl font-bold mb-6 text-center">Cuestionario de Aprendizaje</h1>
                {!terminado ? (
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl text-gray-900">
                        <h2 className="text-2xl font-semibold mb-6 text-center">{preguntas[indicePregunta].pregunta}</h2>
                        <div className="space-y-4">
                            {preguntas[indicePregunta].opciones.map((opcion, index) => (
                                <button
                                    key={index}
                                    className="w-full px-5 py-3 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
                                    onClick={() => handleRespuesta(index)}
                                >
                                    {opcion}
                                </button>
                            ))}
                        </div>
                        <p className="mt-6 text-gray-600 text-center">Pregunta {indicePregunta + 1} de {preguntas.length}</p>
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl text-center text-gray-900">
                        <h2 className="text-3xl font-bold">Resultados</h2>
                        <p className="text-lg mt-3">Tu estilo predominante es: <span className="text-blue-500 font-semibold">{estiloPredominante}</span></p>
                        <ReactECharts option={chartOptions} style={{ height: "250px", marginTop: "20px" }} />
                        <button className="mt-6 px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                            Continuar al curso
                        </button>
                    </div>
                )}
            </div>
        </div>
    
    );
};

export default Questionnaire;