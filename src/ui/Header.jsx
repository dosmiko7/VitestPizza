import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

const Header = () => {
	return (
		<header className="bg-yellow-500 uppercase">
			<Link to="/">The Vitest Pizza </Link>
			<SearchOrder />
		</header>
	);
};

export default Header;
