<script setup>
import { computed, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
// Swiper 樣式
import 'swiper/css'
import 'swiper/css/navigation'
import { categories } from '@/data/categories'

import { useAppStore } from '@/composables/useAppStore'
const { productsData } = useAppStore()

const normalProducts = computed(() =>
  productsData.value.filter((product) => product.type === 'normal'),
)

const fundingProducts = computed(() =>
  productsData.value.filter((product) => product.type === 'funding'),
)

const selectedCategory = ref('全部')

const subCategories = computed(() => {
  const subs = fundingProducts.value.map((p) => p.subCategory)
  return ['全部', ...new Set(subs)] // ["全部", "設計", "程式", ...]
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === '全部') {
    return fundingProducts.value
  }
  return fundingProducts.value.filter((p) => p.subCategory === selectedCategory.value)
})

// 計算剩餘天數
const daysLeft = (deadline) => {
  const today = new Date()
  const endDate = new Date(deadline)
  const diffTime = endDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}
</script>

<template>
  <section class="section-banner overflow-hidden">
    <div class="container-lg">
      <div class="banner-position">
        <Swiper
          class="bannerSwiper overflow-visible"
          :loop="true"
          :centered-slides="true"
          :breakpoints="{
            992: { slidesPerView: 1.2, spaceBetween: 24 },
            0: { slidesPerView: 1, spaceBetween: 24 },
          }"
          :navigation="{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }"
          :modules="[Navigation]"
        >
          <SwiperSlide v-for="product in normalProducts.slice(0, 5)" :key="product.id">
            <RouterLink :to="`/product/${product.id}`">
              <div class="banner-info">
                <img class="banner-image" :src="product.imageUrl" :alt="product.title" />
                <img
                  class="banner-deco-position"
                  src="@/assets/images/deco/flower-4.png"
                  alt="banner-deco"
                />
                <div class="banner-slogan-position">
                  <a class="btn btn-primary-100 banner-slogan" href="#">
                    <h3 class="fs-lg-3 fs-14 text-neutral-0">探索感興趣的課程，今天立即上課</h3>
                    <span class="material-symbols-outlined"> arrow_forward </span>
                  </a>
                </div>
                <div class="banner-tag-position">
                  <div class="banner-tag">
                    <span class="tag-primary">熱銷課程 🔥</span>
                    <h2 class="fs-lg-6 fs-14">{{ product.title }}</h2>
                  </div>
                </div>
              </div>
            </RouterLink>
          </SwiperSlide>
        </Swiper>

        <!-- 自訂導航按鈕 -->
        <div class="swiper-button-next-custom d-lg-block d-none">
          <span class="material-symbols-outlined"> arrow_forward </span>
        </div>
        <div class="swiper-button-prev-custom d-lg-block d-none">
          <span class="material-symbols-outlined"> arrow_back </span>
        </div>
      </div>
    </div>
  </section>

  <section class="section-course py-lg-12 py-11">
    <div class="deco"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="course-pt">
            <h2 class="fs-1 mb-2">火熱募資課程</h2>
            <span class="fs-6">現在購買最優惠✨</span>
            <div class="category-group py-lg-8 py-6 overflow-auto">
              <button
                v-for="sub in subCategories"
                :key="sub"
                @click="selectedCategory = sub"
                class="btn btn-sm btn-outline-neutral-40"
                :class="{ active: sub === selectedCategory }"
              >
                {{ sub }}
              </button>
            </div>
            <RouterLink
              :to="`/category`"
              class="btn btn-primary-100 fw-semibold d-lg-inline-block d-none"
              >更多募資課程</RouterLink
            >
          </div>
        </div>
        <div class="col-lg-8">
          <!-- Breakpoint-lg -->
          <div class="row g-6 d-lg-flex d-none">
            <div v-for="product in filteredProducts.slice(0, 4)" class="col-lg-6" :key="product.id">
              <RouterLink :to="`/product/${product.id}`">
                <div class="my-card course-card">
                  <div class="card-image">
                    <img class="card-img-top" :src="product.imageUrl" :alt="product.title" />
                    <div class="banner-tag-position">
                      <span class="tag-primary"
                        >優惠倒數 {{ daysLeft(product.funding.deadline) }} 天</span
                      >
                    </div>
                  </div>
                  <div class="card-body py-6 px-4">
                    <h3 class="line-clamp-2 h-48 fs-6 mb-2">{{ product.title }}</h3>

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
            </div>
          </div>

          <!-- Breakpoint-Swiper -->
          <swiper
            class="courseSwiper d-lg-none p-4"
            :loop="true"
            :breakpoints="{
              768: { slidesPerView: 2.2, spaceBetween: 24 },
              0: { slidesPerView: 1.2, spaceBetween: 24 },
            }"
            :pagination="{ clickable: true }"
            :modules="[Pagination]"
          >
            <SwiperSlide v-for="product in filteredProducts" :key="product.id">
              <RouterLink :to="`/product/${product.id}`">
                <div class="my-card course-card">
                  <div class="card-image">
                    <img class="card-img-top" :src="product.imageUrl" :alt="product.title" />
                    <div class="banner-tag-position">
                      <span class="tag-primary"
                        >優惠倒數 {{ daysLeft(product.funding.deadline) }} 天</span
                      >
                    </div>
                  </div>
                  <div class="card-body py-6 px-4">
                    <h3 class="line-clamp-2 h-48 fs-6 mb-2">{{ product.title }}</h3>

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
        </div>
        <div class="col-12 d-lg-none d-block">
          <RouterLink :to="`/category`" class="btn btn-primary-100 w-100 fw-semibold mt-6"
            >更多募資課程</RouterLink
          >
        </div>
      </div>
    </div>
  </section>

  <section class="section-moreCourse bg py-lg-12 py-11 overflow-hidden">
    <div class="container">
      <h2 class="title-font fs-1 mb-2">
        <span class="title-deco">
          <span>看看大家</span>
          <span class="d-block d-lg-inline">都買了什麼</span>
        </span>
      </h2>
      <span class="d-block subtitle-font fs-6 mb-lg-8 mb-6">熱銷課程一次看！✨</span>

      <!-- Swiper -->
      <swiper
        class="moreCourseSwiper overflow-visible px-4"
        :loop="true"
        :space-between="24"
        :breakpoints="{
          1400: { slidesPerView: 4 },
          992: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          0: { slidesPerView: 1.2 },
        }"
        :navigation="{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }"
        :modules="[Navigation]"
      >
        <SwiperSlide
          v-for="product in [...normalProducts].reverse()"
          :key="product.id"
          class="my-card course-card"
        >
          <RouterLink :to="`/product/${product.id}`">
            <div class="card-image">
              <img class="card-img-top" :src="product.imageUrl" :alt="product.title" />
              <div class="banner-tag-position">
                <span class="tag-alert"
                  >{{ product.discount ? '限時 ' + product.discount + ' 折 🔥' : '限時優惠🔥' }}
                </span>
              </div>
            </div>
            <div class="card-body p-4">
              <h3 class="line-clamp-2 h-64 fs-6 mb-2">{{ product.title }}</h3>

              <div class="flex-between-center">
                <!-- 作者 -->
                <div class="card-author">
                  <span class="material-symbols-outlined"> account_circle </span>
                  <p>{{ product.author }}</p>
                </div>

                <div class="card-price-col">
                  <span class="fs-6 text-primary-100 fw-semibold">NT$ {{ product.price }} </span>
                  <span class="text-line">NT$ {{ product.origin_price }}</span>
                </div>
              </div>
            </div>
            <div class="card-footer border-top p-4">
              <div class="flex-between-center">
                <div class="card-category">
                  <span class="tag-sm-neutral">{{ product.subCategory }}</span>
                  <span class="fs-14">已有 {{ product.stats.joinCount }} 位同學加入</span>
                </div>
                <div class="card-rating">
                  <span class="material-symbols-outlined is-fill fill-yellow fs-12"> star </span>
                  <span class="text-black fs-14 fw-medium">{{ product.stats.rating }} </span>
                  <span class="text-grey-300 fs-14 fw-medium"
                    >({{ product.stats.ratingCount }})</span
                  >
                </div>
              </div>
            </div>
          </RouterLink>
        </SwiperSlide>

        <!-- 自訂導航按鈕 -->
        <div class="swiper-button-next-custom d-lg-block d-none">
          <span class="material-symbols-outlined"> arrow_forward </span>
        </div>
        <div class="swiper-button-prev-custom d-lg-block d-none">
          <span class="material-symbols-outlined"> arrow_back </span>
        </div>
      </swiper>
    </div>
  </section>

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

  <section class="section-prof py-lg-12 py-8">
    <div class="container">
      <h2 class="title-font fs-1 mb-2">
        <span class="title-deco">
          <span>頂尖講師</span>
          <span class="d-block d-lg-inline">帶你飛</span>
        </span>
      </h2>
      <span class="d-block subtitle-font fs-6 mb-lg-8 mb-6"
        >超真實學員評價，這些講師你絕對不能錯過！</span
      >

      <!-- Swiper -->
      <swiper
        class="profSwiper px-4 pb-xl-8"
        :loop="true"
        :slides-per-view="1"
        :space-between="24"
        :breakpoints="{
          1400: { slidesPerView: 3 },
          1200: { slidesPerView: 2 },
        }"
        :pagination="{ el: '.swiper-pagination', clickable: true }"
        :modules="[Pagination]"
      >
        <SwiperSlide>
          <div class="prof-card">
            <div class="card-img">
              <img src="@/assets/images/teacher-3.png" alt="teacher" />
            </div>
            <div class="card-info">
              <h3 class="fs-6 mb-6">全端工程師 Robert</h3>
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="tag-neutral">全端開發</span>
                <div class="card-rating">
                  <span class="material-symbols-outlined is-fill fill-yellow fs-12"> star </span>
                  <span class="text-black fs-14 fw-medium">4.8</span>
                  <span class="text-grey-300 fs-14 fw-medium">(1333)</span>
                </div>
              </div>
              <p class="mb-6">
                Robert
                的線上課程深受學生喜愛。他的教學方法生動有趣，能夠深入淺出地講解複雜的前端開發概念，並結合實際專案實作，使學生能夠快速提升開發能力。
              </p>
              <button class="btn btn-primary-100 text-nowrap fs-16 fw-semibold mt-auto">
                探索 Robert 的教學課程
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="prof-card">
            <div class="card-img">
              <img src="@/assets/images/teacher-1.png" alt="teacher" />
            </div>
            <div class="card-info">
              <h3 class="fs-6 mb-6">行銷顧問 Zoe</h3>
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="tag-neutral">行銷專家</span>
                <div class="card-rating">
                  <span class="material-symbols-outlined is-fill fill-yellow fs-12"> star </span>
                  <span class="text-black fs-14 fw-medium">4.8</span>
                  <span class="text-grey-300 fs-14 fw-medium">(981)</span>
                </div>
              </div>
              <p class="mb-6">
                Zoe
                的教學方式靈活且富有創意，能夠有效提升學生的社群經營技巧與行銷思維。她注重實用性，會根據不同品牌與學生需求量身打造策略，並提供具體的數據分析與改善建議。
              </p>
              <button class="btn btn-primary-100 text-nowrap fs-16 fw-semibold mt-auto">
                探索 Zoe 的教學課程
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="prof-card">
            <div class="card-img">
              <img src="@/assets/images/teacher-2.png" alt="teacher" />
            </div>
            <div class="card-info">
              <h3 class="fs-6 mb-6">K. Lee</h3>
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="tag-neutral">音樂創作</span>
                <div class="card-rating">
                  <span class="material-symbols-outlined is-fill fill-yellow fs-12"> star </span>
                  <span class="text-black fs-14 fw-medium">4.6</span>
                  <span class="text-grey-300 fs-14 fw-medium">(222)</span>
                </div>
              </div>
              <p class="mb-6">
                K. Lee
                的教學風格親切且耐心，能夠循序漸進地引導學生進入樂團的世界。學生們紛紛表示，K. Lee
                的課程讓他們對音樂產生了濃厚的興趣，並提升實作能力！
              </p>
              <button class="btn btn-primary-100 text-nowrap fs-16 fw-semibold mt-auto">
                探索 K. Lee 的教學課程
              </button>
            </div>
          </div>
        </SwiperSlide>

        <div class="swiper-pagination d-xxl-none d-xl-block"></div>
      </swiper>
    </div>
  </section>
</template>
