<script setup>
    import Papa from 'papaparse';
    import {ref, onMounted} from 'vue';
    const csvData = ref([]);

    onMounted(async () => {
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
    });


</script>

<template>
    <pre>{{csvData}}</pre>
</template>

