const registerUser = `mutation registerUser($Name: String!, $Password: String!, $Email: String!) {
        registerUser(Name :$Name, Password :$Password, Email: $Email)
      }`;

const addProductMutation = `mutation addProduct($product: ProductInput!) {
        addProduct(product: $product )
      }`;

const updateProductMutation = `mutation addProduct($product: ProductInput!) {
        addProduct(product: $product )
      }`;

const updateUserMutation = `mutation updateUser($UserProfile: UserProfileInput!) {
        updateUser(UserProfile: $UserProfile )
      }`;


const addShopMutation = `mutation addShop($shop: ShopInput!) {
        addShop(UserProfile: $UserProfile ) {
          Shop
        }
      }`;

const updateShopMutation = `mutation updateShop($shop: ShopInput!) {
        updateShop(ShopInput: $ShopInput ) {
          Shop
        }
      }`;

const purchaseOrderAddMutation = `mutation purchaseOrder($orders: [Order!]!) {
        purchaseOrder(Order: $Order ) {
          [Order]
        }
      }`;

















addProductMutation
updateProductMutation
updateUserMutation
addShopMutation
updateShopMutation
purchaseOrderAddMutation
