<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import { BASE_URL, API_PATH } from '@/data/config'
import { useRoute } from 'vue-router'
import { categories } from '@/data/categories'

const route = useRoute()
const productId = route.params.id

const productData = ref({})

const getProduct = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${productId}`)
    console.log(res)
    productData.value = res.data.product
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  getProduct()
})

// 找到對應主分類
const mainCategory = computed(() => {
  return categories.find((cat) => cat.name === productData.value.category)
})

// 找到對應子分類
const subCategory = computed(() => {
  return mainCategory.value?.subCategories.find((sub) => sub.name === productData.value.subCategory)
})

// 預計單元 總單元
const totalUnits = computed(() => {
  if (!productData.value.curriculum) return 0
  return productData.value.curriculum.reduce((sum, cur) => {
    return sum + (cur.unitCount || 0)
  }, 0)
})
</script>

<template>
  <div class="my-wrapper">
    <nav aria-label="breadcrumb" class="pt-lg-11 pb-lg-9 p-6">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/category">所有課程</RouterLink>
          </li>

          <!-- 主分類 -->
          <li class="breadcrumb-item" v-if="mainCategory">
            <RouterLink :to="`/category/${mainCategory.slug}`">
              {{ mainCategory.name }}
            </RouterLink>
          </li>

          <!-- 子分類 -->
          <li class="breadcrumb-item active" aria-current="page" v-if="mainCategory && subCategory">
            <RouterLink :to="`/category/${mainCategory.slug}/${subCategory.slug}`">
              {{ subCategory.name }}
            </RouterLink>
          </li>
        </ol>
      </div>
    </nav>

    <section class="section-coursedetail bg">
      <div class="container">
        <div class="coursedetail">
          <div class="card-image">
            <img :src="productData.imageUrl" :alt="productData.title" />
          </div>
          <div class="card-info">
            <div class="card-tag">
              <div v-for="tag in productData.tags" :key="tag" class="tag-primary">{{ tag }}</div>
            </div>
            <div class="card-txt">
              <h1 class="fs-3 fs-lg-1 mb-4">{{ productData.title }}</h1>
              <p class="fs-6 mb-4">
                {{ productData.description }}
              </p>
            </div>
            <div class="card-btn mt-auto">
              <button class="btn btn-sm btn-neutral fw-semibold active">
                <span class="material-symbols-outlined icon-fill-primary me-2"> bookmark </span
                >收藏課程
              </button>
              <button class="btn btn-sm btn-neutral fw-semibold">
                <span class="material-symbols-outlined icon-fill-primary me-2"> share </span
                >分享課程
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-feature">
      <div class="container">
        <div v-if="productData.type === 'funding'" class="feature-group">
          <div class="feature-item">
            <div class="d-flex align-items-center gap-1">
              <span class="material-symbols-outlined"> account_circle </span>
              <h6>{{ productData.author }}</h6>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span
                v-for="(tag, index) in productData.authorTag"
                :key="index"
                class="badge bg-secondary"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="feature-item">
            <h6>{{ productData?.curriculum?.length }} 章 {{ totalUnits }} 單元</h6>
            <p>{{ productData?.curriculum?.length }} 個課後學習作業</p>
          </div>
          <div class="feature-item">
            <h6>募資進度</h6>
            <p>{{ productData.funding?.progress }} %</p>
          </div>
          <div class="feature-item">
            <h6>當前募資人數</h6>
            <p>{{ productData.funding?.joinCount }} 位同學</p>
          </div>
        </div>

        <div v-else class="feature-group">
          <div class="feature-item">
            <div class="d-flex align-items-center gap-1">
              <span class="material-symbols-outlined"> account_circle </span>
              <h6>{{ productData.author }}</h6>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span
                v-for="(tag, index) in productData.authorTag"
                :key="index"
                class="badge bg-secondary"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="feature-item">
            <h6>{{ productData?.curriculum?.length }} 章 {{ totalUnits }} 單元</h6>
            <p>{{ productData?.curriculum?.length }} 個課後學習作業</p>
          </div>
          <div class="feature-item">
            <div class="d-flex align-items-center gap-1">
              <span class="material-symbols-outlined is-fill fill-yellow"> star </span>
              <h6>4.0</h6>
            </div>
            <p>{{ productData.stats?.commentCount }} 條評論</p>
          </div>
          <div class="feature-item">
            <h6>當前購買數</h6>
            <p>{{ productData.stats?.joinCount }} 位同學</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-section py-lg-11 pb-8">
      <!-- nav -->
      <nav class="nav-course sticky-top mb-8">
        <div class="container">
          <ul class="nav nav-tabs border-0">
            <li class="nav-item">
              <a class="nav-link border-0" href="#courseintro">課程介紹</a>
            </li>
            <li class="nav-item">
              <a class="nav-link border-0" href="#courseoutline">預計單元</a>
            </li>
            <li class="nav-item">
              <a class="nav-link border-0" href="#courseinstructor">關於講師</a>
            </li>
            <li class="nav-item">
              <a class="nav-link border-0" href="#coursefaq">購課前問答</a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- row for content -->
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <!-- section-courseintro -->
            <section id="courseintro" class="section-courseintro mb-9">
              <div class="course-title mb-lg-6 mb-4">
                <img class="w-24" src="@/assets/images/deco/flower-5.png" alt="flower-5" />
                <h2 class="fs-5">課程介紹</h2>
              </div>
              <div class="courseintro-list">
                <div v-for="intro in productData.introduction" class="intro-item">
                  <h3 class="fs-16 mb-4">{{ intro.title }}</h3>
                  <p class="mb-7">{{ intro.content }}</p>
                </div>

                <!-- 遮罩 -->
                <div class="mask-white">
                  <button class="btn btn-primary">展開更多</button>
                </div>
              </div>
            </section>

            <!-- section-courseoutline -->
            <section id="courseoutline" class="section-courseoutline mb-9">
              <!-- 區塊標題 -->
              <div class="mb-lg-6 mb-4">
                <div class="course-title mb-2">
                  <img class="w-24" src="@/assets/images/deco/flower-5.png" alt="flower-5" />
                  <h2 class="fs-5">預計單元</h2>
                </div>
                <p>{{ productData?.curriculum?.length }} 章 {{ totalUnits }} 單元｜總時長 分鐘</p>
              </div>

              <!-- 課程大綱 Accordion -->
              <div class="accordion" id="courseAccordion">
                <!-- headingOne -->
                <div
                  v-for="(course, idx) in productData.curriculum"
                  :key="course.unitId"
                  class="accordion-item border-0 mb-4"
                >
                  <h2 class="accordion-header" :id="`heading-${idx}`">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="`#collapse-${idx}`"
                      aria-expanded="false"
                      :aria-controls="`collapse-${idx}`"
                    >
                      <div class="accordion-header-content w-100">
                        <!-- 左側：編號 + 標題 -->
                        <div class="accordion-header-left">
                          <span class="btn-tag">{{ idx + 1 }}</span>
                          <h3 class="fs-16">{{ course.title }}</h3>
                        </div>
                        <!-- 右側：單元數 + 時間 -->
                        <div class="accordion-header-right me-4 d-lg-flex d-none">
                          <p>{{ course.unitCount }} 個單元</p>
                          <span class="deco"></span>
                          <p>{{ course.duration }}</p>
                        </div>
                      </div>
                    </button>
                  </h2>

                  <!-- 展開內容 -->
                  <div
                    :id="`collapse-${idx}`"
                    class="accordion-collapse collapse"
                    :aria-labelledby="`heading-${idx}`"
                    data-bs-parent="#courseAccordion"
                  >
                    <div class="accordion-body">
                      <!-- 小單元列表 -->
                      <div class="accordion-body-content">
                        <span class="material-symbols-outlined me-2">videocam</span>
                        <p>課程說明</p>
                        <button class="btn btn-xs btn-primary ms-auto me-4">試看單元</button>
                        <p>00:10</p>
                      </div>
                      <div class="accordion-body-content">
                        <span class="material-symbols-outlined me-2">videocam</span>
                        <p>課程最終任務說明</p>
                        <p class="ms-auto">00:10</p>
                      </div>
                      <div class="accordion-body-content">
                        <span class="material-symbols-outlined me-2">import_contacts</span>
                        <p>課業作業</p>
                        <p class="ms-auto">00:10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- section-courseinstructor -->
            <section id="courseinstructor" class="section-courseinstructor mb-9">
              <div class="course-title mb-lg-6 mb-4">
                <img class="w-24" src="@/assets/images/deco/flower-5.png" alt="flower-5" />
                <h2 class="fs-5">關於講師</h2>
              </div>
              <div class="courseinstructor-list">
                <div class="instructor-item gap-4 mb-4">
                  <span class="material-symbols-outlined"> account_circle </span>
                  <h3 class="fs-6">{{ productData.author }}</h3>
                </div>
                <div class="instructor-item gap-2 mb-4">
                  <span
                    v-for="(tag, index) in productData.authorSkills"
                    :key="index"
                    class="tag-neutral"
                  >
                    {{ tag }}
                  </span>
                </div>
                <p class="mb-4">
                  {{ productData.authorDescription }}
                </p>
                <div class="d-flex">
                  <a class="ms-auto text-primary-100" href="#"
                    >了解更多講師履歷
                    <span class="material-symbols-outlined"> chevron_right </span>
                  </a>
                </div>
              </div>
            </section>

            <!-- section-coursefaq -->
            <section id="coursefaq" class="section-coursefaq mb-9">
              <div class="course-title mb-lg-6 mb-4">
                <img class="w-24" src="@/assets/images/deco/flower-5.png" alt="flower-5" />
                <h2 class="fs-5">購課前問答</h2>
              </div>
              <div class="coursefaq-list">
                <div class="faq-item">
                  <div class="faq-img">
                    <img src="@/assets/images/avatar-3.png" alt="avatar-3" />
                    <h3 class="fs-16 d-xl-none d-lg-block">Jessica</h3>
                    <p class="fs-14 text-neutral-60 d-xl-none d-lg-block"></p>
                  </div>
                  <div class="faq-info">
                    <textarea
                      class="form-control textarea w-100 mb-4"
                      placeholder="上課前有什麼疑問嗎？ 在這裡盡情詢問講師！"
                    ></textarea>
                    <div class="faq-txt">
                      <div class="d-flex align-items-center">
                        <img
                          class="w-16 me-2"
                          src="@/assets/images/deco/flower-5.png"
                          alt="flower-5"
                        />
                        <p>提問之前也別忘了看看其他同學有沒有跟你有相同的問題哦</p>
                      </div>
                      <button class="btn btn-sm btn-neutral-40 ms-auto">送出</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="col-lg-4 d-lg-block d-none">
            <div class="my-card buy-card">
              <h3 class="fs-16 pb-4 border-bottom">購買本堂課</h3>
              <div class="buy-info">
                <span class="tag-alert">{{
                  productData.discount ? `限定優惠 ${productData.discount} 折` : '限定優惠'
                }}</span>
                <div class="card-price">
                  <h3 class="">NT$ {{ productData.price }}</h3>
                  <span class="text-line">NT$ {{ productData.origin_price }}</span>
                </div>
                <div class="card-operate w-100">
                  <button class="btn btn-primary-100 btn-buy">立即購買</button>
                  <button class="btn btn-outline-primary-100 btn-icon">
                    <span class="material-symbols-outlined"> shopping_cart </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 手機版價格 -->
          <div class="media-buy-card d-lg-none d-md-block">
            <div class="d-flex justify-content-between">
              <div class="card-price">
                <h3 class="fs-6">NT$ {{ productData.price }}</h3>
                <span class="fs-12 text-line">NT$ {{ productData.origin_price }}</span>
              </div>
              <div class="card-operate">
                <button class="btn btn-outline-primary-100 btn-icon">
                  <span class="material-symbols-outlined"> shopping_cart </span>
                </button>
                <button class="btn btn-primary-100 btn-buy">立即購買</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
