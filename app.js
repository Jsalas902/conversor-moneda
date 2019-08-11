new Vue({
    el:'#app',
    data: {
        monedas: [],
        cantidad: 0,
        from: 'EUR',
        to: 'USD',
        result: 0
    },
    mounted() {
        this.getMonedas()
    },
    computed: {
        formatearMonedas() {
            return Object.values(this.monedas);
        },
        calcularResultado() {
            return (Number(this.cantidad) * this.result).toFixed(3);
        },
        desabilitado() {
            return this.cantidad === 0 || ! this.cantidad;
        }
    },
    methods: {
        getMonedas() {
            const datos  = localStorage.getItem('monedas');

            if (datos) {
                this.monedas = JSON.parse(datos);
                return;
            }

            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=9e3a780ed9f9a73733da')
            .then(response => {
                this.monedas = response.data.results;
                localStorage.setItem('monedas', JSON.stringify(response.data.results));
                // console.log(response);
            }); 
        },
        convertirMonedas() {
            const busqueda = `${this.from}_${this.to}`;

            axios.get(`https://free.currconv.com/api/v7/convert?q=${busqueda}&apiKey=9e3a780ed9f9a73733da`)
            .then(response => {
                console.log(response);
                this.result = response.data.results[busqueda].val;
            });
        }
    },

    watch: {
        from() {
            this.result = 0;
        },
        to() {
            this.result = 0; 
        }
    }

});