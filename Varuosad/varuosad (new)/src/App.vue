<script setup>
    import Papa from 'papaparse';
    import Fuse from 'fuse.js';
    import { ref, onMounted, watch } from 'vue';
    const csvData = ref([]);
    var searchValue = ref("");
    const results = ref([]);

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

            Papa.parse(text, config);
        }
        loadCSV();

    });
    
    watch(csvData, (newData) => {

        if (newData.length) {

            const fuseOptions = {
                keys: ["productId", "productName"]
            };

            fuse = new Fuse(newData, fuseOptions);
        }
    })

    async function search() {
        if (fuse && searchValue.value.trim() !== ''){
            results.value = fuse.search(searchValue.value);
            
            
        }
        else{
            results.value = [];
        }
    }

</script>

<template>
    <div class="control is-expanded">
        <input v-model="searchValue" @input="search" class="input" type="text"
            placeholder="Search products">
    </div>
    <pre v-if="searchValue">{{results}}</pre>
    <pre v-else>{{csvData}}</pre>
    

</template>