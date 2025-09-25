<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { categories } from '@/data/categories'
import { allHotTopics } from '@/data/allHotTopics'

import { useAppStore } from '@/composables/useAppStore'
const { productsData } = useAppStore()

// Swiper 樣式
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const route = useRoute()
const categorySlug = computed(() => route.params.categorySlug)
const subCategorySlug = computed(() => route.params.subCategorySlug)

// 整合篩選主分類與子分類
const currentCategoryData = computed(() => {
  const mainCat = categories.find((cat) => cat.slug === categorySlug.value) || null

  // 情境 1：有主分類 + 有子分類
  if (mainCat && subCategorySlug.value) {
    const sub = mainCat.subCategories.find((sub) => sub.slug === subCategorySlug.value) || null
    return { main: mainCat, sub }
  }

  // 情境 2：只有主分類
  if (mainCat) return { main: mainCat, sub: null }

  // 情境 3：完全沒有分類
  return { main: null, sub: null }
})

const filteredProductsData = computed(() => {
  // 如果沒有任何分類，直接回傳全部商品
  if (!currentCategoryData.value.main) {
    return productsData.value
  }

  // 篩選
  return productsData.value.filter((p) => {
    // 先比對主分類
    const matchMain = p.category === currentCategoryData.value.main.name

    // 如果有子分類，必須同時符合
    if (currentCategoryData.value.sub) {
      return matchMain && p.subCategory === currentCategoryData.value.sub.name
    }

    // 沒有子分類就只看主分類
    return matchMain
  })
})

const fundingProducts = computed(() => {
  return filteredProductsData.value.filter((product) => product.type === 'funding')
})

const activeTab = ref('normal') // normal / popular / lowest
const currentPage = ref(1) // 當前頁碼
const pageSize = 9 // 每頁顯示商品數

const normalProducts = computed(() => {
  return filteredProductsData.value.filter((product) => product.type === 'normal')
})

const popularProducts = computed(() => {
  return [...normalProducts.value].sort((a, b) => b.stats.joinCount - a.stats.joinCount)
})

const lowestProducts = computed(() => {
  return [...normalProducts.value].sort((a, b) => a.price - b.price)
})

// 依 tab 切換商品來源
const activeProducts = computed(() => {
  if (activeTab.value === 'popular') return popularProducts.value
  if (activeTab.value === 'lowest') return lowestProducts.value
  return normalProducts.value
})

// 分頁後的商品
const paginatedNormalProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return activeProducts.value.slice(start, end)
})

// 總頁數
const totalPages = computed(() => {
  return Math.ceil(activeProducts.value.length / pageSize)
})

// 產生頁碼陣列
const pages = computed(() => {
  return Array.from({ length: totalPages.value }, (_, i) => i + 1)
})
</script>

<template>
  <section class="section-codeCourse bg-neutral-10 py-11">
    <div class="decoration">
      <img class="deco deco-1" src="@/assets/images/deco/flower-2.png" alt="flower-2" />
      <img class="deco deco-2" src="@/assets/images/deco/flower-2.png" alt="flower-2" />
      <img class="deco deco-3" src="@/assets/images/deco/polygon-2.png" alt="polygon-2" />
      <img class="deco deco-4" src="@/assets/images/deco/polygon-2.png" alt="polygon-2" />
    </div>
    <div class="container">
      <nav aria-label="breadcrumb" class="mb-lg-8 mb-4">
        <ol class="breadcrumb">
          <!-- 探索 -->
          <li class="breadcrumb-item">
            <RouterLink to="/category">探索</RouterLink>
          </li>

          <!-- 主分類 -->
          <li v-if="currentCategoryData.main" class="breadcrumb-item">
            <RouterLink :to="`/category/${currentCategoryData.main.slug}`">
              {{ currentCategoryData.main.name }}
            </RouterLink>
          </li>

          <!-- 子分類 -->
          <li v-if="currentCategoryData.sub" class="breadcrumb-item active" aria-current="page">
            <RouterLink
              :to="`/category/${currentCategoryData.main.slug}/${currentCategoryData.sub.slug}`"
            >
              {{ currentCategoryData.sub.name }}
            </RouterLink>
          </li>
        </ol>
      </nav>
      <h1 class="mb-8">
        {{ currentCategoryData.sub?.name || currentCategoryData.main?.name || '所有課程' }}
      </h1>
      <div class="category-group py-6 overflow-auto">
        <!-- 所有主分類 -->
        <RouterLink
          v-if="currentCategoryData.main"
          :to="`/category/${currentCategoryData.main.slug}`"
          class="btn px-6 btn-outline-neutral-40 me-2"
          active-class="btn-primary-100"
        >
          所有{{ currentCategoryData.main.name }}
        </RouterLink>

        <!-- 子分類 -->
        <RouterLink
          v-for="sub in currentCategoryData.main?.subCategories || []"
          :key="sub.slug"
          :to="`/category/${currentCategoryData.main.slug}/${sub.slug}`"
          class="btn px-6 btn-outline-neutral-40 me-2"
          active-class="btn-primary-100"
        >
          {{ sub.name }}
        </RouterLink>

        <!-- 如果沒有選主分類，顯示所有分類 -->
        <RouterLink
          v-for="cat in !currentCategoryData.main ? categories : []"
          :key="cat.slug"
          :to="`/category/${cat.slug}`"
          class="btn px-6 btn-outline-neutral-40 me-2"
          active-class="btn-primary-100"
        >
          {{ cat.name }}
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="section-course py-lg-12 py-11">
    <div class="container">
      <h2 class="fs-3 mb-8">募資課程</h2>

      <div>
        <!-- 有資料 -->
        <swiper
          v-if="fundingProducts && fundingProducts.length > 0"
          class="courseSwiper p-4"
          :loop="fundingProducts.length > 1"
          :breakpoints="{
            768: { slidesPerView: 2, spaceBetween: 24 },
            0: { slidesPerView: 1, spaceBetween: 24 },
          }"
          :pagination="{ clickable: fundingProducts.length > 1 }"
          :modules="[Pagination]"
        >
          <SwiperSlide v-for="product in fundingProducts" :key="product.id">
            <RouterLink :to="`/product/${product.id}`">
              <div class="my-card course-card">
                <div class="card-image h-300">
                  <img class="card-img-top" :src="product.imageUrl" :alt="product.title" />
                  <div class="banner-tag-position">
                    <span class="tag-primary">優惠倒數 10 天</span>
                  </div>
                </div>
                <div class="card-body py-6 px-4">
                  <h3 class="fs-6 mb-2">{{ product.title }}</h3>

                  <!-- 作者 -->
                  <div class="card-author py-3">
                    <span class="material-symbols-outlined"> account_circle </span>
                    <p>{{ product.author }}</p>
                  </div>

                  <!-- 募資區塊 -->
                  <div class="card-funding">
                    <div class="d-flex justify-content-between">
                      <span class="fs-16 fw-semibold text-primary-100"
                        >募資進度 {{ product.funding.progress }} %</span
                      >
                      <span class="fs-14">已有 {{ product.funding.joinCount }} 位同學加入</span>
                    </div>

                    <div class="progress" style="height: 8px">
                      <div
                        :style="{ width: product.funding.progress + '%' }"
                        class="progress-bar"
                        role="progressbar"
                        :aria-valuenow="product.funding.progress"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div class="card-price">
                      <span class="fs-6 text-neutral-100 fw-semibold"
                        >NT$ {{ product.price }}
                      </span>
                      <span class="text-line">NT$ {{ product.origin_price }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </RouterLink>
          </SwiperSlide>
        </swiper>
        <!-- 沒有資料 -->
        <div v-else class="empty-card">
          <p class="fs-5 fw-semibold mb-2">暫無募資課程</p>
          <span class="fs-16">敬請期待更多課程上架</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section-topic bg-neutral-10 py-lg-11 py-8">
    <div class="container">
      <h2 class="fs-3 mb-8">熱門主題</h2>

      <div class="category-group">
        <!-- 有主分類，渲染子分類熱門主題 -->
        <a
          v-if="currentCategoryData.main?.hotTopics?.length"
          v-for="topic in currentCategoryData.main.hotTopics"
          :key="currentCategoryData.main.slug + '-' + topic.name"
          class="category-link"
        >
          <h3 class="fs-6"><span class="text-primary-100"># </span>{{ topic.name }}</h3>
        </a>

        <!-- 沒有主分類，渲染 allHotTopics -->
        <a
          v-else
          v-for="topic in allHotTopics"
          :key="topic.category + '-' + topic.name"
          class="category-link"
        >
          <h3 class="fs-6"><span class="text-primary-100"># </span>{{ topic.name }}</h3>
        </a>
      </div>
    </div>
  </section>

  <div class="section-courseList py-lg-11 py-8">
    <div class="container">
      <div class="courseList-group">
        <h2 class="fs-3">
          查看 {{ normalProducts.length }} 筆與「
          <span class="text-primary-100">{{
            currentCategoryData.sub?.name || currentCategoryData.main?.name || '探索全部'
          }}</span>
          」的相關課程
        </h2>
        <ul class="nav nav-tabs border-0" id="courseTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link border-0"
              @click="activeTab = 'normal'"
              :class="{ active: activeTab === 'normal' }"
            >
              最新課程
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link border-0"
              @click="activeTab = 'popular'"
              :class="{ active: activeTab === 'popular' }"
            >
              最高人氣
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link border-0"
              @click="activeTab = 'lowest'"
              :class="{ active: activeTab === 'lowest' }"
            >
              最低價格
            </button>
          </li>
        </ul>
      </div>

      <!-- tabs內容 -->
      <div class="tab-content pt-8">
        <div class="tab-pane fade show active">
          <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-6 mb-8">
            <div v-for="product in paginatedNormalProducts" :key="product.id" class="col">
              <RouterLink :to="`/product/${product.id}`">
                <div class="my-card course-card">
                  <div class="d-flex d-lg-block">
                    <div class="card-image">
                      <img class="card-img-top" :src="product.imageUrl" :alt="product.title" />
                      <div class="banner-tag-position">
                        <span class="tag-alert"
                          >{{
                            product.discount ? '限時 ' + product.discount + ' 折 🔥' : '限時優惠🔥'
                          }}
                        </span>
                      </div>
                    </div>
                    <div class="card-body p-4">
                      <h3 class="line-clamp-2 h-2em fs-6 mb-2">{{ product.title }}</h3>

                      <div class="flex-between-center p-4">
                        <div class="card-author">
                          <span class="material-symbols-outlined"> account_circle </span>
                          <p>{{ product.author }}</p>
                        </div>

                        <div class="card-price-col">
                          <span class="fs-6 text-primary-100 fw-semibold"
                            >NT$ {{ product.price }}
                          </span>
                          <span class="text-line">NT$ {{ product.origin_price }}</span>
                        </div>
                      </div>
                      <div class="flex-between-center border-top p-4">
                        <div class="card-category">
                          <span class="tag-sm-neutral">{{ product.subCategory }}</span>
                          <span class="fs-14">已有 {{ product.stats.joinCount }} 位同學加入</span>
                        </div>
                        <div class="card-rating">
                          <span class="material-symbols-outlined is-fill fill-yellow fs-12">
                            star
                          </span>
                          <span class="text-black fs-14 fw-medium"
                            >{{ product.stats.rating }}
                          </span>
                          <span class="text-grey-300 fs-14 fw-medium"
                            >({{ product.stats.ratingCount }})</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- 頁數 -->
      <nav class="pagination-wrapper">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="currentPage = 1">
              <span class="material-symbols-outlined">keyboard_double_arrow_left</span>
            </a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="currentPage--">
              <span class="material-symbols-outlined">keyboard_arrow_left</span>
            </a>
          </li>

          <li
            v-for="page in pages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
          </li>

          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="currentPage++">
              <span class="material-symbols-outlined">keyboard_arrow_right</span>
            </a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="currentPage = totalPages">
              <span class="material-symbols-outlined">keyboard_double_arrow_right</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <section class="section-category py-lg-12 py-8">
    <div class="bg-primary-100 bg-rounded py-11">
      <div class="container">
        <div class="row row-category-layout">
          <div class="col-lg-7">
            <div class="category-group p-6 pb-lg-0">
              <RouterLink
                :to="`/category/${cat.slug}`"
                v-for="cat in categories.slice(0, 4)"
                :key="cat.name"
                class="category-link"
                href="#"
              >
                <span
                  class="category-icon material-symbols-outlined"
                  :style="{ backgroundColor: cat.bgColor }"
                >
                  {{ cat.icon }}
                </span>

                <div class="category-txt">
                  <p class="fs-16 fw-semibold text-grey-900 text-nowrap mb-2">{{ cat.name }}</p>
                  <p class="fs-14 text-grey-600 text-nowrap">{{ cat.courseCount }} 門課程</p>
                </div>
              </RouterLink>
            </div>

            <div class="category-group p-6">
              <RouterLink
                :to="`/category/${cat.slug}`"
                v-for="cat in categories.slice(4, 8)"
                :key="cat.name"
                class="category-link"
                href="#"
              >
                <span
                  class="category-icon material-symbols-outlined"
                  :style="{ backgroundColor: cat.bgColor }"
                >
                  {{ cat.icon }}
                </span>

                <div class="category-txt">
                  <p class="fs-16 fw-semibold text-grey-900 text-nowrap mb-2">{{ cat.name }}</p>
                  <p class="fs-14 text-grey-600 text-nowrap">{{ cat.courseCount }} 門課程</p>
                </div>
              </RouterLink>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="category-info">
              <img src="@/assets/images/deco/polygon-1.png" alt="deco-polygon" />
              <div>
                <h2 class="text-neutral-0">想學什麼嗎？<br />一探究竟。</h2>
                <img src="@/assets/images/deco/line-2.png" alt="deco-line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
