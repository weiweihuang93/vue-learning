import { ref } from 'vue'
import axios from 'axios'
import { BASE_URL, API_PATH } from '@/data/config'

const productsData = ref([])

const getAllProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products/all`)
    productsData.value = res.data.products
  } catch (err) {
    console.error(err)
  }
}

export function useAppStore() {
  return {
    productsData,
    getAllProducts,
  }
}
