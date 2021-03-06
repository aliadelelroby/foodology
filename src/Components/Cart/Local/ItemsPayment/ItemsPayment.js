import React from "react";
import "./ItemsPayment.scss";
// Import Components
import { lazy } from "@lazy";
import { useSelector } from "react-redux";

function ItemsPayment() {
	// Redux
	const cartItems = useSelector(s => s.cartItems.all);

	// Maps
	const CartItemsApper = cartItems.map(
		({ id, images: { sub1 }, headline, price = "$10" }, index) => {
			return (
				<div
					className="col-4"
					data-aos="fade-up"
					data-aos-delay={index * 200}
					data-aos-offset="0"
					key={id}
				>
					<div className="item d-flex flex-column align-items-center text-center">
						<div className="image w-100 overflow-hidden d-flex flex-column align-items-center justify-content-center">
							<lazy.img src={sub1} alt="CartItem" />
						</div>
						<div className="headline mt-4">{headline}</div>
						<div className="price t5 mt-2">${price}.00</div>
					</div>
				</div>
			);
		}
	);
	return (
		<section className="items-payment">
			<div className="row">
				<div className="heading text-center">
					<h2 className="t2">Items & Payment</h2>
					<div className="title-top mt-4">
						{cartItems.length || "no"} items
					</div>
				</div>
			</div>
			<div className="list">
				<div className="row">{CartItemsApper}</div>
			</div>
		</section>
	);
}

export default ItemsPayment;
