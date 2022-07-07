document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function() {
      return {
        init() {

         axios
              .get('https://pizza-cart-api.herokuapp.com/api/pizzas')
              .then((result) => {
                this.pizzaList = result.data.pizzas
              })



        },
        pizzaList : [],

        add(pizza){
          alert(pizza.flavour + " : " + pizza.size)

        }
      }
    })
})
