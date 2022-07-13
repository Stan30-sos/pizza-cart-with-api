document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function() {
      return {
        init() {

         axios
              .get('https://pizza-cart-api.herokuapp.com/api/pizzas')
              .then((result) => {
                this.pizzaList = result.data.pizzas
              })
              .then((result) => {
                return this.createCart();

              })
              .then((result) => {
                this.cartId = result.data.cart_code;
              })



        },
        createCart(){
    return axios.get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username = userName') 
        },
        showCart(){

          const url = `https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartId}/get`;

          axios
              .get(url)
              .then((result) => {
                this.cart = result.data;
              });

        },

        message: 'Eating Pizzas',
        pizzaList : [],
        userName:'',
        cartId:'',
        cart: {total:0},

        add(pizza){

          const params = {
            cart_code: this.cartId,
            pizza_id:pizza.id
          }

          axios
              .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add',params)
              .then(() => {
                this.message = 'Pizza added to the cart'
                this.showCart();
              } )
              .catch(err => alert(err));

         // alert(pizza.flavour + " : " + pizza.size)

      },

      remove(pizza){

        const params = {
          cart_code: this.cartId,
          pizza_id:pizza.id
        }

        axios
            .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove',params)
            .then(() => {
              this.message = 'Pizza removed from the cart'
              this.showCart();
            } )
            .catch(err => alert(err));

    },

    }
});

})
