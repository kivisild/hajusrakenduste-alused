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
                csvData.value = results.data;
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

