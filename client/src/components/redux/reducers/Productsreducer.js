const products = [];

export const getProductsreducers = (state = {products},action)=>{
    switch(action.type){
        case "SUCCESS_GET_PRODUCTS":
            return {products:action.payload}
        case "FAIL_GET_PRODUCTS":
            return {error:action.payload}
        default : return state
    }
}