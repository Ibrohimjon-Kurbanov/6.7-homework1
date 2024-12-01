import "./App.css";
import { useState, useEffect } from "react";
import { https } from "./axios";
import Card from "./components/Card";
import { BounceLoader } from "react-spinners";
function App() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesc] = useState("");
  useEffect(() => {
    setLoading(true);
    https
      .get("products/all")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setPhones(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  function handleSend(e) {
    e.preventDefault();
    const phone = {
      name,
      price,
      description,
      status: "active",
      category_id: "2",
    };
    https
      .post("products/", phone, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          let copied = [...phones];
          copied.push(response.data);
          setPhones(copied);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setName("");
        setPrice("");
        setDesc("");
      });
  }
  function handleDelete(id) {
    let isDelete = confirm("Rostdan ham ochirmoqchimisiz ?");
    if (isDelete && id) {
      https
        .delete(`products/${id}`)
        .then((response) => {
          if (response.status == 200) {
            let copied = [...phones];
            copied = copied.filter((phone) => {
              return phone.id !== id;
            });

            setPhones(copied);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Ochirilmadi");
    }
  }
  return (
    <>
      <div className="container">
        <div className="form-wrapper">
          <form action="">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              id="fname"
              name="firstname"
              placeholder="Enter phone name.."
            />

            <input
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              type="text"
              id="lname"
              name="lastname"
              placeholder="Enter phone price.."
            />
            <textarea
              value={description}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              placeholder="Enter description.."
            ></textarea>
            <button onClick={handleSend} className="btn">
              Send
            </button>
          </form>
        </div>
        <div className="card-wrapper">
          {!loading &&
            phones.length > 0 &&
            phones.map((phone, index) => (
              <Card deleteItem={handleDelete} key={index} phone={phone}></Card>
            ))}
          {loading && (
            <div className="loading">
              <BounceLoader color="#36d7b7" size={70} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
