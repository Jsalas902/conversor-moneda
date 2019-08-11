new Vue({
    el:'#app',
    data: {
        monedas: []
    },
    mounted() {
        axios.get('https://free.currconv.com/api/v7/currencies?apiKey=9e3a780ed9f9a73733da')
            .then(response => {
                this.monedas = response.data.results;
                console.log(response);
            });
    },
});