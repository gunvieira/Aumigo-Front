import {Link} from "react-router";

export default function Logo() {
    return (
        <div>
            <Link to="/">
            <img
                src="/logo.svg"
                alt="Logo"
                className="h-12 w-auto hover:contrast-75 cursor-default fill-emerald-400"
            />
            </Link>
        </div>

    );
}
