<script setup>
    import Papa from 'papaparse';
    import Fuse from 'fuse.js';
    import { ref, onMounted, watch, computed } from 'vue';
    import SimplePagination from './components/SimplePagination.vue';

    const csvData = ref([]);
    var searchValue = ref("");
    const results = ref([]);

    // Pagination
    const info = ref([]);
    const currentPage = ref(1);
    const pageSize = 30;

    //Loading data and turning into json
    let fuse = null;
    onMounted(async () => {
        async function loadCSV() {
            const data = await fetch("/LE.txt");
            const text = await data.text();
            const config = {
                header: false,
                complete: (results) => {
                    csvData.value = results.data.map(row => {
                        return {
                            productId: row[0],
                            productName: row[1],
                            packagingCost: row[2],
                            packagingWeight: row[3],
                            weight: row[4],
                            variable1: row[5],
                            variable2: row[6],
                            remarks: row[7],
                            basePrice: row[8],
                            brand: row[9],
                            retailPrice: row[10],
                        }
                    })
                    console.log("Parsed CSV: ", results.data)
                },
                error: (error) => {
                    console.error("Error parsing CSV:", error)
                }

            }


            var arr = Papa.parse(text, config);

        }
        loadCSV();


    });

    const pagination = computed(() =>{
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = currentPage * pageSize;
        return csvData.value.slice(startIndex, endIndex);
    })

    const paginationInfo = computed(() => {
        var prevPageExists = null;
        var nextPageExists = null;
    })

    

    async function next(){
        currentPage.value++;
        
    }

    async function prev(){
        currentPage.value--;
    }



    // Watching for changes and updating fuse to search from newData
    watch(csvData, (newData) => {

        if (newData.length) {

            const fuseOptions = {
                keys: ["productId", "productName"]
            };

            fuse = new Fuse(newData, fuseOptions);
        }
    })

    // Fuse search
    async function search() {
        if (fuse && searchValue.value.trim() !== '') {
            results.value = fuse.search(searchValue.value);


        }
        else {
            results.value = [];
        }
    }

</script>

<template>
    <SimplePagination v-if="info" :info="info" :current="currentPage" @next="next" @prev="prev"></SimplePagination>
    <div class="control is-expanded">
        <input v-model="searchValue" @input="search" class="input" type="text" placeholder="Search products">
    </div>
    <pre v-if="searchValue">{{results}}</pre>
    <pre v-else>{{pagination}}</pre>


</template>