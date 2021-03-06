import React, { useState } from "react";
import "./Navbar.scss";
// Import Components
import StrokeButton from "../StrokeButton/StrokeButton";
import CartItem from "@global/CartItem/CartItem";
import { Link } from "react-router-dom";
import { logout } from "@redux/actions/userSlice";
import { useSelector, useDispatch } from "react-redux";
// Import Assets
import logo from "./assets/logo.svg";
import cartIcn from "./assets/cart.svg";
import menuIcn from "./assets/menu.svg";

function Navbar({ menu, list }) {
	// Redux
	const dispatch = useDispatch();
	const cartItems = useSelector(s => s.cartItems.all);
	const auth = useSelector(s => s.auth);

	// States
	const [toggleCart, setToggleCart] = useState(false);
	const [toggleUser, setToggleUser] = useState(false);

	// Constants
	const visibleName = auth.check
		? auth.data.displayName
				.split(" ")
				.slice(0, 2)
				.join(" ")
		: "";

	// Functions
	function Cart() {
		setToggleCart(prev => !prev);
		setToggleUser(false);
	}

	function User() {
		setToggleUser(prev => !prev);
		setToggleCart(false);
	}

	// Maps
	const ListOfElements = list
		? list.map(({ value, href, pc = true }, index) => {
				if (pc) {
					return (
						<li key={index}>
							<Link to={href}>{value}</Link>
						</li>
					);
				} else {
					return false;
				}
		  })
		: null;

	const cartItemsMap = cartItems.map(el => {
		return <CartItem key={el.id} data={el} />;
	});
	return (
		// Start Main Navbar
		<div className="main-navbar d-flex align-items-center w-100">
			{/* Menu Icon */}
			<div className="menu d-flex d-lg-none me-2 me-md-3 " onClick={menu}>
				<img src={menuIcn} alt="menu-icon" />
			</div>

			{/* Logo */}
			<div className="logo flex-grow-1">
				<Link to={process.env.REACT_APP_LINK_START_WITH}>
					<img src={logo} alt="logo" />
				</Link>
			</div>

			{/* Links */}
			<div className="links d-none d-lg-block">
				<ul>{ListOfElements}</ul>
			</div>

			{/* Check If Auth Visible User Icon And Hide Login Button  */}
			{auth.check ? (
				<div className="user d-flex align-items-center justify-content-center">
					<div className="icon" onClick={User}>
						<ion-icon name="person" />
					</div>

					{/* Menu For User Icon */}
					<div
						className={`menu-user ${
							toggleUser ? "" : "hide"
						} d-flex flex-column`}
					>
						<div className="name d-flex text-center align-items-center justify-content-center">
							Hello
							<div className="val ms-1">{visibleName}</div>
						</div>
						<div className="logout d-flex align-items-end justify-content-center">
							<Link
								to={`${process.env.REACT_APP_LINK_START_WITH}`}
								onClick={_ => dispatch(logout())}
							>
								Logout
							</Link>
						</div>
					</div>
				</div>
			) : (
				<Link to={`${process.env.REACT_APP_LINK_START_WITH}/login`}>
					<StrokeButton val="Sign In" />
				</Link>
			)}

			{/* Cart Icon */}
			<div className="cart d-flex align-items-center justify-content-center">
				<img src={cartIcn} alt="cartIcon" onClick={Cart} />

				{/* Menu For Cart Icon */}
				<div
					className={`menu-cart ${
						toggleCart ? "" : "hide"
					} d-flex flex-column`}
				>
					<div className="list flex-grow-1 h-100">
						{cartItemsMap.length ? (
							cartItemsMap
						) : (
							<div className="t5 text-center h-100 d-flex align-items-center">
								There is no food in the cart !
							</div>
						)}
					</div>
					<div className="see-more d-flex align-items-end justify-content-center">
						<Link
							to={`${process.env.REACT_APP_LINK_START_WITH}/cart`}
							onClick={Cart}
						>
							Cart Items
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
