<template>
    <div>
        <div class="d-flex">
            <!-- <p v-for="art in article.articles" :key="art.id">{{ art.id }}</p> -->
            <table class="table table-striped ms-5 a" style="width: 100%;">
                <thead>
                    <tr>
                        <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
                    </tr>
                </thead>

                <tbody v-if="loading">
                    <tr v-for="n in 5" :key="n">
                        <td :colspan="columns.length + 1">
                            <p class="placeholder-glow">
                                <span class="placeholder col-12 placeholder-lg rounded-1 py-2 bg-secondary"></span>
                            </p>
                        </td>
                    </tr>
                </tbody>

                <tbody v-else>
                    <tr v-for="row in rows" :key="row.id" class="align-middle">
                        <td v-for="col in columns" :key="col.key">
                            <slot :name="`col-${col.key}`" :value="getValue(row, col.key)">
                                {{ getValue(row, col.key) }}
                            </slot>
                        </td>
                    </tr>
                </tbody>


            </table>
        </div>
    </div>
</template>

<script setup>
import { Trash2, SquarePen } from 'lucide-vue-next'

const props = defineProps({
    columns: {
        type: Array,
        default: () => []
    },
    rows: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    }
})

defineEmits(['delete', 'edit'])

const getValue = (obj, path) => {
    return path.split('.').reduce((o, key) => o?.[key], obj)
}
</script>

<style scoped></style>