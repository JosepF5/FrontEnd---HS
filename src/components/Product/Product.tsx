import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {RootState} from "../../app/store";
import ProductCard from "../Product/ProductCard";
import {addProduct,getProducts} from "../../features/productSlice";
import {postProduct,getAllProducts} from "../../actions/productActions";

function Product() {
  const [productName, setProductName] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [productMinAmount, setProductMinAmount] = useState("");
  const [productMaxAmount, setProductMaxAmount] = useState("");
  const [productProvider, setProductProvider] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");

  type productType = {
    idProduct: string,
    nameProduct: string;
    amountProduct: number;
    minAmountProduct: number;
    maxAmountProduct: number,
    providersProduct: string;
    descriptionProduct: string;
    priceProduct: number;
  }

  const products=useSelector(
    (state:RootState)=>state.products
  )

  const dispatch=useDispatch();

  useEffect(()=>{
    getAllProducts().then((res)=>{
        dispatch(getProducts(res));
    }
    )
  },[]);

  const handleAddProducts=()=>{
    if(!productName&&
      !productAmount&&
      !productMinAmount&&
      !productMaxAmount&&
      !productProvider&&
      !productDescription&&
      !productPrice
      )return;
      postProduct(productName,
        parseInt(productAmount),
        parseInt(productMinAmount),
        parseInt(productMaxAmount),
        productProvider,
        productDescription,
        parseInt(productPrice))
      .then((res)=>{
        dispatch(addProduct(res));
      })
      setProductName("")
      setProductAmount("")
      setProductMinAmount("")
      setProductMaxAmount("")
      setProductProvider("")
      setProductDescription("")
      setProductPrice("")
  }
  return (
    <div>
       <h1>PRODUCTS</h1>
      {products.map((product:productType) => {
                return (
                <ProductCard key={product.idProduct}
                  nameProduct={product.nameProduct}
                  amountProduct={product.amountProduct}
                  minAmountProduct={product.minAmountProduct}
                  maxAmountProduct={product.maxAmountProduct}
                  providersProduct={product.providersProduct}
                  descriptionProduct={product.descriptionProduct}
                  priceProduct={product.priceProduct} 
                  idProduct={product.idProduct}
                  />)
      })}
      <div className="reservation-input-container">
        <p>Name</p>
        <input
            value={productName}
            onChange={(e)=>setProductName(e.target.value)}
        />
        <p>Amount</p>
        <input
            value={productAmount}
            onChange={(e)=>setProductAmount(e.target.value)}
        />
        <p>Minimun Amount</p>
        <input
            value={productMinAmount}
            onChange={(e)=>setProductMinAmount(e.target.value)}
        />
        <p>Maximum Amount</p>
        <input
            value={productMaxAmount}
            onChange={(e)=>setProductMaxAmount(e.target.value)}
        />
        <p>Provider</p>
        <input
            value={productProvider}
            onChange={(e)=>setProductProvider(e.target.value)}
        />
        <p>Description</p>
        <input
            value={productDescription}
            onChange={(e)=>setProductDescription(e.target.value)}
        />
        <p>Price</p>
        <input
            value={productPrice}
            onChange={(e)=>setProductPrice(e.target.value)}
        />
        <button onClick={handleAddProducts}>Add</button>
      </div>
    </div>
  )
}

export default Product
