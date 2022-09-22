import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ButtonComponent, ButtonComponentSm, ButtonComponentXsm } from "../../shared/components/Button/Button"
import { ImagesViewTimeline } from "../../shared/components/ImagesViewProfile/ImagesViewProfile";
import { Text32White, Text32Yellow, Title2White, Title2Yellow } from "../../shared/components/Label/Label";
import { LoadingScreen } from "../../shared/components/LoadingScreen/LoadingScreen";
import { PanicPopUpScreen, SuccessPopUpScreen } from "../../shared/components/PopUpScreen/PopUpScreen";
import { UseDep } from "../../shared/context/ContextDep"
import { AuthSelector } from "../../shared/selectors/Selectors";
import AppError from "../../utils/AppErrors";
import { price } from "../../utils/CommonUtils";
import { EditProduct } from "../EditProduct/EditProduct";
import "./SettingsCatalog.css"

export const SettingsCatalog = () => {
    const [products,setProducts] = useState([])
    const authRed = useSelector(AuthSelector);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    // editing
    const [isEdit,setEdit] = useState(false);
    const [openProduct,setOpenProduct] = useState({})

    // services
    const {settingAccountService, productService} = UseDep();

    // loading and confirmation
    const [isLoading,setLoading] = useState(false)
    const [success, setSuccess] = useState(false);
    const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

    useEffect(()=>{
        getProducts()
    },[refresh])

    const onClickSuccess = (value) => {
        setSuccess(current => value);
    }
    
    const onClickPanic = (value) => {
        setPanic(prevState => ({
          ...prevState,
          isPanic: value, errMsg: ''
        }));
    }

    const getProducts = async () => {
        try {
            const response = await settingAccountService.doGetAccountProduct({
                account_id: authRed.account_id
            })
            if (response.data.data !== null) {
                setProducts(response.data.data)
            }
        } catch (err) {
            AppError(err);
        }
    }

    const handleEdit = (productData) => {
        setEdit(prevState=>!prevState)
        if (productData) {
            setOpenProduct(prevState=>productData)
        }
    }

    const handleDelete = async (id) => {
        setLoading(true)
        try {
          await productService.doDeleteProductData({
            "product_id": `${id}`
          })
          setSuccess(true);
        } catch (err) {
          setPanic(prevState => ({
            ...prevState,
            isPanic: true, errMsg: AppError(err)
          }));
        } finally {
          setLoading(false)
          setRefresh(prevState=>!prevState)
        }
    }

    const handleAdd = () => {
        navigate('/profile/settings/catalog/add')
    }

    return(
        <div className="wrapper">
            <div className="settings-cat-card">
                <div className="button-add-product">
                    <ButtonComponentSm label={"Add Product"} onClick={()=>handleAdd()} />
                </div>
                <div>
                    {
                        products.map((product,index) => {
                            const links = product.detail_media_products
                            return(
                                <div className="product-list">
                                    <div className="pl-text">
                                        {(links.length > 1) ? <img className="pl-image" src={links[0]}/> : <img className="pl-image" src={links}/>}
                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <Title2White title={product.product_name.length < 20 ? product.product_name : product.product_name.slice(0, 15).concat('', '...')} />
                                            <Title2Yellow title={price.format(product.price)}/>
                                        </div>
                                    </div>
                                    <div className="pl-button">
                                        <div style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon onClick={()=>handleDelete(product.product_id)} icon="fa-solid fa-trash" style={{ color: "#FED154", fontSize: "30px" }} />
                                        </div>
                                        <div style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon onClick={()=>handleEdit(product)} icon="fa-solid fa-gear" style={{ color: "#FED154", fontSize: "30px" }} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {isEdit && <EditProduct product={openProduct} handleEdit={handleEdit} setRefresh={setRefresh} />}
            {isLoading && <LoadingScreen />}
            {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
            {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
        </div>
    )
}