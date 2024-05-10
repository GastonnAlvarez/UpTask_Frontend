import { Link } from "react-router-dom";

export default function NotFoundView() {
    return (
        <>
            <h1 className="font-black text-center text-4xl text-white">Pagina NO encontrada</h1>
            <p className="mt-10 text-center text-white">
                Quizas quieras volver a {" "}
                <Link to='/' className="text-fuchsia-500">Proyectos</Link>
            </p>
        </>
    )
}
