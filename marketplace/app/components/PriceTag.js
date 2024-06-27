

const PriceTag = ({ price }) => {
    return (
        <div className="rounded-xl customOrange">
            <p className="text-lg p-1 text-white">{price}€</p>
        </div>
    );
}

export default PriceTag;