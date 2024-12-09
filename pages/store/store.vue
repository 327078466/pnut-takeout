<template>
	<view class="container">
		<view class="status_bar" style="height: var(--status-bar-height); width: 100%;">
					
		</view>
		<scroll-view class="scroll-container" :scroll-top="scrollTop" scroll-y="true" @scrolltolower="enevtname">
			<view style="margin-top: 30rpx;">
				<view v-for="(shop,index) in shops" class="bottom-item">
					<view class="near-shop-container" @click="navigateToShop(shop)">
						<view class="near-shop-container-top">
							<image :src="shop.logo"></image>
							<view class="near-shop-container-top-left">
								<text style="font-weight: bold;font-size: 28rpx;">{{shop.storeName}}</text>
								<view
									style="display: flex;flex: none; margin-top: -8rpx;justify-content: space-between;">
									<view style="display: flex; align-items: center;">
										<image src="/static/index_image/favicate.png"
											style="width: 20rpx;height: 20rpx;margin-right: 8rpx;margin-left: 0rpx;">
										</image>
										<text style="font-size: 20rpx;color: #fedc62;">{{shop.favoriteNum}}</text>
										<text style="font-size: 20rpx;color: #adaeb0;margin-left: 20rpx;">月销热度{{shop.saleNum}}</text>
									</view>
									<view>
										<text v-if="shop.deliveryType ==='1'"
											class="near-shop-text-with-border">平台配送</text>
									</view>
								</view>
								<view style="margin-top: -15rpx;display: flex;justify-content: space-between; ">
									<view>
										<text
											style="font-size: 20rpx;color: #adaeb0;margin-left: 2rpx;">¥{{shop.startDeliveryPrice}}起送</text>
										<text
											style="font-size: 20rpx;color: #adaeb0;margin-left: 2rpx;margin-left: 20rpx;">配送费 ¥{{shop.deliveryPrice}}</text>
									</view>
									<view style="margin-right: 20rpx;display: flex;align-items: center;">
										<text
											style="font-size: 20rpx;color: #adaeb0;">{{shop.deliveryTime}}分钟</text>
										<view class="near-shop-divider_y"></view>
										<text style="font-size: 20rpx;color: #adaeb0;">{{shop.distance}} km</text>
									</view>
								</view>
								<view class="near-shop-container-top-left-text-container">
									<text class="near-shop-container-top-left-text-overflow">{{ shop.slogan}}</text>
								</view>
								<view v-if="shop.isHaoPin === '1'" class="bordered-view">
									<text
										style="font-size: 18rpx;color: #a05d60;padding-left: 5rpx">本店正在参与拼好饭活动，请速速围观！</text>
								</view>
							</view>
						</view>
						<view class="near-shop-container-font">
							<scroll-view scroll-x="true" class="near-shop-scroll-view">
								<view class="near-shop-swiper-font-view">
									<view v-for="(subItem, index) in foods" :key="index"
										class="near-shop-swiper-font-view-view">
										<image :src="subItem.imageUrl"></image>
										<text class="near-shop-swiper-item-name">{{subItem.name}}</text>
										<text
											style="color: #bd5a4c;text-align: center;">{{subItem.discostPrice}}</text>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
			
				</view>
				<!-- 如果 shops 为空，显示提示区域 -->
				<!-- 如果没有更多数据，显示提示区域 -->
				<view v-if="noMoreData" class="no-more">
					<text>没有更多了</text>
				</view>
			</view>
			</scroll-view>
	</view>
</template>
<style>
	@import url('./store.css');
	.divBody .divMenu .mescro-uni{
		 height: calc(100vh - var(--height));
	 }
</style>
<script>
	import {
		getStoreApi,getLocation
	} from '../../api/index';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import regeneratorRuntime, {
		async
	} from '../../lib/runtime/runtime';
	import {
		cartListApi,
		categoryListApi,
		dishListApi,
		setmealListApi,
		clearCartApi,
		updateCartApi,
		setMealDishDetailsApi,
		addCartApi
	} from '../../api/index';

	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				shops: [],
				loading: false, // 数据是否正在加载
				noMoreData: false, // 是否还有更多数据
				page: 1, // 当前页数
				lat: '',
				lng: '',
				foods: [{
						name: '草莓桃桃茶',
						imageUrl: '/static/index_image/foot.png',
						discostPrice: '¥9.99',
						originPrice: '¥16.00'
					},
					{
						name: '草莓桃桃茶',
						imageUrl: '/static/index_image/foot.png',
						discostPrice: '¥9.99',
						originPrice: '¥16.00'
					},
					{
						name: '草莓桃桃茶',
						imageUrl: '/static/index_image/foot.png',
						discostPrice: '¥9.99',
						originPrice: '¥16.00'
					},
					{
						name: '草莓桃桃茶',
						imageUrl: '/static/index_image/foot.png',
						discostPrice: '¥9.99',
						originPrice: '¥16.00'
					},
					{
						name: '草莓桃桃茶',
						imageUrl: '/static/index_image/foot.png',
						discostPrice: '¥9.99',
						originPrice: '¥16.00'
					},
					{
						name: '草莓桃桃茶',
						imageUrl: '/static/index_image/foot.png',
						discostPrice: '¥9.99',
						originPrice: '¥16.00'
					},
					{
						name: '草莓桃桃茶',
						imageUrl: '/static/index_image/foot.png',
						discostPrice: '¥9.99',
						originPrice: '¥16.00'
					},
					{
						name: '草莓桃桃茶',
						imageUrl: '/static/index_image/foot.png',
						discostPrice: '¥9.99',
						originPrice: '¥16.00'
					}
					// 添加更多项...
				],
			};
		},
		components: {},
		onShow() {
			
		},
		computed: {
	
		},
		created() {},
		onLoad(options) {
		    const storeObj = options.store;
			const shopStr = decodeURIComponent(storeObj); // 解码 URL 参数
			// 开始查询符合条件的店铺
			this.loadShops(shopStr);
		},

		watch: {
			
		},
		
		mounted() {
			// 页面加载时设置 scrollTop 为 0
			this.scrollTop = 0;
		},
		onReady(){
			
			},
		methods: {
			enevtname() {
				console.log('触底事件');
				this.loadShops(); // 用户滚动到底部时加载更多数据
			},
			async loadShops(searchKey) {
				console.log('开始执行获取店铺')
				if (this.loading || this.noMoreData) return; // 防止重复加载
				this.loading = true;
				try {
					const response = await getStoreApi({
						page: this.page,
						limit: 5,
						lat: this.lat,
						lng: this.lng,
						platformLabel: searchKey
					});
					if (response.code === 0) {
						const newShops = response.data.list; // 解析接口返回的数据
						if (newShops.length === 0) {
							this.noMoreData = true; // 没有更多数据
						} else {
							this.shops = this.shops.concat(newShops);
							this.page += 1; // 更新页数
						}
					} else {
						this.noMoreData = true; // 没有更多数据
					}
				} catch (error) {
					console.error('加载数据失败:', error);
				} finally {
					this.loading = false;
				}
			},
			navigateToShop(store) {
				const shopStr = encodeURIComponent(JSON.stringify(store))
				console.log("跳转页面")
				uni.navigateTo({
					url: `/pages/store_dish/index?store=${shopStr}`
				});
			},
		}
	};
</script>
