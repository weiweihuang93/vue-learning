<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { categories } from '@/data/categories.js'

import { useAppStore } from '@/composables/useAppStore'
const { productsData, getAllProducts } = useAppStore()

const activeCategory = ref(null)
const activeSubCategory = ref(null)

// 組件掛載時執行
onMounted(() => {
  getAllProducts()
})

const normalProducts = computed(() =>
  productsData.value.filter((product) => product.type === 'normal'),
)

const filteredProductsData = computed(() => {
  let products = []

  // 沒選主分類 → 顯示所有商品
  if (!activeCategory.value) {
    products = normalProducts.value
  }
  // 有選子分類
  else if (activeSubCategory.value) {
    products = normalProducts.value.filter(
      (p) =>
        p.category === activeCategory.value.name && p.subCategory === activeSubCategory.value.name,
    )
  }
  // 選了主分類 → 只顯示對應主分類商品
  else {
    products = normalProducts.value.filter((p) => p.category === activeCategory.value.name)
  }

  // 排序：依 stats.joinCount 由大到小
  return products.slice().sort((a, b) => b.stats.joinCount - a.stats.joinCount)
})
</script>

<template>
  <header class="site-header pt-8 pb-4">
    <div class="container">
      <nav class="navbar navbar-expand-xl">
        <!-- logo -->
        <a class="navbar-brand me-6" href="/">
          <img class="logo" src="@/assets/images/logo.png" alt="logo" />
        </a>
        <!-- 桌面版 探索 + form -->
        <div class="navbar-desktop d-xl-flex d-none">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle px-6"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                探索
              </a>
              <!-- dropdown-menu -->
              <div class="dropdown-menu overflow-hidden">
                <div class="d-flex">
                  <!-- 探索全部 -->
                  <ul class="dropdown-menu-group bg-neutral-40 p-3">
                    <li>
                      <RouterLink
                        :to="{ path: '/category' }"
                        class="dropdown-item list-group-link mb-2"
                        >探索全部</RouterLink
                      >
                    </li>
                    <li
                      v-for="cat in categories"
                      :key="cat.name"
                      @mouseenter="activeCategory = cat"
                    >
                      <RouterLink
                        :to="{ path: `/category/${cat.slug}` }"
                        class="dropdown-item list-group-link"
                        >{{ cat.name }}
                        <span class="material-symbols-outlined fs-5"
                          >chevron_right</span
                        ></RouterLink
                      >
                    </li>
                  </ul>
                  <!-- 子分類 -->
                  <ul class="dropdown-menu-group bg-neutral-0 p-3" v-if="activeCategory">
                    <li>
                      <a class="dropdown-item list-group-link mb-2" href="#"
                        >所有{{ activeCategory.name }}</a
                      >
                    </li>
                    <li
                      v-for="sub in activeCategory.subCategories"
                      :key="sub"
                      @mouseenter="activeSubCategory = sub"
                    >
                      <RouterLink
                        :to="{ path: `/category/${activeCategory.slug}/${sub.slug}` }"
                        class="dropdown-item list-group-link"
                        href="#"
                        >{{ sub.name
                        }}<span class="material-symbols-outlined fs-5"
                          >chevron_right</span
                        ></RouterLink
                      >
                    </li>
                  </ul>
                  <ul class="dropdown-menu-group bg-neutral-0 py-3 px-6">
                    <div class="dropdown-menu-title d-flex gap-2">
                      <img class="w-24" src="@/assets/images/icons/ic_fire.png" alt="ic_fire" />
                      <h2 class="fs-16 text-neutral-80">
                        熱門 {{ activeSubCategory?.name || activeCategory?.name }} 課程
                      </h2>
                    </div>

                    <!-- 有課程就渲染課程列表 -->
                    <div v-if="filteredProductsData.length">
                      <div
                        v-for="product in filteredProductsData.slice(0, 3)"
                        :key="product.id"
                        class="course-card border-bottom py-4"
                      >
                        <div class="d-flex gap-2">
                          <div class="card-image">
                            <img class="card-img-top" :src="product.imageUrl" :alt="product.name" />
                            <div class="banner-tag-position">
                              <span class="tag-sm-alert">{{
                                product.discount ? `${product.discount} 折` : '優惠'
                              }}</span>
                            </div>
                          </div>
                          <div class="card-body">
                            <h3 class="line-clamp-2 fs-6">{{ product.title }}</h3>

                            <div class="flex-between-center py-4">
                              <!-- 作者 -->
                              <div class="card-author">
                                <span class="material-symbols-outlined"> account_circle </span>
                                <p>{{ product.author }}</p>
                              </div>

                              <div class="card-price-col">
                                <span class="fs-16 text-primary-100 fw-semibold"
                                  >NT$ {{ product.price }}
                                </span>
                                <span class="text-line">NT$ {{ product.origin_price }}</span>
                              </div>
                            </div>
                            <div class="flex-between-center border-top py-2">
                              <div class="card-category">
                                <span class="fs-14"
                                  >已有 {{ product.stats.joinCount }} 位同學加入</span
                                >
                              </div>
                              <div class="card-rating">
                                <span class="material-symbols-outlined icon-fill-yellow">
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
                    </div>
                    <!-- 無課程就顯示提示 -->
                    <div v-else class="course-card flex-center py-4">
                      <p class="text-muted py-4"></p>
                      暫無相關課程
                    </div>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <!-- 搜尋框 -->
              <form class="form-search-position" role="search">
                <input
                  class="form-control form-search-input"
                  type="search"
                  placeholder="搜尋各種音樂、數學、程式及設計課程"
                  aria-label="Search"
                />
                <span class="material-symbols-outlined position-absolute"> search </span>
                <button
                  class="btn btn-sm btn-primary-100 fw-semibold position-absolute"
                  type="submit"
                >
                  搜尋
                </button>
              </form>
            </li>
          </ul>
        </div>
        <!-- 桌面版 + 手機版 icon -->
        <div class="nav-visible">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span class="material-symbols-outlined position-relative">
                  notifications<span
                    class="badge bg-primary rounded-circle position-absolute top-0 start-100 translate-middle p-1"
                  >
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </span></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span class="material-symbols-outlined position-relative">
                  shopping_cart
                  <span
                    class="badge bg-primary rounded-circle fs-12-badge position-absolute top-0 start-100 translate-middle px-2"
                    >2
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </span></a
              >
            </li>
            <button class="btn btn-primary-100 fw-semibold text-nowrap d-xl-block d-none">
              登入 / 註冊
            </button>
          </ul>
        </div>
        <!-- 漢堡 -->
        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- 手機版 -->
        <div
          class="navbar-mobile offcanvas offcanvas-end d-xl-none d-block"
          tabindex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div class="offcanvas-header p-0 border-bottom">
            <ul class="list-group flex-row w-100">
              <li class="w-50 text-center">
                <a class="list-group-link" href="#">探索</a>
              </li>
              <li class="w-50 text-center">
                <a class="list-group-link" href="#">我的會員</a>
              </li>
            </ul>
          </div>
          <div class="offcanvas-body">
            <!-- 探索全部 -->
            <ul class="list-group p-6">
              <li>
                <RouterLink :to="{ path: '/category' }" class="list-group-link mb-2"
                  >探索全部</RouterLink
                >
              </li>
              <li v-for="cat in categories" :key="cat.name">
                <RouterLink :to="{ path: `/category/${cat.slug}` }" class="list-group-link"
                  >{{ cat.name }}
                  <span class="material-symbols-outlined fs-5">chevron_right</span>
                </RouterLink>
              </li>
            </ul>
            <button class="btn btn-primary-100 w-100 fw-semibold login">登入 / 註冊</button>
          </div>
          <div class="offcanvas-footer"></div>
        </div>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <footer class="footer bg">
    <div class="container">
      <div class="footer-top">
        <img class="logo-white" src="@/assets/images/logo-white.png" alt="logo-white" />
        <ul class="footer-nav">
          <li><a href="#">常見問題</a></li>
          <li><a href="#">關於我們</a></li>
          <li><a href="#">隱私權政策</a></li>
          <li><a href="#">使用者條款</a></li>
        </ul>
      </div>
      <div class="footer-bottom">
        <div>
          <p class="fs-14">copyright © 2024 LEARNING 課程網站 All Rights Reserved.</p>
          <p>本網站僅供作品參考，並非真實營運販售</p>
        </div>
        <div class="footer-social">
          <a href="#"
            ><svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_10213_1281)">
                <path
                  opacity="0.7"
                  d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20C39.5 30.7696 30.7696 39.5 20 39.5C9.23045 39.5 0.5 30.7696 0.5 20C0.5 9.23045 9.23045 0.5 20 0.5Z"
                  stroke="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M29 19.0263C29 15.152 24.9625 12 20 12C15.0377 12 11 15.152 11 19.0263C11 22.4994 14.2019 25.4086 18.527 25.9589C18.8199 26.0196 19.2188 26.1451 19.3198 26.386C19.4106 26.6047 19.3793 26.9474 19.3488 27.1685C19.3488 27.1685 19.2436 27.7796 19.2204 27.91C19.1814 28.1288 19.0395 28.7659 20 28.3767C20.9608 27.9874 25.1828 25.4404 27.071 23.3494C28.3754 21.9736 29 20.577 29 19.0263ZM14.4146 21.1339C14.1861 21.1339 14 20.9408 14 20.703V17.4397C14 17.2022 14.2116 17.0089 14.48 17.0089C14.7484 17.0089 14.9 17.2006 14.9 17.4397V20.2724H15.9854C16.2143 20.2724 16.4 20.4657 16.4 20.703C16.4 20.9408 16.2143 21.1339 15.9854 21.1339H14.4146ZM18.2 20.703C18.2 20.9408 17.9981 21.1339 17.7501 21.1339C17.5019 21.1339 17.3 20.9408 17.3 20.703V17.4397C17.3 17.2022 17.5019 17.0089 17.7501 17.0089C17.9981 17.0089 18.2 17.2022 18.2 17.4397V20.703ZM22.7 20.703C22.7 20.889 22.5717 21.0532 22.3797 21.1116C22.3316 21.1265 22.2813 21.1339 22.2309 21.1339C22.0849 21.1339 21.9449 21.0696 21.8566 20.9616L20.0372 18.6842V20.703C20.0372 20.9408 19.8272 21.1339 19.5687 21.1339C19.3103 21.1339 19.1 20.9408 19.1 20.703V17.4397C19.1 17.2541 19.2288 17.0899 19.4203 17.0312C19.4686 17.0162 19.5187 17.0089 19.5691 17.0089C19.7153 17.0089 19.8554 17.0731 19.9431 17.1812L21.7631 19.4587V17.4397C21.7631 17.2022 21.9735 17.0089 22.2316 17.0089C22.4902 17.0089 22.7 17.2022 22.7 17.4397V20.703ZM25.5853 18.6407C25.8142 18.6407 26 18.8339 26 19.0715C26 19.3088 25.8142 19.502 25.5853 19.502H24.4294V20.2724H25.5853C25.8138 20.2724 26 20.4657 26 20.703C26 20.9408 25.8138 21.1339 25.5853 21.1339H24.0145C23.7863 21.1339 23.6 20.9408 23.6 20.703V19.0726V19.0715V17.4397C23.6 17.2022 23.7859 17.0089 24.0145 17.0089H25.5853C25.8142 17.0089 26 17.2022 26 17.4397C26 17.6772 25.8142 17.8702 25.5853 17.8702H24.4294V18.6407H25.5853Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_10213_1281">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="#"
            ><svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_10213_1284)">
                <path
                  opacity="0.7"
                  d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20C39.5 30.7696 30.7696 39.5 20 39.5C9.23045 39.5 0.5 30.7696 0.5 20C0.5 9.23045 9.23045 0.5 20 0.5Z"
                  stroke="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20 11.9946C20.855 11.9946 21.732 12.0166 22.582 12.0526L23.586 12.1006L24.547 12.1576L25.447 12.2186L26.269 12.2826C27.161 12.3509 28.0004 12.7316 28.6395 13.3577C29.2786 13.9838 29.6764 14.8152 29.763 15.7056L29.803 16.1306L29.878 17.0406C29.948 17.9836 30 19.0116 30 19.9946C30 20.9776 29.948 22.0056 29.878 22.9486L29.803 23.8586C29.79 24.0046 29.777 24.1456 29.763 24.2836C29.6764 25.1742 29.2784 26.0058 28.6391 26.6319C27.9999 27.258 27.1602 27.6386 26.268 27.7066L25.448 27.7696L24.548 27.8316L23.586 27.8886L22.582 27.9366C21.732 27.9726 20.855 27.9946 20 27.9946C19.145 27.9946 18.268 27.9726 17.418 27.9366L16.414 27.8886L15.453 27.8316L14.553 27.7696L13.731 27.7066C12.839 27.6384 11.9996 27.2577 11.3605 26.6316C10.7214 26.0055 10.3236 25.1741 10.237 24.2836L10.197 23.8586L10.122 22.9486C10.0455 21.9658 10.0048 20.9804 10 19.9946C10 19.0116 10.052 17.9836 10.122 17.0406L10.197 16.1306C10.21 15.9846 10.223 15.8436 10.237 15.7056C10.3235 14.8153 10.7212 13.984 11.3601 13.358C11.999 12.7319 12.8381 12.3511 13.73 12.2826L14.551 12.2186L15.451 12.1576L16.413 12.1006L17.417 12.0526C18.268 12.0166 19.145 11.9946 20 11.9946ZM18 17.5696V22.4196C18 22.8816 18.5 23.1696 18.9 22.9396L23.1 20.5146C23.1914 20.462 23.2673 20.3863 23.3201 20.295C23.3729 20.2037 23.4007 20.1001 23.4007 19.9946C23.4007 19.8892 23.3729 19.7856 23.3201 19.6943C23.2673 19.603 23.1914 19.5272 23.1 19.4746L18.9 17.0506C18.8088 16.998 18.7053 16.9702 18.5999 16.9702C18.4945 16.9703 18.3911 16.998 18.2998 17.0507C18.2086 17.1034 18.1329 17.1792 18.0802 17.2705C18.0276 17.3618 17.9999 17.4653 18 17.5706V17.5696Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_10213_1284">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs></svg
          ></a>

          <a href="#"
            ><svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_10213_1287)">
                <path
                  opacity="0.7"
                  d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20C39.5 30.7696 30.7696 39.5 20 39.5C9.23045 39.5 0.5 30.7696 0.5 20C0.5 9.23045 9.23045 0.5 20 0.5Z"
                  stroke="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.5983 20.9736H24.1413L24.5219 18.0404H21.5983V16.1677C21.5983 15.3184 21.8357 14.7397 23.0615 14.7397L24.625 14.739V12.1156C24.3545 12.0799 23.4265 12 22.3467 12C20.0926 12 18.5494 13.3669 18.5494 15.8773V18.0404H16V20.9736H18.5494V28.5H21.5983V20.9736Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_10213_1287">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs></svg
          ></a>
        </div>
      </div>
    </div>
  </footer>
</template>
