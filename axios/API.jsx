import axios from "axios";

const [error, seterror] = useState("");


useEffect(() => {
    const getData = async () => {
        try {
            const { data } = await axios.get("https://pokeapi.co/");
            const { name, sprites} = data;

            setData({
                nombre: name,
                imagen: sprites.front_default,
            });
        } catch (error) {
            console.log(error);
            //setError(error)
            setError("Ha ocurrido un error al hacer la solicitud");
        }
    };
    getData();
}, []);


return (
    <> 
      {!error ? (
        <div className="carta-de-pokemon">
            <img src={imagen} alt={nombre} />
            <p>{nombre}</p>
        </div>
      ) :  (
        <p>{error}</p>

      )}
    </>
);