import axios from "axios";
import { ApiResponeCollection } from "../../util/api-response";
import { actionType } from "../../util/store/action";


export const loadNFTs = () => async (dispatch: any) => {
    dispatch({
        type: actionType.SET_LOADING_COLLECTION,
        loadingCollection: true
    })
    try {
        const meta = await axios.get(ApiResponeCollection)

        dispatch({
            type: actionType.SET_YOUR_COLLECTION,
            nfts: (await meta.data).map((ele: any) => ({ ...ele, cart: false, qty: false }))
        })
        dispatch({
            type: actionType.SET_LOADING_YOUR_COLLECTION,
            loadingYourCollection: false
        })
    } catch (error: any) {
        dispatch({
            type: actionType.SET_AXIOS_MESSAGE,
            axiosMessage: ({ key: "ecommerce", value: `${error.message} when receiving data about collection`, status: "error" })
        })
        const time = setTimeout(() => {
            dispatch({
                type: actionType.SET_AXIOS_MESSAGE,
                axiosMessage: ({ key: "remove", value: "" })
            })
        }, 5000)
        return () => clearTimeout(time)
    }
    dispatch({
        type: actionType.SET_LOADING_COLLECTION,
        loadingCollection: false
    })
}