<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

// Swiper 樣式
import 'swiper/css'
import 'swiper/css/navigation'
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
          <!-- Slide 1 -->
          <SwiperSlide>
            <div class="banner-info">
              <img class="banner-image" src="@/assets/images/hero-2.png" alt="banner" />
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
                  <h2 class="fs-lg-6 fs-14">給成人的鋼琴入門課，一小時教你彈奏上手！</h2>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <!-- Slide 2 -->
          <SwiperSlide>
            <div class="banner-info">
              <img class="banner-image" src="@/assets/images/hero-3.png" alt="banner" />
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
                  <h2 class="fs-lg-6 fs-14">健康廚房：營養均衡的素食料理指南</h2>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <!-- Slide 3 -->
          <SwiperSlide>
            <div class="banner-info">
              <img class="banner-image" src="@/assets/images/hero-4.png" alt="banner" />
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
                  <h2 class="fs-lg-6 fs-14">創意寫作工坊：從靈感到出版的全過程</h2>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <!-- Slide 4 -->
          <SwiperSlide>
            <div class="banner-info">
              <img class="banner-image" src="@/assets/images/hero-1.png" alt="banner" />
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
                  <h2 class="fs-lg-6 fs-14">掌握商業攝影：打造你的專業攝影事業</h2>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <!-- Slide 5 -->
          <SwiperSlide>
            <div class="banner-info">
              <img class="banner-image" src="@/assets/images/course-7.png" alt="banner" />
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
                  <h2 class="fs-lg-6 fs-14">HTML & CSS 網頁設計基礎教程</h2>
                </div>
              </div>
            </div>
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
              <button class="btn btn-sm btn-primary-100">全部</button>
              <button class="btn btn-sm btn-outline-neutral-40">🍽️ 烹飪料理</button>
              <button class="btn btn-sm btn-outline-neutral-40">📊 數據分析</button>
              <button class="btn btn-sm btn-outline-neutral-40">🎼 音樂製作</button>
              <button class="btn btn-sm btn-outline-neutral-40">📝 創意寫作</button>
              <button class="btn btn-sm btn-outline-neutral-40">💬 語言學習</button>
              <button class="btn btn-sm btn-outline-neutral-40">🖌️ 藝術創作</button>
            </div>
            <button class="btn btn-primary-100 fw-semibold d-lg-block d-none">更多募資課程</button>
          </div>
        </div>
        <div class="col-lg-8">
          <!-- Breakpoint-lg -->
          <div class="row g-6 d-lg-flex d-none">
            <div class="col-lg-6">
              <div class="my-card course-card">
                <div class="card-image">
                  <img class="card-img-top" src="@/assets/images/course-4.png" alt="course" />
                  <div class="banner-tag-position">
                    <span class="tag-primary">優惠倒數 10 天</span>
                  </div>
                </div>
                <div class="card-body py-6 px-4">
                  <h3 class="fs-6 mb-2">創意寫作工坊：從靈感到出版的全過程</h3>

                  <!-- 作者 -->
                  <div class="card-author mb-6">
                    <img src="@/assets/images/avatar-2.png" alt="avatar" />
                    <p>Kelly Hsu</p>
                  </div>

                  <!-- 募資區塊 -->
                  <div class="card-funding">
                    <div class="d-flex justify-content-between">
                      <span class="fs-16 fw-semibold text-primary-100">募資進度 81 %</span>
                      <span class="fs-14">已有 521 位同學加入</span>
                    </div>

                    <div class="progress" style="height: 8px">
                      <div
                        style="width: 81%"
                        class="progress-bar"
                        role="progressbar"
                        aria-valuenow="81"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div class="card-price">
                      <span class="fs-6 text-neutral-100 fw-semibold">NT$ 2,480 </span>
                      <span class="text-line">NT$ 3,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="my-card course-card">
                <div class="card-image">
                  <img class="card-img-top" src="@/assets/images/course-1.png" alt="course" />
                  <div class="banner-tag-position">
                    <span class="tag-primary">優惠倒數 17 天</span>
                  </div>
                </div>
                <div class="card-body py-6 px-4">
                  <h3 class="fs-6 mb-2">健康廚房：營養均衡的素食料理指南</h3>

                  <!-- 作者 -->
                  <div class="card-author mb-6">
                    <img src="@/assets/images/avatar-5.png" alt="avatar" />
                    <p>希姐帶你吃</p>
                  </div>

                  <!-- 募資區塊 -->
                  <div class="card-funding">
                    <div class="d-flex justify-content-between">
                      <span class="fs-16 fw-semibold text-primary-100">募資進度 99 %</span>
                      <span class="fs-14">已有 999 位同學加入</span>
                    </div>

                    <div class="progress" style="height: 8px">
                      <div
                        style="width: 99%"
                        class="progress-bar"
                        role="progressbar"
                        aria-valuenow="99"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div class="card-price">
                      <span class="fs-6 text-neutral-100 fw-semibold">NT$ 1,680 </span>
                      <span class="text-line">NT$ 2,900</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="my-card course-card">
                <div class="card-image">
                  <img class="card-img-top" src="@/assets/images/course-2.png" alt="course" />
                  <div class="banner-tag-position">
                    <span class="tag-primary">優惠倒數 9 天</span>
                  </div>
                </div>
                <div class="card-body py-6 px-4">
                  <h3 class="fs-6 mb-2">音樂製作入門：從零開始創作你的音樂</h3>

                  <!-- 作者 -->
                  <div class="card-author mb-6">
                    <img src="@/assets/images/avatar-4.png" alt="avatar" />
                    <p>K.Dee</p>
                  </div>

                  <!-- 募資區塊 -->
                  <div class="card-funding">
                    <div class="d-flex flex-wrap justify-content-between">
                      <span class="fs-16 fw-semibold text-primary-100">募資進度 76 %</span>
                      <span class="fs-14">已有 420 位同學加入</span>
                    </div>

                    <div class="progress" style="height: 8px">
                      <div
                        style="width: 76%"
                        class="progress-bar"
                        role="progressbar"
                        aria-valuenow="76"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div class="card-price">
                      <span class="fs-6 text-neutral-100 fw-semibold">NT$ 2,680 </span>
                      <span class="text-line">NT$ 3,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="my-card course-card">
                <div class="card-image">
                  <img class="card-img-top" src="@/assets/images/course-3.png" alt="course" />
                  <div class="banner-tag-position">
                    <span class="tag-primary">優惠倒數 1 天</span>
                  </div>
                </div>
                <div class="card-body py-6 px-4">
                  <h3 class="fs-6 mb-2">掌握商業攝影：打造你的專業攝影事業</h3>

                  <!-- 作者 -->
                  <div class="card-author mb-6">
                    <img src="@/assets/images/avatar-6.png" alt="avatar" />
                    <p>Mikeeee</p>
                  </div>

                  <!-- 募資區塊 -->
                  <div class="card-funding">
                    <div class="d-flex justify-content-between">
                      <span class="fs-16 fw-semibold text-primary-100">募資進度 98 %</span>
                      <span class="fs-14">已有 290 位同學加入</span>
                    </div>

                    <div class="progress" style="height: 8px">
                      <div
                        style="width: 98%"
                        class="progress-bar"
                        role="progressbar"
                        aria-valuenow="98"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div class="card-price">
                      <span class="fs-6 text-neutral-100 fw-semibold">NT$ 1,980 </span>
                      <span class="text-line">NT$ 3,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Breakpoint-Swiper -->
          <swiper
            class="courseSwiper d-lg-none px-4"
            :loop="true"
            :breakpoints="{
              768: { slidesPerView: 2.2, spaceBetween: 24 },
              0: { slidesPerView: 1.2, spaceBetween: 24 },
            }"
            :pagination="{ clickable: true }"
            :modules="[Pagination]"
          >
            <SwiperSlide>
              <div class="my-card course-card">
                <div class="card-image">
                  <img class="card-img-top" src="@/assets/images/course-4.png" alt="course" />
                  <div class="banner-tag-position">
                    <span class="tag-primary">優惠倒數 10 天</span>
                  </div>
                </div>
                <div class="card-body p-4">
                  <h3 class="fs-6 mb-2">創意寫作工坊：從靈感到出版的全過程</h3>

                  <!-- 作者 -->
                  <div class="card-author mb-6">
                    <img src="@/assets/images/avatar-2.png" alt="avatar" />
                    <p>Kelly Hsu</p>
                  </div>

                  <!-- 募資區塊 -->
                  <div class="card-funding">
                    <div class="d-flex justify-content-between">
                      <span class="fs-16 fw-semibold text-primary-100">募資進度 81 %</span>
                      <span class="fs-14">已有 521 位同學加入</span>
                    </div>

                    <div class="progress" style="height: 8px">
                      <div
                        style="width: 81%"
                        class="progress-bar"
                        role="progressbar"
                        aria-valuenow="81"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div class="card-price">
                      <span class="fs-6 text-neutral-100 fw-semibold">NT$ 2,480 </span>
                      <span class="text-line">NT$ 3,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="my-card course-card">
                <div class="card-image">
                  <img class="card-img-top" src="@/assets/images/course-1.png" alt="course" />
                  <div class="banner-tag-position">
                    <span class="tag-primary">優惠倒數 17 天</span>
                  </div>
                </div>
                <div class="card-body p-4">
                  <h3 class="fs-6 mb-2">健康廚房：營養均衡的素食料理指南</h3>

                  <!-- 作者 -->
                  <div class="card-author mb-6">
                    <img src="@/assets/images/avatar-5.png" alt="avatar" />
                    <p>希姐帶你吃</p>
                  </div>

                  <!-- 募資區塊 -->
                  <div class="card-funding">
                    <div class="d-flex justify-content-between">
                      <span class="fs-16 fw-semibold text-primary-100">募資進度 99 %</span>
                      <span class="fs-14">已有 999 位同學加入</span>
                    </div>

                    <div class="progress" style="height: 8px">
                      <div
                        style="width: 99%"
                        class="progress-bar"
                        role="progressbar"
                        aria-valuenow="99"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div class="card-price">
                      <span class="fs-6 text-neutral-100 fw-semibold">NT$ 1,680 </span>
                      <span class="text-line">NT$ 2,900</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="my-card course-card">
                <div class="card-image">
                  <img class="card-img-top" src="@/assets/images/course-2.png" alt="course" />
                  <div class="banner-tag-position">
                    <span class="tag-primary">優惠倒數 9 天</span>
                  </div>
                </div>
                <div class="card-body p-4">
                  <h3 class="fs-6 mb-2">音樂製作入門：從零開始創作你的音樂</h3>

                  <!-- 作者 -->
                  <div class="card-author mb-6">
                    <img src="@/assets/images/avatar-4.png" alt="avatar" />
                    <p>K.Dee</p>
                  </div>

                  <!-- 募資區塊 -->
                  <div class="card-funding">
                    <div class="d-flex flex-wrap justify-content-between">
                      <span class="fs-16 fw-semibold text-primary-100">募資進度 76 %</span>
                      <span class="fs-14">已有 420 位同學加入</span>
                    </div>

                    <div class="progress" style="height: 8px">
                      <div
                        style="width: 76%"
                        class="progress-bar"
                        role="progressbar"
                        aria-valuenow="76"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div class="card-price">
                      <span class="fs-6 text-neutral-100 fw-semibold">NT$ 2,680 </span>
                      <span class="text-line">NT$ 3,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="my-card course-card">
                <div class="card-image">
                  <img class="card-img-top" src="@/assets/images/course-3.png" alt="course" />
                  <div class="banner-tag-position">
                    <span class="tag-primary">優惠倒數 1 天</span>
                  </div>
                </div>
                <div class="card-body p-4">
                  <h3 class="fs-6 mb-2">掌握商業攝影：打造你的專業攝影事業</h3>

                  <!-- 作者 -->
                  <div class="card-author mb-6">
                    <img src="@/assets/images/avatar-6.png" alt="avatar" />
                    <p>Mikeeee</p>
                  </div>

                  <!-- 募資區塊 -->
                  <div class="card-funding">
                    <div class="d-flex justify-content-between">
                      <span class="fs-16 fw-semibold text-primary-100">募資進度 98 %</span>
                      <span class="fs-14">已有 290 位同學加入</span>
                    </div>

                    <div class="progress" style="height: 8px">
                      <div
                        style="width: 98%"
                        class="progress-bar"
                        role="progressbar"
                        aria-valuenow="98"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div class="card-price">
                      <span class="fs-6 text-neutral-100 fw-semibold">NT$ 1,980 </span>
                      <span class="text-line">NT$ 3,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </swiper>
        </div>
        <div class="col-12 d-lg-none d-block">
          <button class="btn btn-primary-100 w-100 fw-semibold mt-6">更多募資課程</button>
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
        <SwiperSlide class="my-card course-card">
          <div>
            <div class="card-image">
              <img class="card-img-top" src="@/assets/images/course-4.png" alt="course" />
              <div class="banner-tag-position">
                <span class="tag-alert">限時 8 折 🔥</span>
              </div>
            </div>
            <div class="card-body p-4">
              <h3 class="line-clamp-2 h-2em fs-6 mb-2">創意寫作工坊：從靈感到出版的全過程</h3>

              <div class="flex-between-center">
                <!-- 作者 -->
                <div class="card-author">
                  <img src="@/assets/images/avatar-2.png" alt="avatar" />
                  <p>Kelly Hsu</p>
                </div>

                <div class="card-price-col">
                  <span class="fs-6 text-primary-100 fw-semibold">NT$ 2,480 </span>
                  <span class="text-line">NT$ 3,200</span>
                </div>
              </div>
            </div>
            <div class="card-footer border-top p-4">
              <div class="flex-between-center">
                <div class="card-category">
                  <span class="tag-sm-neutral">中文創作</span>
                  <span class="fs-14">已有 999 位同學加入</span>
                </div>
                <div class="card-rating">
                  <span class="material-symbols-outlined icon-fill-yellow"> star </span>
                  <span class="text-black fs-14 fw-medium">4.0 </span>
                  <span class="text-grey-300 fs-14 fw-medium">(333)</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide class="my-card course-card">
          <div>
            <div class="card-image">
              <img class="card-img-top" src="@/assets/images/course-5.png" alt="course" />
              <div class="banner-tag-position">
                <span class="tag-alert">限時 8 折 🔥</span>
              </div>
            </div>
            <div class="card-body p-4">
              <h3 class="line-clamp-2 h-2em fs-6 mb-2">小白也會！從零開始學習 Python 程式設計</h3>

              <div class="flex-between-center">
                <!-- 作者 -->
                <div class="card-author">
                  <img src="@/assets/images/avatar-2.png" alt="avatar" />
                  <p>Kelly Hsu</p>
                </div>

                <div class="card-price-col">
                  <span class="fs-6 text-primary-100 fw-semibold">NT$ 2,480 </span>
                  <span class="text-line">NT$ 3,200</span>
                </div>
              </div>
            </div>
            <div class="card-footer border-top p-4">
              <div class="flex-between-center">
                <div class="card-category">
                  <span class="tag-sm-neutral">中文創作</span>
                  <span class="fs-14">已有 999 位同學加入</span>
                </div>
                <div class="card-rating">
                  <span class="material-symbols-outlined icon-fill-yellow"> star </span>
                  <span class="text-black fs-14 fw-medium">4.0 </span>
                  <span class="text-grey-300 fs-14 fw-medium">(333)</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide class="my-card course-card">
          <div>
            <div class="card-image">
              <img class="card-img-top" src="@/assets/images/course-6.png" alt="course" />
              <div class="banner-tag-position">
                <span class="tag-alert">限時 8 折 🔥</span>
              </div>
            </div>
            <div class="card-body p-4">
              <h3 class="line-clamp-2 h-2em fs-6 mb-2">全面掌握 JavaScript 開發技術</h3>

              <div class="flex-between-center">
                <!-- 作者 -->
                <div class="card-author">
                  <img src="@/assets/images/avatar-2.png" alt="avatar" />
                  <p>Kelly Hsu</p>
                </div>

                <div class="card-price-col">
                  <span class="fs-6 text-primary-100 fw-semibold">NT$ 2,480 </span>
                  <span class="text-line">NT$ 3,200</span>
                </div>
              </div>
            </div>
            <div class="card-footer border-top p-4">
              <div class="flex-between-center">
                <div class="card-category">
                  <span class="tag-sm-neutral">程式開發</span>
                  <span class="fs-14">已有 420 位同學加入</span>
                </div>
                <div class="card-rating">
                  <span class="material-symbols-outlined icon-fill-yellow"> star </span>
                  <span class="text-black fs-14 fw-medium">4.0 </span>
                  <span class="text-grey-300 fs-14 fw-medium">(333)</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide class="my-card course-card">
          <div>
            <div class="card-image">
              <img class="card-img-top" src="@/assets/images/course-7.png" alt="course" />
              <div class="banner-tag-position">
                <span class="tag-alert">限時 8 折 🔥</span>
              </div>
            </div>
            <div class="card-body p-4">
              <h3 class="line-clamp-2 h-2em fs-6 mb-2">HTML & CSS 網頁設計基礎教程</h3>

              <div class="flex-between-center">
                <!-- 作者 -->
                <div class="card-author">
                  <img src="@/assets/images/avatar-2.png" alt="avatar" />
                  <p>Kelly Hsu</p>
                </div>

                <div class="card-price-col">
                  <span class="fs-6 text-primary-100 fw-semibold">NT$ 2,480 </span>
                  <span class="text-line">NT$ 3,200</span>
                </div>
              </div>
            </div>
            <div class="card-footer border-top p-4">
              <div class="flex-between-center">
                <div class="card-category">
                  <span class="tag-sm-neutral">程式開發</span>
                  <span class="fs-14">已有 420 位同學加入</span>
                </div>
                <div class="card-rating">
                  <span class="material-symbols-outlined icon-fill-yellow"> star </span>
                  <span class="text-black fs-14 fw-medium">4.0 </span>
                  <span class="text-grey-300 fs-14 fw-medium">(333)</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide class="my-card course-card">
          <div>
            <div class="card-image">
              <img class="card-img-top" src="@/assets/images/course-8.png" alt="course" />
              <div class="banner-tag-position">
                <span class="tag-alert">限時 8 折 🔥</span>
              </div>
            </div>
            <div class="card-body p-4">
              <h3 class="line-clamp-2 h-2em fs-6 mb-2">更進一步！深入學習 Node.js 與後端開發</h3>

              <div class="flex-between-center">
                <!-- 作者 -->
                <div class="card-author">
                  <img src="@/assets/images/avatar-2.png" alt="avatar" />
                  <p>Kelly Hsu</p>
                </div>

                <div class="card-price-col">
                  <span class="fs-6 text-primary-100 fw-semibold">NT$ 2,480 </span>
                  <span class="text-line">NT$ 3,200</span>
                </div>
              </div>
            </div>
            <div class="card-footer border-top p-4">
              <div class="flex-between-center">
                <div class="card-category">
                  <span class="tag-sm-neutral">程式開發</span>
                  <span class="fs-14">已有 420 位同學加入</span>
                </div>
                <div class="card-rating">
                  <span class="material-symbols-outlined icon-fill-yellow"> star </span>
                  <span class="text-black fs-14 fw-medium">4.0 </span>
                  <span class="text-grey-300 fs-14 fw-medium">(333)</span>
                </div>
              </div>
            </div>
          </div>
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
          <div class="col-lg-6">
            <div class="category-group p-6 pb-lg-0">
              <a class="category-link" href="#">
                <img
                  class="category-icon"
                  src="@/assets/images/icons/category-icon-1.png"
                  alt="category-icon"
                />

                <div class="category-txt">
                  <p class="fs-16 fw-semibold text-grey-900 text-nowrap mb-2">網路行銷</p>
                  <p class="fs-14 text-grey-600 text-nowrap">342 門課程</p>
                </div>
              </a>
              <a class="category-link" href="#">
                <img
                  class="category-icon"
                  src="@/assets/images/icons/category-icon-2.png"
                  alt="category-icon"
                />

                <div class="category-txt">
                  <p class="fs-16 fw-semibold text-grey-900 text-nowrap mb-2">拍攝剪輯</p>
                  <p class="fs-14 text-grey-600 text-nowrap">563 門課程</p>
                </div>
              </a>
              <a class="category-link" href="#">
                <img
                  class="category-icon"
                  src="@/assets/images/icons/category-icon-3.png"
                  alt="category-icon"
                />

                <div class="category-txt">
                  <p class="fs-16 fw-semibold text-grey-900 text-nowrap mb-2">自我成長</p>
                  <p class="fs-14 text-grey-600 text-nowrap">490 門課程</p>
                </div>
              </a>
              <a class="category-link" href="#">
                <img
                  class="category-icon"
                  src="@/assets/images/icons/category-icon-4.png"
                  alt="category-icon"
                />

                <div class="category-txt">
                  <p class="fs-16 fw-semibold text-grey-900 text-nowrap mb-2">藝術設計</p>
                  <p class="fs-14 text-grey-600 text-nowrap">230 門課程</p>
                </div>
              </a>
            </div>

            <div class="category-group p-6">
              <a class="category-link" href="#">
                <img
                  class="category-icon"
                  src="@/assets/images/icons/category-icon-5.png"
                  alt="category-icon"
                />

                <div class="category-txt">
                  <p class="fs-16 fw-semibold text-grey-900 text-nowrap mb-2">數據分析</p>
                  <p class="fs-14 text-grey-600 text-nowrap">395 門課程</p>
                </div>
              </a>
              <a class="category-link" href="#">
                <img
                  class="category-icon"
                  src="@/assets/images/icons/category-icon-6.png"
                  alt="category-icon"
                />

                <div class="category-txt">
                  <p class="fs-16 fw-semibold text-grey-900 text-nowrap mb-2">投資理財</p>
                  <p class="fs-14 text-grey-600 text-nowrap">486 門課程</p>
                </div>
              </a>
              <a class="category-link" href="#">
                <img
                  class="category-icon"
                  src="@/assets/images/icons/category-icon-7.png"
                  alt="category-icon"
                />

                <div class="category-txt">
                  <p class="fs-16 fw-semibold text-grey-900 text-nowrap mb-2">音樂創作</p>
                  <p class="fs-14 text-grey-600 text-nowrap">283 門課程</p>
                </div>
              </a>
              <a class="category-link" href="#">
                <img
                  class="category-icon"
                  src="@/assets/images/icons/category-icon-8.png"
                  alt="category-icon"
                />

                <div class="category-txt">
                  <p class="fs-16 fw-semibold text-grey-900 text-nowrap">探索更多</p>
                </div>
              </a>
            </div>
          </div>
          <div class="col-lg-6">
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
          1200: { slidesPerView: 3 },
          992: { slidesPerView: 2 },
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
              <h3 class="fs-6 mb-6">Mr. Robert</h3>
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="tag-neutral">中文創作</span>
                <div class="card-rating">
                  <span class="material-symbols-outlined icon-fill-yellow"> star </span>
                  <span class="text-black fs-14 fw-medium">4.0</span>
                  <span class="text-grey-300 fs-14 fw-medium">(333)</span>
                </div>
              </div>
              <p class="mb-6">
                Robert
                的線上課程深受學生喜愛。他的教學方法生動有趣，能夠深入淺出地講解複雜的音樂理論，並結合實際演奏技巧，使學生能夠快速進步。
              </p>
              <button class="btn btn-primary-100 text-nowrap fs-16 fw-semibold mt-auto">
                探索 Mr. Robert 的教學課程
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
              <h3 class="fs-6 mb-6">Kelly Beck</h3>
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="tag-neutral">英文寫作</span>
                <div class="card-rating">
                  <span class="material-symbols-outlined icon-fill-yellow"> star </span>
                  <span class="text-black fs-14 fw-medium">4.8</span>
                  <span class="text-grey-300 fs-14 fw-medium">(281)</span>
                </div>
              </div>
              <p class="mb-6">
                Kelly 的教學方式靈活且富有創意，能夠有效提升學生的寫作技巧和自信心。Kelly
                注重實用性，針對學生的需求量身打造教學內容，並提供具體的反饋和建議。
              </p>
              <button class="btn btn-primary-100 text-nowrap fs-16 fw-semibold mt-auto">
                探索 Kelly Beck 的教學課程
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
                  <span class="material-symbols-outlined icon-fill-yellow"> star </span>
                  <span class="text-black fs-14 fw-medium">4.8</span>
                  <span class="text-grey-300 fs-14 fw-medium">(1245)</span>
                </div>
              </div>
              <p class="mb-6">
                K. Lee
                的教學風格親切且耐心，能夠循序漸進地引導學生進入樂團的世界。學生們紛紛表示，K. Lee
                的課程讓他們對音樂產生了濃厚的興趣！
              </p>
              <button class="btn btn-primary-100 text-nowrap fs-16 fw-semibold mt-auto">
                探索 K. Lee 的教學課程
              </button>
            </div>
          </div>
        </SwiperSlide>

        <div class="swiper-pagination d-xl-none d-block"></div>
      </swiper>
    </div>
  </section>
</template>
