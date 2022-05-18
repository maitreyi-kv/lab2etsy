const getUserQuery = `query getUser($Email: String, $ID: String) {
  getUser(Email:$Email, ID:$ID) {
    Name,
    Email,
    Password,
    Name,
    Address,
    Country,
    City,
    Phone,
    ImageURL
  }
}`;


const getShopDetailsQuery = `query getShopDetails($Name: String) {
  getShopDetails(Name: $Name) {
      ShopName
      UserID
      ShopImageURL
  }
}`;


const getProductsQuery = `query getProducts($Name: String, $ID: String, $excludeID: String) {
  getProducts(Name: $Name, ID: $ID, excludeID: $excludeID) {
      Name
      Price
      Description
      ImageURL
      QuantityAvailable
      Category
      ShopName
      UserID  
  }
}`;

const getPurchasedOrdersQuery = `query getPurchasedOrders($ID: String) {
  getPurchasedOrders(ID: $ID) {
  }
}`







getPurchasedOrdersQuery
getUserQuery
