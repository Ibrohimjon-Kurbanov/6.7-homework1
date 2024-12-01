import "./index.css";

function Card(props) {
  const { name, price, description, id } = props.phone;
  const { deleteItem } = props;
  return (
    <div className="card">
      <h3>Name: {name}</h3>
      <h3>Price: {price}</h3>
      <h3>Desc: {description}</h3>
      <button
        onClick={() => {
          deleteItem(id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Card;
